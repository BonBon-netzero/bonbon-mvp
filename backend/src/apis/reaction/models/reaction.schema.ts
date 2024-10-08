import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { REACTION_TYPE } from 'shared/constants'

@Schema()
export class Reaction extends Document {
    @Prop({
        type: String,
        required: true,
    })
    broadcastId: string

    @Prop({
        type: String,
        required: true,
    })
    userId: string

    @Prop({
        type: String,
        required: true,
        enum: Object.values(REACTION_TYPE),
    })
    type: REACTION_TYPE

    @Prop({
        type: Boolean,
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

export const ReactionSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(Reaction),
    {
        timestamps: true,
    }
)
