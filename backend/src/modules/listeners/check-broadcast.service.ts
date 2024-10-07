import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron } from '@nestjs/schedule'
import { Transaction } from 'modules/listeners/models/transaction.schema'
import { Model } from 'mongoose'

import { Broadcast } from 'apis/broadcast/models/broadcast.schema'
import { RedisService } from 'frameworks/redis-service/redis.service'
import { BROADCAST_STATUS, COLLECTION, REDIS_KEY } from 'shared/constants'
import {
    DEFAULT_BLOCK_NUMBER,
    RAW_DATA_TYPE,
} from 'shared/constants/transaction-constant'
import { CronjobGuard } from 'shared/decorator/cronjob-guard-decorator'

@Injectable()
export class CheckBroadcastService {
    private LIMIT_BLOCK = 50

    constructor(
        @InjectModel(COLLECTION.TRANSACTION)
        private readonly TransactionModel: Model<Transaction>,
        @InjectModel(COLLECTION.BROADCAST)
        private readonly BroadcastModel: Model<Broadcast>,
        private readonly redis: RedisService
    ) {}

    @Cron('*/2 * * * * *')
    @CronjobGuard()
    async solveOrder() {
        try {
            const [lastBlock, rawDataLatestBlock]: [number, number] =
                await Promise.all([
                    this.redis.get(REDIS_KEY.CHECK_BROADCAST_TRIGGER_BLOCK),
                    this.redis.get(REDIS_KEY.TRANSACTION_TRIGGER_BLOCK),
                ])

            if (!rawDataLatestBlock || lastBlock === rawDataLatestBlock) {
                return
            }

            let fromBlock: number = lastBlock || DEFAULT_BLOCK_NUMBER
            while (true) {
                const toBlock: number = Math.min(
                    fromBlock + this.LIMIT_BLOCK,
                    rawDataLatestBlock
                )

                const rawDataList: Transaction[] =
                    await this.TransactionModel.find({
                        blockNumber: {
                            $gte: fromBlock,
                            $lte: toBlock,
                        },
                    }).sort({ blockNumber: 1, logIndex: 1 })

                const bulks = []
                if (rawDataList.length) {
                    for (const rawData of rawDataList) {
                        if (rawData.type === RAW_DATA_TYPE.BROADCAST) {
                            const { log, data } = rawData
                            const broadcastId = data.broadcastId
                            const broadcast = await this.BroadcastModel.findOne(
                                {
                                    broadcastId,
                                    status: BROADCAST_STATUS.IN_PROGRESS,
                                }
                            )
                            if (!broadcast) {
                                continue
                            }
                            bulks.push({
                                updateOne: {
                                    filter: {
                                        _id: broadcastId,
                                    },
                                    update: {
                                        time: rawData.blockTime,
                                        txHash: log.transactionHash,
                                        status: BROADCAST_STATUS.SUCCESS,
                                    },
                                    upsert: false,
                                },
                            })
                        }
                    }
                }
                await this.BroadcastModel.bulkWrite(bulks, { ordered: false })
                await this.redis.set(
                    REDIS_KEY.CHECK_BROADCAST_TRIGGER_BLOCK,
                    toBlock - 1
                )

                if (toBlock === rawDataLatestBlock) {
                    return
                }
                fromBlock = toBlock - 1
            }
        } catch (e) {
            console.log(`Error when check broadcast: ${e?.stack || e}`)
        }
    }
}
