import { UserReactionData } from "@/entities/reaction";
import requester from ".";

export async function createReactionApi({
  broadcastId,
  type,
}: {
  broadcastId: string;
  type: string;
}) {
  return requester
    .post(`/reactions`, { broadcastId, type })
    .then((res: any) => res.data as any);
}

export async function getUserReactionApi({
  broadcastIds,
}: {
  broadcastIds: string[];
}) {
  return requester
    .get(`/reactions/me`, { params: { broadcastIds } })
    .then((res: any) => res.data as UserReactionData[]);
}
