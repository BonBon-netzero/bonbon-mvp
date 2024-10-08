import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { RAW_DATA_TYPE } from 'shared/constants/transaction-constant'

@Schema()
export class Transaction extends Document {
    @Prop({
        type: Number,
    })
    blockNumber: number

    @Prop({
        type: Date,
    })
    blockTime: Date

    @Prop({
        type: Number,
    })
    logIndex: number

    @Prop({
        type: Mongo.Schema.Types.Mixed,
    })
    log: any

    @Prop({
        type: String,
    })
    topic: string

    @Prop({
        type: String,
        enum: RAW_DATA_TYPE,
        required: true,
    })
    type: RAW_DATA_TYPE

    @Prop({
        type: Mongo.Schema.Types.Mixed,
    })
    data: any

    @Prop({
        type: Date,
    })
    createdAt: Date

    @Prop({
        type: Date,
    })
    updatedAt: Date
}

export const TransactionSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(Transaction),
    {
        timestamps: true,
    }
)
