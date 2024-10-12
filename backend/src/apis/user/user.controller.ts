import { Controller, Get, Request, UseGuards } from '@nestjs/common'

import { UserEntity } from 'apis/user/entities/user.entity'
import { UserService } from 'apis/user/user.service'
import { AuthGuard } from 'plugins/guards/auth.guard'
import { RequestInfoType } from 'shared/common/types'

@Controller('/users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    async myProfile(@Request() ctx: RequestInfoType): Promise<UserEntity> {
        return this.userService.myProfile(ctx.user.id)
    }
}
