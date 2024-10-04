import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { BrandAdminController } from 'apis/brand/brand.admin.controller'
import { BrandPublicController } from 'apis/brand/brand.public.controller'
import { BrandService } from 'apis/brand/brand.service'

@Module({
    imports: [JwtModule.register({})],
    providers: [BrandService],
    controllers: [BrandPublicController, BrandAdminController],
})
export class BrandModule {}
