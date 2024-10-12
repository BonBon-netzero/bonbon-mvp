import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
    @Prop({
        type: String,
        default: '',
        unique: true,
    })
    username: string

    @Prop({
        type: Boolean,
        default: false,
    })
    isBlocked: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    isActivated: boolean

    @Prop({
        type: Date,
    })
    createdAt: Date

    @Prop({
        type: Date,
    })
    updatedAt: Date
}

export const UserSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(User),
    {
        timestamps: true,
    }
)
