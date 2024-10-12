import { Reward } from 'apis/reward/models/reward.schema'
import { REWARD_STATUS } from 'shared/constants/status.constant'
import { REWARD_TYPE } from 'shared/constants/type.constant'

export class RewardEntity {
    id: string
    name: string
    code: string
    brandName: string
    image: string
    description: string
    amount: number
    type: REWARD_TYPE
    status: REWARD_STATUS

    constructor(partial: Partial<Reward>) {
        if (partial) {
            this.id = partial.id
            this.name = partial.name
            this.code = partial.code
            this.brandName = partial.brandName
            this.image = partial.image
            this.description = partial.description
            this.amount = partial.amount
            this.type = partial.type
            this.status = partial.status
        }
    }
}
