import { Branding } from 'apis/branding/models/branding.schema'

export class BrandingEntity {
    id: string
    name: string
    code: string
    avatar: string

    constructor(partial: Partial<Branding>) {
        if (partial) {
            this.id = partial.id
            this.name = partial.name
            this.code = partial.code
            this.avatar = partial.avatar
        }
    }
}
