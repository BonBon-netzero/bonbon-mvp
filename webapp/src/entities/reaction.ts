import { ReactionTypeEnum } from "@/utils/config/enum";

export interface UserReactionData {
  broadcastId: string;
  type: ReactionTypeEnum;
}
