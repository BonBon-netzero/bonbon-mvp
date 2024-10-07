import { UserData } from "@/entities/user";
import requester from ".";

export async function getMyProfileApi() {
  return requester.get(`me`).then((res: any) => res.data as UserData);
}
