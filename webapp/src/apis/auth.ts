import requester from ".";
import { LoginResponse, VerifyLoginResponse } from "./type";

const SERVICE = "auth";
export async function loginWeb3Api(address: string) {
  return requester
    .post(`${SERVICE}/web3/login`, { address })
    .then((res: any) => res.data as LoginResponse);
}

export async function verifyLoginWeb3Api(
  address: string,
  sign: string,
  time: string,
  isCoinbaseWallet: boolean
) {
  return requester
    .post(`${SERVICE}/web3/verify-login`, {
      address,
      sign,
      time,
      isCoinbaseWallet,
    })
    .then((res: any) => res.data as VerifyLoginResponse);
}

export async function logoutApi() {
  return requester.post(`${SERVICE}/logout`);
}
