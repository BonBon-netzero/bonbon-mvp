import { User } from 'apis/user/models/user.schema'
import { IUser } from 'shared/common/interfaces/user.interface'

// eslint-disable-next-line
export interface UserEntity extends IUser {}

export class UserEntity {
    constructor(partial: Partial<User>) {
        if (partial) {
            this.id = partial.id
            this.username = partial.username
            this.isBlocked = partial.isBlocked
            this.isActivated = partial.isActivated
            this.createdAt = partial.createdAt
        }
    }
}
