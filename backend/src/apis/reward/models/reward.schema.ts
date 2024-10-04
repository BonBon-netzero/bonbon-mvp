import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { REWARD_STATUS } from 'shared/constants/status.constant'
import { REWARD_TYPE } from 'shared/constants/type.constant'

@Schema()
export class Reward extends Document {
    @Prop({
        type: String,
        required: true,
    })
    name: string

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    code: string

    @Prop({
        type: String,
        required: true,
    })
    brandId: string

    @Prop({
        type: String,
        required: true,
    })
    brandName: string

    @Prop({
        type: String,
        default: '',
    })
    image: string

    @Prop({
        type: String,
        default: '',
    })
    description: string

    @Prop({
        type: Number,
        default: 0,
    })
    amount: number

    @Prop({
        type: String,
        enum: Object.values(REWARD_TYPE),
    })
    type: REWARD_TYPE

    @Prop({
        type: String,
        enum: Object.values(REWARD_STATUS),
        default: REWARD_STATUS.AVAILABLE,
    })
    status: REWARD_STATUS

    @Prop({
        type: Boolean,
        default: false,
    })
    deleted: boolean

    @Prop({
        type: Date,
    })
    createdAt: Date

    @Prop({
        type: Date,
    })
    updatedAt: Date
}

export const RewardSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(Reward),
    {
        timestamps: true,
    }
)
