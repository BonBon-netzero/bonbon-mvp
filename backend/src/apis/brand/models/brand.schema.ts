import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Brand extends Document {
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    name: string

    @Prop({
        type: String,
        unique: true,
    })
    code: string

    @Prop({
        type: String,
        default: '',
    })
    avatar: string

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

export const BrandSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(Brand),
    {
        timestamps: true,
    }
)
