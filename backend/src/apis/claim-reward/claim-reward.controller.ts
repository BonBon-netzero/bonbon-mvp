import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common'

import { ClaimRewardService } from 'apis/claim-reward/claim-reward.service'
import { ClaimRewardDto } from 'apis/claim-reward/dto/claim-reward.dto'
import { ClaimRewardEntity } from 'apis/claim-reward/entity/claim-reward.entity'
import { AuthGuard } from 'plugins/guards'
import { PaginationDto } from 'shared/common/dto'
import { IListReturn } from 'shared/common/interfaces/list'
import { RequestInfoType } from 'shared/common/types'
import { SortType } from 'shared/constants'
import { PaginationUtil } from 'shared/utils/pagination.util'

@Controller('/claim-rewards')
@UseGuards(AuthGuard)
export class ClaimRewardController {
    constructor(private readonly claimRewardService: ClaimRewardService) {}

    @Post('/claim')
    async claimReward(
        @Request() ctx: RequestInfoType,
        @Body() doc: ClaimRewardDto
    ): Promise<ClaimRewardEntity> {
        return this.claimRewardService.claimReward(ctx.user.id, doc)
    }

    @Get('/page')
    async getRewardPage(
        @Request() ctx: RequestInfoType,
        @Query() pagination: PaginationDto,
        @Query('sort_by') sortBy: string,
        @Query('sort_type') sortType: SortType
    ): Promise<IListReturn<ClaimRewardEntity>> {
        const query = {
            userId: ctx.user.id,
            deleted: false,
        }
        const { args, sort } = PaginationUtil.prepareDefaultBasicQuery(
            pagination,
            sortBy,
            sortType
        )
        return this.claimRewardService.getClaimRewardWithPagination(
            args,
            query,
            sort
        )
    }

    @Get('/:id')
    async getReward(
        @Request() ctx: RequestInfoType,
        @Param('id') id: string
    ): Promise<ClaimRewardEntity> {
        return this.claimRewardService.getClaimRewardById(ctx.user.id, id)
    }
}
