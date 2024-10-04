import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { BrandingAdminController } from 'apis/branding/branding.admin.controller'
import { BrandingPublicController } from 'apis/branding/branding.public.controller'
import { BrandingService } from 'apis/branding/branding.service'

@Module({
    imports: [JwtModule.register({})],
    providers: [BrandingService],
    controllers: [BrandingPublicController, BrandingAdminController],
})
export class BrandingModule {}
