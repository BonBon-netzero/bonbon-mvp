import { Controller, Get, Param, Query } from '@nestjs/common'

import { BrandService } from 'apis/brand/brand.service'
import { BrandEntity } from 'apis/brand/entity/brand.entity'
import { PaginationDto } from 'shared/common/dto'
import { IListReturn } from 'shared/common/interfaces/list'
import { SortType } from 'shared/constants'
import { PaginationUtil } from 'shared/utils/pagination.util'

@Controller('/brands')
export class BrandPublicController {
    constructor(private readonly brandService: BrandService) {}

    @Get('/:id')
    async getBranding(@Param('id') id: string): Promise<BrandEntity> {
        return this.brandService.getBrandById(id)
    }

    @Get('/page')
    async getBrandingPage(
        @Query() pagination: PaginationDto,
        @Query('sort_by') sortBy: string,
        @Query('sort_type') sortType: SortType
    ): Promise<IListReturn<BrandEntity>> {
        const query = {
            deleted: false,
        }
        const { args, sort } = PaginationUtil.prepareDefaultBasicQuery(
            pagination,
            sortBy,
            sortType
        )
        return this.brandService.getBrandWithPagination(args, query, sort)
    }
}
