import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Store } from 'cache-manager'
import { RedisClientType } from 'redis'

@Injectable()
export class RedisService {
    private readonly redisClient: RedisClientType

    constructor(@Inject(CACHE_MANAGER) private readonly cache: Store) {
        // @ts-ignore
        this.redisClient = this.cache.store.getClient()
    }

    async get(key: string): Promise<any> {
        return this.cache.get(key)
    }

    async getKeys(key: string): Promise<any> {
        // @ts-ignore
        return this.cache.store.keys(key)
    }

    async mget(keys: string[]): Promise<any> {
        // @ts-ignore
        return this.cache.store.mget(...keys)
    }

    async set(key: string, value: any, ttl = 0) {
        // @ts-ignore
        await this.cache.set(key, value, { ttl })
    }

    async ttl(key: string): Promise<number> {
        // @ts-ignore
        return this.cache.store.ttl(key)
    }

    async del(key: string) {
        await this.cache.del(key)
    }

    async incr(key: string) {
        await this.redisClient.incr(key)
    }

    async setNX(key: string, value: any, ttl = 0): Promise<boolean> {
        const isOk = await this.redisClient.setNX(key, JSON.stringify(value))
        if (isOk && ttl > 0) {
            await this.redisClient.expire(key, 300)
        }
        return isOk
    }

    async queuePush(key: string, value: any): Promise<number> {
        return this.redisClient.lPush(key, JSON.stringify(value))
    }

    async queuePushBulk(key: string, value: any[]): Promise<number> {
        return this.redisClient.lPush(
            key,
            value.map((v) => JSON.stringify(v))
        )
    }

    async queuePop(key: string, count = 1): Promise<any[]> {
        const data = await this.redisClient.rPopCount(key, count)
        if (data) {
            return data.map((d) => JSON.parse(d))
        }
        return data
    }

    async hSet(key: string, field: string, value: string): Promise<any> {
        return this.redisClient.hSet(key, field, value)
    }

    async hmGet(key: string, fields: string[]): Promise<any[]> {
        return this.redisClient.hmGet(key, fields)
    }

    async hGet(key: string, field: string): Promise<any> {
        return this.redisClient.hGet(key, field)
    }

    async hGetAll(key: string): Promise<any> {
        return this.redisClient.hGetAll(key)
    }

    //options - (NX | (XX & LT & GT)) & CH & INCR https://redis.io/docs/latest/commands/zadd/
    async zAdd(
        key: string,
        values: { value: string; score: number }[],
        options?: any
    ): Promise<any> {
        return this.redisClient.zAdd(key, values, options)
    }

    async zRank(key: string, member: string): Promise<any> {
        return this.redisClient.zRank(key, member)
    }

    async zCard(key: string): Promise<number> {
        return this.redisClient.zCard(key)
    }

    async zRevRank(key: string, member: string): Promise<any> {
        return this.redisClient.zRevRank(key, member)
    }

    async ping(): Promise<boolean> {
        return (await this.redisClient.ping()) === 'PONG'
    }
}
