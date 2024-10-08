import * as dotEnv from 'dotenv'

import { db } from './db'

dotEnv.config()
const _env = process.env.NODE_ENV || 'development'

export const DB = db[_env]
export const port = process.env.PORT || '3000'
export const authSecretKey = process.env.AUTH_SECRET_KEY
export const baseNodeUrl = process.env.BASE_NODE_URL
export const CONTRACT = process.env.CONTRACT

export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB),
    password: process.env.REDIS_PASSWORD,
}

export const amzS3Config = {
    keyId: process.env.AWS_ACCESS_KEY_ID,
    accessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    endpoint: process.env.AWS_S3_ENDPOINT,
}
