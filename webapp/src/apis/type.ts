export interface LoginResponse {
  verifyCode: string;
}

export interface VerifyLoginResponse {
  access_token: string;
  id: string;
  username: string;
  account: string;
  // role: UserRoleEnum
  copyTradeQuota: number;
  isActivated: boolean;
  isAddedReferral?: boolean;
  isSkippedReferral?: boolean;
  isBlocked: boolean;
  blockNote?: string;
  referralCode?: string;
  createdAt: string;
  updatedAt: string;
}
