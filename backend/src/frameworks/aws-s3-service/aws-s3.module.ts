import { Global, Module } from '@nestjs/common'
import { config } from 'aws-sdk'
import { amzS3Config } from 'configs'

import { AwsS3Service } from './aws-s3.service'

@Global()
@Module({
    providers: [AwsS3Service],
    exports: [AwsS3Service],
})
export class AwsS3Module {
    constructor() {
        config.update(
            {
                s3BucketEndpoint: true,
                accessKeyId: amzS3Config.keyId,
                secretAccessKey: amzS3Config.accessKey,
                endpoint: amzS3Config.endpoint,
            },
            true
        )
    }
}
