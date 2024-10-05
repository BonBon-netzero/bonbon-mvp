import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ClaimRewardDto } from 'apis/claim-reward/dto/claim-reward.dto'
import { ClaimRewardEntity } from 'apis/claim-reward/entity/claim-reward.entity'
import { ClaimRewardHistory } from 'apis/claim-reward/models/claim-reward.schema'
import { RewardEntity } from 'apis/reward/entity/reward.entity'
import { Reward } from 'apis/reward/models/reward.schema'
import { IListingInput, IListReturn } from 'shared/common/interfaces/list'
import { COLLECTION, ERROR } from 'shared/constants'
import {
    CLAIM_REWARD_STATUS,
    REWARD_STATUS,
} from 'shared/constants/status.constant'

@Injectable()
export class ClaimRewardService {
    constructor(
        @InjectModel(COLLECTION.REWARD)
        private readonly RewardModel: Model<Reward>,
        @InjectModel(COLLECTION.CLAIM_REWARD_HISTORY)
        private readonly ClaimRewardHistoryModel: Model<ClaimRewardHistory>
    ) {}

    async claimReward(
        userId: string,
        doc: ClaimRewardDto
    ): Promise<ClaimRewardEntity> {
        const reward: Reward = await this.RewardModel.findOne({
            code: doc.code,
            status: REWARD_STATUS.AVAILABLE,
            deleted: false,
        })
        if (!reward) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_REWARD)
        }

        const existsClaimReward: ClaimRewardHistory =
            await this.ClaimRewardHistoryModel.findOne({
                userId,
                rewardId: reward.id,
                status: { $ne: CLAIM_REWARD_STATUS.FAILURE },
                deleted: false,
            })
        if (existsClaimReward) {
            throw new BadRequestException(ERROR.REWARD_ALREADY_CLAIMED)
        }

        const createdData = await new this.ClaimRewardHistoryModel({
            userId,
            rewardId: reward.id,
            status: CLAIM_REWARD_STATUS.PENDING,
            amount: reward.amount,
        }).save()
        return new ClaimRewardEntity(createdData)
    }

    async getClaimRewardById(
        userId: string,
        id: string
    ): Promise<ClaimRewardEntity> {
        const existClaimReward: ClaimRewardHistory =
            await this.ClaimRewardHistoryModel.findOne({
                _id: id,
                userId,
                deleted: false,
            })
        if (!existClaimReward) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_REWARD)
        }

        const reward = await this.RewardModel.findById(
            existClaimReward.rewardId
        )

        const entity = new ClaimRewardEntity(existClaimReward)
        entity.reward = new RewardEntity(reward)
        return entity
    }

    async getClaimRewardWithPagination(
        args: IListingInput,
        queries: any,
        sort: any
    ): Promise<IListReturn<ClaimRewardEntity>> {
        const { limit, offset } = args.pagination
        const [claimRewards, total]: [ClaimRewardHistory[], number] =
            await Promise.all([
                await this.ClaimRewardHistoryModel.find(queries)
                    .sort(sort)
                    .limit(limit)
                    .skip(offset),
                await this.ClaimRewardHistoryModel.count(queries),
            ])

        const rewards: Reward[] = await this.RewardModel.find({
            _id: { $in: claimRewards.map((c) => c.rewardId) },
        })

        return {
            data: claimRewards.map((p) => {
                const entity = new ClaimRewardEntity(p)
                const reward = rewards.find((r) => r.id === p.rewardId)
                entity.reward = new RewardEntity(reward)
                return entity
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }
}
