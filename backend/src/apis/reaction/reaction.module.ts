import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { ReactionController } from 'apis/reaction/reaction.controller'
import { ReactionService } from 'apis/reaction/reaction.service'

@Module({
    imports: [JwtModule.register({})],
    providers: [ReactionService],
    controllers: [ReactionController],
})
export class ReactionModule {}
