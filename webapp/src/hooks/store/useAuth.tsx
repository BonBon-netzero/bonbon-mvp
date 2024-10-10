"use client";
import { cerContract } from "@/utils/config/contracts";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { loginWeb3Api, logoutApi, verifyLoginWeb3Api } from "@/apis/auth";
import {
  useAccount,
  UseAccountReturnType,
  useConnect,
  useDisconnect,
  useReadContract,
  useSignMessage,
} from "wagmi";
import { UserData } from "@/entities/user";
import {
  clearAuth,
  clearWeb3Auth,
  getStoredJwt,
  getStoredWallet,
  setJwt,
  storeAuth,
} from "@/helpers/auth";
import { WaitingState } from "@/utils/types";
import "@/helpers/dayjs";
import dayjs from "dayjs";
import { getMyProfileApi } from "@/apis/user";
import { formatUnits } from "viem";

interface ContextValues {
  loading: boolean;
  isAuthenticated: boolean | null;
  login: () => void;
  logout: () => void;
  profile: UserData | null;
  setProfile: (myProfile: UserData | null) => void;
  redirectLoginPage: boolean;
  userBalance: number;
}

const AuthContext = createContext({} as ContextValues);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [waitingState, setWaitingState] = useState<WaitingState | null>(null);
  const account = useAccount();

  const { data: balance } = useReadContract({
    abi: cerContract.abi,
    address: cerContract.address,
    functionName: "balanceOf",
    args: [account?.address],
    query: {
      enabled: !!account?.address,
      retry: 0,
    },
  });
  const userBalance = balance ? Number(formatUnits(balance, 18)) : 0;
  const {
    data: signMessageData,
    error: signMessageError,
    signMessage,
  } = useSignMessage({
    mutation: {
      onSuccess: () => {
        setWaitingState(WaitingState.SuccessSigning);
      },
    },
  });
  const { connectors, connect: wagmiConnect } = useConnect();
  // const connector = connectors.find((c) => c.id === "coinbaseWalletSDK");
  const connector = connectors.find((c) => c.type === "injected"); // test
  const { disconnect: wagmiDisconnect } = useDisconnect();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<UserData | null>(null);

  const activeConnectRef = useRef<boolean>(false);
  const signTimeRef = useRef("");
  const { account: storedAccount } = getStoredWallet();
  const [redirectLoginPage, setRedirectLoginPage] = useState(false);

  useEffect(() => {
    const jwt = getStoredJwt();
    const _redirectLoginPage = account.address !== storedAccount || !jwt;
    if (_redirectLoginPage) {
      setRedirectLoginPage(true);
      return;
    }
    (async () => {
      try {
        if (!jwt) {
          setRedirectLoginPage(true);
          return;
        }
        setJwt(jwt);
        const user = await getMyProfileApi();
        setProfile(user);
        setIsAuthenticated(true);
        setWaitingState(null);
      } catch (error) {
        console.log(error);
        clearAuth();
        setIsAuthenticated(false);
        setProfile(null);
        setRedirectLoginPage(true);
      }
    })();
  }, []);

  const disconnectWeb3 = useCallback(() => {
    clearWeb3Auth();
    setWaitingState(null);
    if (!account) return;
    wagmiDisconnect();
  }, [account]);

  const disconnect = useCallback(() => {
    clearAuth();
    setProfile(null);
    setIsAuthenticated(false);
    disconnectWeb3();
    setRedirectLoginPage(true);
  }, [disconnectWeb3, setProfile]);

  useEffect(() => {
    if (waitingState !== WaitingState.SuccessSigning) return;
    (async () => {
      if (signMessageData) {
        const response = await verifyLoginWeb3Api(
          account.address!,
          signMessageData,
          signTimeRef.current,
          connector?.id === "coinbaseWalletSDK"
        );
        sessionStorage.clear();
        storeAuth({
          jwt: response.access_token,
          account: account.address!,
        });
        setProfile({ ...response });
        setIsAuthenticated(true);
        setWaitingState(null);
        setIsLoading(false);
        return;
      }
      if (signMessageError) {
        setIsLoading(false);
        throw Error("Can't sign verify message"); // toast here
      }
      setIsLoading(false);
      throw Error("Some thing wrong"); // toast here
    })();
  }, [signMessageData, signMessageError]);

  // activeConnectRef check for sign if account is not connected after click connect
  useEffect(() => {
    if (activeConnectRef.current && account?.status === "connected") {
      activeConnectRef.current = false;
      sign();
    }
  }, [account]);

  const sign = useCallback(async () => {
    try {
      setWaitingState(WaitingState.Signing);
      const { verifyCode } = await loginWeb3Api(account.address!);
      const time = dayjs().utc().toISOString();
      signTimeRef.current = time;
      const msg = `I want to login on bonbon.eco at ${time}. Login code: ${verifyCode}`;
      signMessage({ message: msg });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [account]);

  const login = useCallback(async () => {
    if (account?.status !== "connected" && connector) {
      setIsLoading(true);
      activeConnectRef.current = true;
      wagmiConnect({ connector });
      return;
    }
    if (account?.status === "connected") {
      setIsLoading(true);
      sign();
      return;
    }
    setIsLoading(false);
    console.log("Error");
  }, [sign, account, connector, wagmiConnect]);

  const logout = useCallback(() => {
    logoutApi()
      .then(() => {
        disconnect();
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }, [disconnect]);

  const contextValue: ContextValues = useMemo(() => {
    return {
      loading: isLoading,
      isAuthenticated,
      login,
      logout,
      profile,
      setProfile,
      redirectLoginPage,
      userBalance,
    };
  }, [
    isLoading,
    isAuthenticated,
    login,
    logout,
    profile,
    setProfile,
    redirectLoginPage,
    userBalance,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
