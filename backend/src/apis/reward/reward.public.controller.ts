import { Controller, Get, Param, Query } from '@nestjs/common'

import { RewardEntity } from 'apis/reward/entity/reward.entity'
import { RewardService } from 'apis/reward/reward.service'
import { PaginationDto } from 'shared/common/dto'
import { IListReturn } from 'shared/common/interfaces/list'
import { SortType } from 'shared/constants'
import { PaginationUtil } from 'shared/utils/pagination.util'

@Controller('/rewards')
export class RewardPublicController {
    constructor(private readonly rewardService: RewardService) {}

    // @Get('/page')
    // async getRewardPage(
    //     @Query() pagination: PaginationDto,
    //     @Query('sort_by') sortBy: string,
    //     @Query('sort_type') sortType: SortType
    // ): Promise<IListReturn<RewardEntity>> {
    //     const query = {
    //         deleted: false,
    //     }
    //     const { args, sort } = PaginationUtil.prepareDefaultBasicQuery(
    //         pagination,
    //         sortBy,
    //         sortType
    //     )
    //     return this.rewardService.getRewardWithPagination(args, query, sort)
    // }

    @Get('/:code')
    async getReward(@Param('code') code: string): Promise<RewardEntity> {
        return this.rewardService.getRewardByCode(code)
    }
}
