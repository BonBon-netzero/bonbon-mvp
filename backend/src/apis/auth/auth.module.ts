import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { authSecretKey } from 'configs'

import { JwtStrategy } from 'apis/auth/jwt.strategy'
import { UserService } from 'apis/user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    imports: [
        JwtModule.register({
            secret: authSecretKey,
            signOptions: { expiresIn: '60s' },
        }),
        HttpModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
