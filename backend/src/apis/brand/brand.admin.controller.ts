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

import { BrandService } from 'apis/brand/brand.service'
import { CreateBrandDto } from 'apis/brand/dto/create-brand.dto'
import { UpdateBrandDto } from 'apis/brand/dto/update-brand.dto'
import { BrandEntity } from 'apis/brand/entity/brand.entity'
import { AuthGuard, Roles } from 'plugins/guards'
import { PaginationDto } from 'shared/common/dto'
import { IListReturn } from 'shared/common/interfaces/list'
import { ROLE, SortType } from 'shared/constants'
import { PaginationUtil } from 'shared/utils/pagination.util'

@Controller('/admin/brands')
@UseGuards(AuthGuard)
@Roles(ROLE.ADMIN)
export class BrandAdminController {
    constructor(private readonly brandService: BrandService) {}

    @Post()
    async createBrand(@Body() doc: CreateBrandDto): Promise<BrandEntity> {
        return this.brandService.createBrand(doc)
    }

    @Put('/:id')
    async updateBrand(
        @Param('id') id: string,
        @Body() doc: UpdateBrandDto
    ): Promise<BrandEntity> {
        return this.brandService.updateBrand(id, doc)
    }

    @Get('/:id')
    async getBrand(@Param('id') id: string): Promise<BrandEntity> {
        return this.brandService.getBrandById(id)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deleteBrand(@Param('id') id: string): Promise<void> {
        return this.brandService.deleteBrand(id)
    }

    @Get('/page')
    async getBrandPage(
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
