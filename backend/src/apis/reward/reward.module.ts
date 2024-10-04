import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { RewardAdminController } from 'apis/reward/reward.admin.controller'
import { RewardPublicController } from 'apis/reward/reward.public.controller'
import { RewardService } from 'apis/reward/reward.service'

@Module({
    imports: [JwtModule.register({})],
    providers: [RewardService],
    controllers: [RewardPublicController, RewardAdminController],
})
export class RewardModule {}
