import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Branding extends Document {
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    name: string

    @Prop({
        type: String,
        default: '',
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

export const BrandingSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(Branding),
    {
        timestamps: true,
    }
)
