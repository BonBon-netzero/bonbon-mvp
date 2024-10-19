import { ReactionTypeEnum } from "@/utils/config/enum";

export interface BroadcastData {
  id: string;
  message: string;
  amount: number;
  time: string;
  reaction: {
    [key in ReactionTypeEnum]: number;
  };
  username: string;
}
