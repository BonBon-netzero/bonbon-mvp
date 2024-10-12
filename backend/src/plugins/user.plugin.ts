import * as BCrypt from 'bcryptjs'

import { BASE_VALUE } from 'shared/constants'

async function hashPassword(next) {
    if (
        this.password &&
        this.password.length <= BASE_VALUE.MAX_PASSWORD_LENGTH
    ) {
        this.password = await BCrypt.hash(this.password, 8)
        this['changePasswordAt'] = new Date()
    } else if (
        this._update &&
        this._update['$set'] &&
        this._update['$set'].password &&
        this._update['$set'].password <= BASE_VALUE.MAX_PASSWORD_LENGTH
    ) {
        this._update['$set'].password = await BCrypt.hash(
            this._update['$set'].password,
            8
        )
        this._update['$set']['changePasswordAt'] = new Date()
    }
    return next()
}

export default function (schema) {
    schema.pre('save', hashPassword)
    schema.pre('update', hashPassword)
    schema.pre('findByIdAndUpdate', hashPassword)
}
