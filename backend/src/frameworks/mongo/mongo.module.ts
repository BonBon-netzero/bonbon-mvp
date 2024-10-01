import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DB } from 'configs'

import { UserSchema } from 'apis/user/models/user.schema'
import UserPlugin from 'plugins/user.plugin'
import { COLLECTION } from 'shared/constants'

@Global()
@Module({
    imports: [
        MongooseModule.forRoot(DB.DB_URL, DB.OPTION),
        MongooseModule.forFeature([]),
        MongooseModule.forFeatureAsync([
            {
                name: COLLECTION.USER,
                useFactory: () => {
                    const schema = UserSchema
                    schema.plugin(UserPlugin)
                    return schema
                },
            },
        ]),
    ],
    exports: [MongooseModule],
})
export class MongoModule {}
