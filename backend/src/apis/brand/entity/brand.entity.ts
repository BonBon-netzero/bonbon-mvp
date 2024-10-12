import { Brand } from 'apis/brand/models/brand.schema'

export class BrandEntity {
    id: string
    name: string
    code: string
    avatar: string

    constructor(partial: Partial<Brand>) {
        if (partial) {
            this.id = partial.id
            this.name = partial.name
            this.code = partial.code
            this.avatar = partial.avatar
        }
    }
}
