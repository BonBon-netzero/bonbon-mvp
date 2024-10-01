import { BullModule } from '@nestjs/bull'
import { Global, Module } from '@nestjs/common'
import { redisConfig } from 'configs'

@Global()
@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: redisConfig.host,
                port: redisConfig.port,
                password: redisConfig.password,
                db: redisConfig.db,
            },
        }),
    ],
    providers: [],
    exports: [],
})
export class BullEventModule {}
