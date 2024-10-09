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

export type PaginationParams = {
  limit?: number;
  offset?: number;
};
export type ApiMeta = {
  limit: number;
  offset: number;
  total: number;
  totalPages: number;
};

export type ApiListResponse<T> = {
  meta: ApiMeta;
  data: T[];
};
