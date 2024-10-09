import { CacheModule, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { ThrottlerModule } from '@nestjs/throttler'
import { AppController } from 'app.controller'
import { redisConfig } from 'configs'

// import { ListenerModule } from 'modules/listeners/listener.module'
import { AuthModule } from 'apis/auth/auth.module'
import { BrandModule } from 'apis/brand/brand.module'
import { BroadcastModule } from 'apis/broadcast/broadcast.module'
import { ClaimRewardModule } from 'apis/claim-reward/claim-reward.module'
import { ReactionModule } from 'apis/reaction/reaction.module'
import { RewardModule } from 'apis/reward/reward.module'
import { UserModule } from 'apis/user/user.module'
import { MongoModule } from 'frameworks/mongo/mongo.module'
import { RedisCacheModule } from 'frameworks/redis-service/redis.module'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const redisStore = require('cache-manager-redis-store').redisStore

@Module({
    imports: [
        MongoModule,
        ScheduleModule.forRoot(),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            socket: {
                host: redisConfig.host,
                port: redisConfig.port,
            },
            password: redisConfig.password,
            database: redisConfig.db,
        }),
        ThrottlerModule.forRoot({}),
        RedisCacheModule,
        TerminusModule,
        BrandModule,
        RewardModule,
        ClaimRewardModule,
        AuthModule,
        UserModule,
        BroadcastModule,
        ReactionModule,
        // ListenerModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
