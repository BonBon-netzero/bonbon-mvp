import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from 'apis/user/entities/user.entity'
import { User } from 'apis/user/models/user.schema'
import { RedisService } from 'frameworks/redis-service/redis.service'
import { ERROR } from 'shared/constants'

import { ROLES_KEY } from './role.guard'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly redis: RedisService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token: string = request?.headers?.authorization || undefined
        if (!token) {
            throw new BadRequestException(ERROR.TOKEN_IS_EMPTY)
        }
        const info = this.jwtService.decode(token)
        if (!info) {
            throw new UnauthorizedException(ERROR.INVALID_TOKEN)
        }

        //validate user info
        const user = await this.validateUser(token)
        request.user = new UserEntity(user)

        //validate role
        const roles: string[] = this.reflector.getAllAndMerge<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (!roles.length) return true
        // check role match with require role
        const matchRoleRequire = roles.includes(user.role)
        if (!matchRoleRequire) {
            throw new ForbiddenException(
                'This action require permission ' + roles[0]
            )
        }
        return true
    }

    async validateUser(token: string): Promise<any> {
        const user: User = await this.redis.get(token)
        if (!user) throw new UnauthorizedException()
        if (user.isBlocked) {
            throw new ForbiddenException(ERROR.USER_BLOCKED)
        }

        if (!user.isActivated) {
            throw new ForbiddenException(ERROR.USER_UNVERIFIED)
        }

        const permissions = []

        return { ...user, permissions }
    }
}
