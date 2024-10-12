import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { authSecretKey } from 'configs'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authSecretKey,
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username }
    }
}
