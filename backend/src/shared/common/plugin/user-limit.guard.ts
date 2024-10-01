import {
    BadRequestException,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

import { ERROR } from 'shared/constants'

export class UserLimitGuard extends ThrottlerGuard {
    async handleRequest(
        context: ExecutionContext,
        limit: number,
        ttl: number
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        const username = request.body.username || request.body.email
        if (!username) {
            throw new BadRequestException(ERROR.BODY_WAS_WRONG)
        }

        const key = this.generateKey(context, username)
        const cacheTimesDuringTtl = await this.storageService.getRecord(key)

        if (cacheTimesDuringTtl.length >= limit) {
            throw new HttpException(
                { message: ERROR.RATE_LIMIT },
                HttpStatus.TOO_MANY_REQUESTS
            )
        }
        await this.storageService.addRecord(key, ttl)
        return true
    }
}
