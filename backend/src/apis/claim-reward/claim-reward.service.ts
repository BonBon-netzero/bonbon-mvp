import * as CodeGenerator from 'voucher-code-generator'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { nodeRpc, privateKey, tokenContract } from 'configs'
import { ethers } from 'ethers'
import { Model } from 'mongoose'

import { BrandEntity } from 'apis/brand/entity/brand.entity'
import { Brand } from 'apis/brand/models/brand.schema'
import { ClaimRewardDto } from 'apis/claim-reward/dto/claim-reward.dto'
import { ClaimRewardEntity } from 'apis/claim-reward/entity/claim-reward.entity'
import { ClaimRewardHistory } from 'apis/claim-reward/models/claim-reward.schema'
import { RewardEntity } from 'apis/reward/entity/reward.entity'
import { Reward } from 'apis/reward/models/reward.schema'
import { User } from 'apis/user/models/user.schema'
import { RedisService } from 'frameworks/redis-service/redis.service'
import { IListingInput, IListReturn } from 'shared/common/interfaces/list'
import { COLLECTION, ERROR, REDIS_KEY } from 'shared/constants'
import {
    CLAIM_REWARD_STATUS,
    REWARD_STATUS,
} from 'shared/constants/status.constant'
import { REWARD_TYPE } from 'shared/constants/type.constant'

@Injectable()
export class ClaimRewardService {
    private tokenABI = [
        'function transfer(address to, uint amount) returns (bool)',
    ]
    private provider

    constructor(
        @InjectModel(COLLECTION.USER)
        private readonly UserModel: Model<User>,
        @InjectModel(COLLECTION.BRAND)
        private readonly BrandModel: Model<Brand>,
        @InjectModel(COLLECTION.REWARD)
        private readonly RewardModel: Model<Reward>,
        @InjectModel(COLLECTION.CLAIM_REWARD_HISTORY)
        private readonly ClaimRewardHistoryModel: Model<ClaimRewardHistory>,
        private redis: RedisService
    ) {
        this.provider = new ethers.providers.JsonRpcProvider(nodeRpc, 84532)
    }

    async integrate(
        userId: string,
        brandCode: string
    ): Promise<ClaimRewardEntity> {
        if (this.redis.get(`${REDIS_KEY.LAST_TIME_RUN_DAT_BIKE}_${userId}`)) {
            throw new BadRequestException(ERROR.RATE_LIMIT)
        }

        this.redis.setNX(
            `${REDIS_KEY.LAST_TIME_RUN_DAT_BIKE}_${userId}`,
            true,
            60
        )

        if (brandCode !== 'DAT_BIKE') {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BRAND)
        }
        const brand = await this.BrandModel.findOne({ code: brandCode })
        if (!brand) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BRAND)
        }
        const code = this.generateCode({
            length: 8,
            charset: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        }).toUpperCase()

        await new this.RewardModel({
            name: 'Use Dat Bike',
            brandId: brand.id,
            image: 'https://mms.img.susercontent.com/vn-11134004-7r98o-lpkaumqgn1yd37',
            description: 'Drive 10km with electric bike',
            amount: 0.01,
            type: REWARD_TYPE.INTEGRATE,
            brandName: brand.name,
            code,
        }).save()

        return this.claimReward(userId, { code })
    }

    async claimReward(
        userId: string,
        doc: ClaimRewardDto
    ): Promise<ClaimRewardEntity> {
        const [reward, user]: [Reward, User] = await Promise.all([
            this.RewardModel.findOne({
                code: doc.code,
                status: REWARD_STATUS.AVAILABLE,
                deleted: false,
            }),
            this.UserModel.findById(userId),
        ])
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

        const txHash = await this.sendReward(user.username, reward.amount)
        const createdData = await new this.ClaimRewardHistoryModel({
            userId,
            rewardId: reward.id,
            brandId: reward.brandId,
            status: CLAIM_REWARD_STATUS.CLAIMED,
            amount: reward.amount,
            txHash,
        }).save()
        return new ClaimRewardEntity(createdData)
    }

    async sendReward(recipient: string, amount: number): Promise<string> {
        const wallet = new ethers.Wallet(privateKey, this.provider)
        const contract = new ethers.Contract(
            tokenContract,
            this.tokenABI,
            wallet
        )
        const tAmount = ethers.utils.parseUnits(`${amount}`, 18)

        const tx = await contract.transfer(recipient, tAmount, {
            gasLimit: 200000,
            gasPrice: ethers.utils.parseUnits('0.002', 'gwei'),
        })
        const receipt = await tx.wait()
        return receipt.transactionHash
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

    async getClaimedRewardGroupByBrand(userId: string) {
        const rewards = await this.ClaimRewardHistoryModel.aggregate([
            { $match: { userId, status: CLAIM_REWARD_STATUS.CLAIMED } },
            { $group: { _id: '$brandId', totalReward: { $sum: '$amount' } } },
        ])

        const brands: Brand[] = await this.BrandModel.find({
            _id: { $in: rewards.map((d) => d._id) },
        })
        const data = []
        for (const reward of rewards) {
            data.push({
                brand: new BrandEntity(brands.find((b) => b.id === reward._id)),
                totalReward: reward.totalReward,
            })
        }

        return data
    }

    generateCode(option: { length: number; charset?: string }) {
        const { length, charset } = option
        return CodeGenerator.generate({
            length,
            count: 1,
            charset:
                charset ||
                '123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
        })[0]
    }
}
