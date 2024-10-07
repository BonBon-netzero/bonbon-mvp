import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { BROADCAST_STATUS } from 'shared/constants'

@Schema()
export class Broadcast extends Document {
    @Prop({
        type: String,
        required: true,
    })
    userId: string

    @Prop({
        type: Number,
        required: true,
    })
    amount: number

    @Prop({
        type: String,
    })
    message: string

    @Prop({
        type: Date,
    })
    time: Date

    @Prop({
        type: String,
    })
    txHash: string

    @Prop({
        type: String,
        enum: Object.values(BROADCAST_STATUS),
    })
    status: BROADCAST_STATUS

    @Prop({
        type: Date,
    })
    createdAt: Date

    @Prop({
        type: Date,
    })
    updatedAt: Date
}

export const BroadcastSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(Broadcast),
    {
        timestamps: true,
    }
)
