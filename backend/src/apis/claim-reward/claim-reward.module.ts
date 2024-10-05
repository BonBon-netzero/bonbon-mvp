import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { ClaimRewardController } from 'apis/claim-reward/claim-reward.controller'
import { ClaimRewardService } from 'apis/claim-reward/claim-reward.service'

@Module({
    imports: [JwtModule.register({})],
    providers: [ClaimRewardService],
    controllers: [ClaimRewardController],
})
export class ClaimRewardModule {}
