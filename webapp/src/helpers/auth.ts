import requester from "@/apis";
import { STORAGE_KEYS } from "@/utils/config/keys";

export const setJwt = (jwt: string) => {
  requester.defaults.headers.common["Authorization"] = jwt;
};
export const storeAuth = ({
  jwt,
  wallet,
  account,
}: {
  jwt: string;
  wallet?: string;
  account: string;
}) => {
  if (typeof window !== "undefined") {
    setJwt(jwt);
    localStorage.setItem(STORAGE_KEYS.JWT, jwt);
    if (wallet) localStorage.setItem(STORAGE_KEYS.WALLET, wallet);
    localStorage.setItem(STORAGE_KEYS.ACCOUNT, account);
  }
};
export const clearWeb3Auth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.WALLET);
    localStorage.removeItem(STORAGE_KEYS.ACCOUNT);
  }
};
export const clearAuth = () => {
  requester.defaults.headers.common["Authorization"] = "";
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.JWT);
  }
  clearWeb3Auth();
};
export const getStoredJwt = (): string | null => {
  if (typeof window !== "undefined") {
    const storedJwt = localStorage.getItem(STORAGE_KEYS.JWT);
    if (!storedJwt) return null;
    return storedJwt;
  }
  return null;
};
export const getStoredWallet = (): {
  account: string | null;
  wallet: string | null;
} => {
  if (typeof window !== "undefined") {
    const wallet = localStorage.getItem(STORAGE_KEYS.WALLET);
    const account = localStorage.getItem(STORAGE_KEYS.ACCOUNT);
    return { wallet, account };
  }
  return { wallet: null, account: null };
};
