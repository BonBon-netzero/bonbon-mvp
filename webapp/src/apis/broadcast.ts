import { BroadcastData } from "@/entities/broadcast";
import requester from ".";
import { ApiListResponse } from "./type";

export async function createBroadcastApi({
  amount,
  message,
}: {
  amount: number;
  message: string;
}) {
  return requester
    .post(`/broadcasts`, { amount, message })
    .then((res: any) => res.data as any);
}

export async function getBroadcasts(time?: Date) {
  return requester
    .get(`/public/broadcasts/page`, {
      params: { time, sort_by: "amount", sort_type: "desc" },
    })
    .then((res: any) => res.data as ApiListResponse<BroadcastData>);
}
