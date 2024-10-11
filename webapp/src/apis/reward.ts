import {
  BrandRewardData,
  RewardData,
  RewardHistoryData,
} from "@/entities/reward";
import requester from ".";
import { ApiListResponse } from "./type";
import { BroadcastData } from "@/entities/broadcast";

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

export async function getBroadcasts(time?: Date) {
  return requester
    .get(`/public/broadcasts/page`, {
      params: { time, sort_by: "amount", sort_type: "desc" },
    })
    .then((res: any) => res.data as ApiListResponse<BroadcastData>);
}
