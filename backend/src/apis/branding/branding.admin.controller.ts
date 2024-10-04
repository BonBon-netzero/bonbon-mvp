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

import { BrandingService } from 'apis/branding/branding.service'
import { CreateBrandingDto } from 'apis/branding/dto/create-branding.dto'
import { UpdateBrandingDto } from 'apis/branding/dto/update-branding.dto'
import { BrandingEntity } from 'apis/branding/entity/branding.entity'
import { AuthGuard, Roles } from 'plugins/guards'
import { PaginationDto } from 'shared/common/dto'
import { IListReturn } from 'shared/common/interfaces/list'
import { ROLE, SortType } from 'shared/constants'
import { PaginationUtil } from 'shared/utils/pagination.util'

@Controller('/admin/brandings')
@UseGuards(AuthGuard)
@Roles(ROLE.ADMIN)
export class BrandingAdminController {
    constructor(private readonly brandingService: BrandingService) {}

    @Post()
    async createBranding(
        @Body() doc: CreateBrandingDto
    ): Promise<BrandingEntity> {
        return this.brandingService.createBranding(doc)
    }

    @Put('/:id')
    async updateBranding(
        @Param('id') id: string,
        @Body() doc: UpdateBrandingDto
    ): Promise<BrandingEntity> {
        return this.brandingService.updateBranding(id, doc)
    }

    @Get('/:id')
    async getBranding(@Param('id') id: string): Promise<BrandingEntity> {
        return this.brandingService.getBrandingById(id)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deleteBranding(@Param('id') id: string): Promise<void> {
        return this.brandingService.deleteBranding(id)
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
