import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'

import { BroadcastService } from 'apis/broadcast/broadcast.service'
import { CreateBroadcastDto } from 'apis/broadcast/dto/create-broadcast.dto'
import { BroadcastEntity } from 'apis/broadcast/entity/broadcast.entity'
import { AuthGuard } from 'plugins/guards'
import { RequestInfoType } from 'shared/common/types'

@Controller('/broadcasts')
@UseGuards(AuthGuard)
export class BroadcastController {
    constructor(private readonly broadcastService: BroadcastService) {}

    @Post()
    async createBroadcast(
        @Request() ctx: RequestInfoType,
        @Body() doc: CreateBroadcastDto
    ): Promise<BroadcastEntity> {
        return this.broadcastService.createBroadcast(ctx.user.id, doc)
    }
}
