import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'

import { UpsertReactionDto } from 'apis/reaction/dto/upsert-reaction.dto'
import { ReactionService } from 'apis/reaction/reaction.service'
import { AuthGuard } from 'plugins/guards'
import { RequestInfoType } from 'shared/common/types'

@Controller('/reactions')
@UseGuards(AuthGuard)
export class ReactionController {
    constructor(private readonly reactionService: ReactionService) {}

    @Post()
    async upsertReaction(
        @Request() ctx: RequestInfoType,
        @Body() doc: UpsertReactionDto
    ): Promise<void> {
        return this.reactionService.createReaction(ctx.user.id, doc)
    }
}
