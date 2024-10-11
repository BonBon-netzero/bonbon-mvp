import requester from ".";

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
