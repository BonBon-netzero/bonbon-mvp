import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common'

import { CreateRewardDto } from 'apis/reward/dto/create-reward.dto'
import { UpdateRewardDto } from 'apis/reward/dto/update-reward.dto'
import { RewardEntity } from 'apis/reward/entity/reward.entity'
import { RewardService } from 'apis/reward/reward.service'
import { AuthGuard, Roles } from 'plugins/guards'
import { PaginationDto } from 'shared/common/dto'
import { IListReturn } from 'shared/common/interfaces/list'
import { ROLE, SortType } from 'shared/constants'
import { PaginationUtil } from 'shared/utils/pagination.util'

@Controller('/admin/rewards')
@UseGuards(AuthGuard)
@Roles(ROLE.ADMIN)
export class RewardAdminController {
    constructor(private readonly rewardService: RewardService) {}

    @Post()
    async createReward(@Body() doc: CreateRewardDto): Promise<RewardEntity> {
        return this.rewardService.createReward(doc)
    }

    @Put('/:id')
    async updateReward(
        @Param('id') id: string,
        @Body() doc: UpdateRewardDto
    ): Promise<RewardEntity> {
        return this.rewardService.updateReward(id, doc)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deleteReward(@Param('id') id: string): Promise<void> {
        return this.rewardService.deleteReward(id)
    }

    @Get('/page')
    async getRewardPage(
        @Query() pagination: PaginationDto,
        @Query('sort_by') sortBy: string,
        @Query('sort_type') sortType: SortType
    ): Promise<IListReturn<RewardEntity>> {
        const query = {
            deleted: false,
        }
        const { args, sort } = PaginationUtil.prepareDefaultBasicQuery(
            pagination,
            sortBy,
            sortType
        )
        return this.rewardService.getRewardWithPagination(args, query, sort)
    }

    @Get('/:id')
    async getReward(@Param('id') id: string): Promise<RewardEntity> {
        return this.rewardService.getRewardById(id)
    }
}
