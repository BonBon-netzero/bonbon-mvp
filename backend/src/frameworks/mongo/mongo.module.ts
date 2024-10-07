import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DB } from 'configs'
import { TransactionSchema } from 'modules/listeners/models/transaction.schema'

import { BrandSchema } from 'apis/brand/models/brand.schema'
import { BroadcastSchema } from 'apis/broadcast/models/broadcast.schema'
import { ClaimRewardHistorySchema } from 'apis/claim-reward/models/claim-reward.schema'
import { ReactionSchema } from 'apis/reaction/models/reaction.schema'
import { RewardSchema } from 'apis/reward/models/reward.schema'
import { UserSchema } from 'apis/user/models/user.schema'
import UserPlugin from 'plugins/user.plugin'
import { COLLECTION } from 'shared/constants'

@Global()
@Module({
    imports: [
        MongooseModule.forRoot(DB.DB_URL, DB.OPTION),
        MongooseModule.forFeature([
            {
                name: COLLECTION.BRAND,
                schema: BrandSchema,
            },
            {
                name: COLLECTION.REWARD,
                schema: RewardSchema,
            },
            {
                name: COLLECTION.CLAIM_REWARD_HISTORY,
                schema: ClaimRewardHistorySchema,
            },
            {
                name: COLLECTION.BROADCAST,
                schema: BroadcastSchema,
            },
            {
                name: COLLECTION.REACTION,
                schema: ReactionSchema,
            },
            {
                name: COLLECTION.TRANSACTION,
                schema: TransactionSchema,
            },
        ]),
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
