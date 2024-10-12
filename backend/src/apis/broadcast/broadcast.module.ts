import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { BroadcastController } from 'apis/broadcast/broadcast.controller'
import { BroadcastPublicController } from 'apis/broadcast/broadcast.public.controller'
import { BroadcastService } from 'apis/broadcast/broadcast.service'

@Module({
    imports: [JwtModule.register({})],
    providers: [BroadcastService],
    controllers: [BroadcastController, BroadcastPublicController],
})
export class BroadcastModule {}
