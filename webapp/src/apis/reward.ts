import requester from ".";

export async function claimRewardApi(code: string) {
  return requester
    .post(`/claim-rewards`, { code })
    .then((res: any) => res.data as any);
}

export async function claimRewardHistoryApi() {
  return requester
    .get(`/claim-rewards/page`)
    .then((res: any) => res.data as any);
}
