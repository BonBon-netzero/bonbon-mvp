import { UserData } from "@/entities/user";
import requester from ".";

export async function getMyProfileApi() {
  return requester.get(`users/me`).then((res: any) => res.data as UserData);
}
