import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateBroadcastDto } from 'apis/broadcast/dto/create-broadcast.dto'
import { BroadcastEntity } from 'apis/broadcast/entity/broadcast.entity'
import { Broadcast } from 'apis/broadcast/models/broadcast.schema'
import { Reaction } from 'apis/reaction/models/reaction.schema'
import { User } from 'apis/user/models/user.schema'
import { IListingInput, IListReturn } from 'shared/common/interfaces/list'
import { BROADCAST_STATUS, COLLECTION, ERROR } from 'shared/constants'

@Injectable()
export class BroadcastService {
    constructor(
        @InjectModel(COLLECTION.BROADCAST)
        private readonly BroadcastModel: Model<Broadcast>,
        @InjectModel(COLLECTION.REACTION)
        private readonly ReactionModel: Model<Reaction>,
        @InjectModel(COLLECTION.USER)
        private readonly UserModel: Model<User>
    ) {}

    async createBroadcast(
        userId: string,
        doc: CreateBroadcastDto
    ): Promise<BroadcastEntity> {
        const broadcast = await new this.BroadcastModel({
            ...doc,
            userId,
            status: BROADCAST_STATUS.IN_PROGRESS,
        }).save()
        return new BroadcastEntity(broadcast)
    }

    async getBroadcastById(id: string): Promise<BroadcastEntity> {
        const existBroadcast: Broadcast = await this.BroadcastModel.findOne({
            _id: id,
            status: BROADCAST_STATUS.SUCCESS,
        })

        if (!existBroadcast) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BROADCAST)
        }
        const user = await this.UserModel.findById(existBroadcast.userId)
        const entity = new BroadcastEntity(existBroadcast)
        entity.reaction = await this.getReactionByBroadcastId(existBroadcast.id)
        entity.username = user.username
        return entity
    }

    async getBroadcastWithPagination(
        args: IListingInput,
        queries: any,
        sort: any
    ): Promise<IListReturn<BroadcastEntity>> {
        const { limit, offset } = args.pagination
        const [broadcasts, total]: [Broadcast[], number] = await Promise.all([
            await this.BroadcastModel.find(queries)
                .sort(sort)
                .limit(limit)
                .skip(offset),
            await this.BroadcastModel.count(queries),
        ])

        const users = await this.UserModel.find({
            _id: { $in: broadcasts.map((item) => item.userId) },
        })

        const broadcastEntities = []
        for (const broadcast of broadcasts) {
            const entity = new BroadcastEntity(broadcast)
            entity.reaction = await this.getReactionByBroadcastId(broadcast.id)
            entity.username = users.find(
                (user) => user.id === broadcast.userId
            ).username
            broadcastEntities.push(entity)
        }

        return {
            data: broadcastEntities,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    async getReactionByBroadcastId(broadcastId: string) {
        const reactionAggs = await this.ReactionModel.aggregate([
            { $match: { broadcastId, deleted: false } },
            {
                $group: {
                    _id: '$type',
                    totalCount: { $sum: 1 },
                },
            },
        ])

        const reaction = {}
        if (reactionAggs.length) {
            reactionAggs.forEach((reactionAgg) => {
                reaction[reactionAgg['_id']] = reactionAgg.totalCount
            })
        }
        return reaction
    }
}
