import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserEntity } from 'apis/user/entities/user.entity'
import { User } from 'apis/user/models/user.schema'
import { COLLECTION, ERROR } from 'shared/constants'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(COLLECTION.USER)
        private readonly UserModel: Model<User>
    ) {}

    async myProfile(userId: string): Promise<UserEntity> {
        const user: User = await this.UserModel.findById(userId)
        if (!user) {
            throw new BadRequestException("Can't not find user")
        }

        return new UserEntity(user)
    }
}
