import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import { ManagedUpload } from 'aws-sdk/clients/s3'
import { amzS3Config } from 'configs'

@Injectable()
export class AwsS3Service {
    private s3 = new S3()

    async uploadFile(
        key: string,
        image: any,
        width: number,
        height: number
    ): Promise<ManagedUpload.SendData> {
        image = image.rotate().resize(width, height)
        const buffer = await image.toBuffer()
        return this.s3
            .upload({
                Bucket: amzS3Config.bucketName,
                Body: buffer,
                Key: key,
            })
            .promise()
    }

    async getFile(key: string): Promise<S3.Types.GetObjectOutput> {
        const params: S3.Types.GetObjectRequest = {
            Bucket: amzS3Config.bucketName,
            Key: key,
        }
        return this.s3.getObject(params).promise()
    }
}
