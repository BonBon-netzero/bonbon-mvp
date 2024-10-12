import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common'

import { VerifyWeb3LoginDto, Web3LoginDto } from 'apis/auth/dto/web3-login.dto'
import { LocalAuthGuard } from 'plugins/guards/local-auth.guard'
import { ERROR } from 'shared/constants'

import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any): Promise<any> {
        return this.authService.login(req.user)
    }

    @Post('/logout')
    async logout(@Request() ctx): Promise<void> {
        if (!ctx.headers.authorization) {
            throw new BadRequestException(ERROR.INVALID_TOKEN)
        }
        await this.authService.logout(ctx.headers.authorization)
    }

    @Post('/web3/login')
    async web3Login(@Body() doc: Web3LoginDto): Promise<any> {
        return this.authService.web3Login(doc)
    }

    @Post('/web3/verify-login')
    async web3VerifyLogin(@Body() doc: VerifyWeb3LoginDto): Promise<any> {
        return this.authService.web3VerifyLogin(doc)
    }
}
