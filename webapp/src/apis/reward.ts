import {
  BrandRewardData,
  RewardData,
  RewardHistoryData,
} from "@/entities/reward";
import requester from ".";
import { ApiListResponse } from "./type";
export async function claimRewardApi(code: string) {
  return requester
    .post(`/claim-rewards/claim`, { code })
    .then((res: any) => res.data as any);
}

export async function integrateDatBikeApi() {
  return requester
    .post(`/claim-rewards/integrate/DAT_BIKE`, {})
    .then((res: any) => res.data as any);
}

export async function claimRewardHistoryApi() {
  return requester
    .get(`/claim-rewards/page`)
    .then((res: any) => res.data as ApiListResponse<RewardHistoryData>);
}

export async function brandsRewardInfoApi() {
  return requester
    .get(`/claim-rewards/brands`)
    .then((res: any) => res.data as BrandRewardData[]);
}

export async function getRewardDetailsApi(code: string) {
  return requester
    .get(`/rewards/${code}`)
    .then((res: any) => res.data as RewardData);
}
