import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserController } from 'apis/user/user.controller'
import { UserService } from 'apis/user/user.service'

@Module({
    imports: [JwtModule.register({})],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
