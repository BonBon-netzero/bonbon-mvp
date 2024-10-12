import { ClaimRewardHistory } from 'apis/claim-reward/models/claim-reward.schema'
import { RewardEntity } from 'apis/reward/entity/reward.entity'
import { CLAIM_REWARD_STATUS } from 'shared/constants/status.constant'

export class ClaimRewardEntity {
    id: string
    reward: RewardEntity
    amount: number
    status: CLAIM_REWARD_STATUS
    createdAt: Date

    constructor(partial: Partial<ClaimRewardHistory>) {
        if (partial) {
            this.id = partial.id
            this.amount = partial.amount
            this.status = partial.status
            this.createdAt = partial.createdAt
        }
    }
}
