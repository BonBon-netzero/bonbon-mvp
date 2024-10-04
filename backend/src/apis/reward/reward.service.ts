import * as CodeGenerator from 'voucher-code-generator'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Brand } from 'apis/brand/models/brand.schema'
import { CreateRewardDto } from 'apis/reward/dto/create-reward.dto'
import { UpdateRewardDto } from 'apis/reward/dto/update-reward.dto'
import { RewardEntity } from 'apis/reward/entity/reward.entity'
import { Reward } from 'apis/reward/models/reward.schema'
import { IListingInput, IListReturn } from 'shared/common/interfaces/list'
import { COLLECTION, ERROR } from 'shared/constants'

@Injectable()
export class RewardService {
    constructor(
        @InjectModel(COLLECTION.BRAND)
        private readonly BrandModel: Model<Brand>,
        @InjectModel(COLLECTION.REWARD)
        private readonly RewardModel: Model<Reward>
    ) {}

    async createReward(doc: CreateRewardDto): Promise<RewardEntity> {
        const brand: Brand = await this.BrandModel.findOne({
            _id: doc.brandId,
            deleted: false,
        })
        if (!brand) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BRAND)
        }

        const createdReward = await new this.RewardModel({
            ...doc,
            brandName: brand.name,
            code: this.generateCode({
                length: 8,
                charset: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            }).toUpperCase(),
        }).save()
        return new RewardEntity(createdReward)
    }

    async updateReward(
        id: string,
        doc: UpdateRewardDto
    ): Promise<RewardEntity> {
        await this.getExistReward(id)
        const updatedData = await this.RewardModel.findOneAndUpdate(
            {
                _id: id,
                deleted: false,
            },
            doc,
            { new: true }
        )
        if (!updatedData) {
            throw new BadRequestException(
                ERROR.AN_ERROR_OCCURRED_WHEN_UPDATE_DATA
            )
        }

        return new RewardEntity(updatedData)
    }

    async deleteReward(id: string): Promise<void> {
        await this.getExistReward(id)
        await this.RewardModel.findOneAndUpdate(
            {
                _id: id,
                deleted: false,
            },
            { deleted: true },
            { new: true }
        )
    }

    async getRewardById(id: string): Promise<RewardEntity> {
        const existReward = await this.RewardModel.findOne({
            _id: id,
            deleted: false,
        })
        if (!existReward) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_REWARD)
        }

        return new RewardEntity(existReward)
    }

    async getRewardWithPagination(
        args: IListingInput,
        queries: any,
        sort: any
    ): Promise<IListReturn<RewardEntity>> {
        const { limit, offset } = args.pagination
        const [rewards, total]: [Reward[], number] = await Promise.all([
            await this.RewardModel.find(queries)
                .sort(sort)
                .limit(limit)
                .skip(offset),
            await this.RewardModel.count(queries),
        ])

        return {
            data: rewards.map((p) => {
                return new RewardEntity(p)
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    async getExistReward(id: string): Promise<Reward> {
        const existReward = await this.RewardModel.findById(id)
        if (!existReward) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_REWARD)
        }

        if (existReward.deleted) {
            throw new BadRequestException(ERROR.THIS_DATA_HAS_BEEN_DELETED)
        }

        return existReward
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
