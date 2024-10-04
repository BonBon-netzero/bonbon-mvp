import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { CLAIM_REWARD_STATUS } from 'shared/constants/status.constant'

@Schema()
export class ClaimRewardHistory extends Document {
    @Prop({
        type: String,
        required: true,
    })
    userId: string

    @Prop({
        type: String,
        required: true,
    })
    rewardId: string

    @Prop({
        type: Number,
        unique: true,
    })
    amount: number

    @Prop({
        type: String,
        enum: Object.values(CLAIM_REWARD_STATUS),
        default: CLAIM_REWARD_STATUS.PENDING,
    })
    status: CLAIM_REWARD_STATUS

    @Prop({
        type: Date,
    })
    createdAt: Date

    @Prop({
        type: Date,
    })
    updatedAt: Date
}

export const ClaimRewardHistorySchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(ClaimRewardHistory),
    {
        timestamps: true,
    }
)
