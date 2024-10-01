import * as fs from 'fs'
import { Controller, Get } from '@nestjs/common'
import {
    HealthCheck,
    HealthCheckService,
    MongooseHealthIndicator,
} from '@nestjs/terminus'

import { RedisService } from 'frameworks/redis-service/redis.service'

// @ts-ignore
import packageJson = require('../package.json')

@Controller()
export class AppController {
    private readonly commitId

    constructor(
        private health: HealthCheckService,
        private mongoose: MongooseHealthIndicator,
        private redis: RedisService
    ) {
        this.commitId = fs.readFileSync('commit-hash.txt', 'utf8')
    }

    @Get('/health')
    @HealthCheck()
    check() {
        return this.health.check([
            async () => this.mongoose.pingCheck('mongoose'),
            async () => {
                return {
                    redis: {
                        status: (await this.redis.ping()) ? 'up' : 'down',
                    },
                }
            },
            async () => ({
                apiVersion: packageJson.version,
                commitId: this.commitId,
            }),
        ])
    }
}
