import { CacheModule, Global, Module } from '@nestjs/common'
import { redisConfig } from 'configs'
import {RedisService} from "frameworks/redis-service/redis.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const redisStore = require('cache-manager-redis-store').redisStore

@Global()
@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            socket: {
                host: redisConfig.host,
                port: redisConfig.port,
            },
            password: redisConfig.password,
            database: redisConfig.db,
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisCacheModule {}
