import { Controller, Get, Param, Query } from '@nestjs/common'

import { BroadcastService } from 'apis/broadcast/broadcast.service'
import { BroadcastEntity } from 'apis/broadcast/entity/broadcast.entity'
import { PaginationDto } from 'shared/common/dto'
import { IListReturn } from 'shared/common/interfaces/list'
import { BROADCAST_STATUS, SortType } from 'shared/constants'
import { PaginationUtil } from 'shared/utils/pagination.util'

@Controller('public/broadcasts')
export class BroadcastPublicController {
    constructor(private readonly broadcastService: BroadcastService) {}

    @Get('/page')
    async getBroadcastPage(
        @Query() pagination: PaginationDto,
        @Query('sort_by') sortBy: string,
        @Query('sort_type') sortType: SortType,
        @Query('time') time: string
    ): Promise<IListReturn<BroadcastEntity>> {
        const query = {
            status: BROADCAST_STATUS.SUCCESS,
        }
        time && Object.assign(query, { time: { $gte: new Date(time) } })
        const { args, sort } = PaginationUtil.prepareDefaultBasicQuery(
            pagination,
            sortBy,
            sortType
        )
        return this.broadcastService.getBroadcastWithPagination(
            args,
            query,
            sort
        )
    }

    @Get('/:id')
    async getBroadcast(@Param('id') id: string): Promise<BroadcastEntity> {
        return this.broadcastService.getBroadcastById(id)
    }
}
