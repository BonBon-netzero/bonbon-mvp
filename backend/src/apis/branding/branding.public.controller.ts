import { Controller, Get, Param, Query } from '@nestjs/common'

import { BrandingService } from 'apis/branding/branding.service'
import { BrandingEntity } from 'apis/branding/entity/branding.entity'
import { PaginationDto } from 'shared/common/dto'
import { IListReturn } from 'shared/common/interfaces/list'
import { SortType } from 'shared/constants'
import { PaginationUtil } from 'shared/utils/pagination.util'

@Controller('/brandings')
export class BrandingPublicController {
    constructor(private readonly brandingService: BrandingService) {}

    @Get('/:id')
    async getBranding(@Param('id') id: string): Promise<BrandingEntity> {
        return this.brandingService.getBrandingById(id)
    }

    @Get('/page')
    async getBrandingPage(
        @Query() pagination: PaginationDto,
        @Query('sort_by') sortBy: string,
        @Query('sort_type') sortType: SortType
    ): Promise<IListReturn<BrandingEntity>> {
        const query = {
            deleted: false,
        }
        const { args, sort } = PaginationUtil.prepareDefaultBasicQuery(
            pagination,
            sortBy,
            sortType
        )
        return this.brandingService.getBrandingWithPagination(args, query, sort)
    }
}
