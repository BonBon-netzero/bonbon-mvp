import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Broadcast } from 'apis/broadcast/models/broadcast.schema'
import { UpsertReactionDto } from 'apis/reaction/dto/upsert-reaction.dto'
import { Reaction } from 'apis/reaction/models/reaction.schema'
import { BROADCAST_STATUS, COLLECTION, ERROR } from 'shared/constants'

@Injectable()
export class ReactionService {
    constructor(
        @InjectModel(COLLECTION.BROADCAST)
        private readonly BroadcastModel: Model<Broadcast>,
        @InjectModel(COLLECTION.REACTION)
        private readonly ReactionModel: Model<Reaction>
    ) {}

    async createReaction(
        userId: string,
        doc: UpsertReactionDto
    ): Promise<void> {
        const existBroadcast = await this.BroadcastModel.findOne({
            _id: doc.broadcastId,
            status: BROADCAST_STATUS.SUCCESS,
        })

        if (!existBroadcast) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_BROADCAST)
        }

        const existReaction = await this.ReactionModel.findOne({
            userId,
            broadcastId: doc.broadcastId,
        })

        const updateDoc = {
            type: doc.type,
            deleted: false,
            userId,
            broadcastId: doc.broadcastId,
        }

        if (existReaction && existReaction.type === doc.type) {
            updateDoc.deleted = !existReaction.deleted
        }

        const newReaction = await this.ReactionModel.bulkWrite([
            {
                updateOne: {
                    filter: { userId, broadcastId: doc.broadcastId },
                    update: updateDoc,
                    upsert: true,
                },
            },
        ])
    }
}
