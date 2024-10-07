import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron } from '@nestjs/schedule'
import { baseNodeUrl } from 'configs'
import { Transaction } from 'modules/listeners/models/transaction.schema'
import { Model } from 'mongoose'

import { RedisService } from 'frameworks/redis-service/redis.service'
import { COLLECTION, REDIS_KEY } from 'shared/constants'
import {
    CONTRACTS,
    DEFAULT_BLOCK_NUMBER, RAW_DATA_TYPE,
    TOPIC
} from "shared/constants/transaction-constant";
import { CronjobGuard } from 'shared/decorator/cronjob-guard-decorator'
import AsyncUtil from 'shared/helpers/async-util'
import TimeUtil from 'shared/helpers/time-util'
import Web3Utils from 'shared/helpers/web3-util'

@Injectable()
export class TransactionListenerService {
    private BLOCK_PROCESS_LIMIT = 50
    private GET_BLOCK_LIMIT = 50
    private web3
    private LISTEN_TOPICS = Object.values(TOPIC)
    constructor(
        @InjectModel(COLLECTION.TRANSACTION)
        private readonly TransactionModel: Model<Transaction>,
        private readonly redis: RedisService
    ) {
        this.web3 = Web3Utils.generateWeb3(baseNodeUrl)
    }

    @Cron('*/2 * * * * *')
    @CronjobGuard()
    async listen() {
        let triggerBlock
        try {
            const [lastBlock, lastTriggerBlockNumber] = await Promise.all([
                this.web3.eth.getBlockNumber(),
                this.redis.get(REDIS_KEY.TRANSACTION_TRIGGER_BLOCK),
            ])

            const mLastBlock = lastBlock - 2 // delay 2 blocks

            if (!lastTriggerBlockNumber) {
                await this.redis.set(
                    REDIS_KEY.TRANSACTION_TRIGGER_BLOCK,
                    DEFAULT_BLOCK_NUMBER
                )
            } else if (lastTriggerBlockNumber <= mLastBlock) {
                triggerBlock = parseInt(lastTriggerBlockNumber) || mLastBlock
                let toBlock = Math.min(
                    triggerBlock + this.BLOCK_PROCESS_LIMIT,
                    mLastBlock
                )
                if (triggerBlock > toBlock) {
                    return
                }
                while (true) {
                    const logs = await this.web3.eth.getPastLogs({
                        address: CONTRACTS,
                        // fromBlock: triggerBlock,
                        // toBlock: toBlock,
                        fromBlock: 16216204,
                        toBlock: 16216204,
                        topics: [this.LISTEN_TOPICS],
                    })

                    if (logs?.length) {
                        const mapBlockTime = await this.getMapBlockTime(logs)
                        const bulks = []
                        for (const log of logs) {
                            const listenTopic = log.topics.find((topic) =>
                                this.LISTEN_TOPICS.includes(topic)
                            )
                            const data = this.getData(log, listenTopic as TOPIC)
                            if (!data) {
                                continue
                            }

                            const blockNumber = Number(log.blockNumber)
                            const logIndex = Number(log.logIndex)
                            bulks.push({
                                updateOne: {
                                    filter: {
                                        blockNumber,
                                        logIndex,
                                    },
                                    update: {
                                        blockNumber,
                                        logIndex,
                                        data,
                                        log: {
                                            ...log,
                                            blockNumber,
                                            logIndex,
                                            transactionIndex: Number(
                                                log.transactionIndex
                                            ),
                                        },
                                        blockTime: new Date(
                                            mapBlockTime[blockNumber]
                                        ),
                                        topic: listenTopic,
                                        type: (() => {
                                            switch (listenTopic as string) {
                                                case TOPIC.BROADCAST:
                                                    return RAW_DATA_TYPE.BROADCAST
                                            }
                                        })(),
                                    },
                                    upsert: true,
                                },
                            })
                        }
                        await this.TransactionModel.bulkWrite(bulks, {
                            ordered: true,
                        })
                    }

                    await this.redis.set(
                        REDIS_KEY.TRANSACTION_TRIGGER_BLOCK,
                        toBlock - 1
                    )
                    if (toBlock === mLastBlock) break
                    triggerBlock = toBlock - 1
                    toBlock = Math.min(
                        toBlock + this.BLOCK_PROCESS_LIMIT,
                        mLastBlock
                    )
                }
            }
        } catch (err) {
            console.log('listener-transaction', err)
        }
    }

    async getMapBlockTime(logs: any[]) {
        const blockNumbers = [...new Set(logs.map((log) => log.blockNumber))]
        const page: number = Math.ceil(
            blockNumbers.length / this.GET_BLOCK_LIMIT
        )
        const blockDetails = []
        for (let i = 0; i < page; i++) {
            blockDetails.push(
                ...(await Promise.all(
                    blockNumbers
                        .slice(
                            i * this.GET_BLOCK_LIMIT,
                            (i + 1) * this.GET_BLOCK_LIMIT
                        )
                        .map((blockNumber) =>
                            AsyncUtil.wrapPromise(
                                this.web3.eth.getBlock(blockNumber),
                                5000,
                                { message: 'Timeout' },
                                true
                            )
                        )
                ))
            )
            await TimeUtil.sleep(200)
        }

        return blockDetails.reduce(
            (obj, item) => (
                (obj[Number(item['number'])] =
                    Number(item['timestamp']) * 1000),
                obj
            ),
            {}
        )
    }

    getData(log: any, listenTopic: TOPIC) {
        let types = []
        let indexType = []
        switch (listenTopic as TOPIC) {
            case TOPIC.BROADCAST:
                types = [
                    {
                        indexed: false,
                        name: 'broadcastId',
                        type: 'bytes32',
                    },
                    {
                        indexed: false,
                        name: 'amount',
                        type: 'uint256',
                    },
                ]
                indexType = [
                    {
                        indexed: true,
                        name: 'user',
                        type: 'address',
                    },
                ]
                break
        }

        try {
            const parsedData = {
                ...this.web3.eth.abi.decodeLog(
                    indexType,
                    '0x',
                    log.topics.slice(1)
                ),
                ...this.web3.eth.abi.decodeParameters(types, log.data),
            }
            delete parsedData['__length__']
            return this.removeNumberKey(parsedData)
        } catch (e) {
            return null
        }
    }

    removeNumberKey(data: any, arrayToObject = false) {
        if (arrayToObject) {
            for (const key of Object.keys(data)) {
                if (parseInt(key) >= 0) {
                    delete data[key]
                }
            }
            return data
        } else {
            const obj = {}
            for (const key of Object.keys(data)) {
                if (parseInt(key) >= 0) {
                    continue
                }

                obj[key] = data[key]
            }
            return obj
        }
    }
}
