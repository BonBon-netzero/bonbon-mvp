import * as dotEnv from 'dotenv'

dotEnv.config()

export const db = {
    development: {
        IS_DEBUG: true,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: true, // Don't build indexes
            retryAttempts: Number.MAX_VALUE, // Never stop trying to reconnect
            retryDelay: 500, // Reconnect every 500ms
            useUnifiedTopology: true,
        },
    },
    test: {},
    staging: {
        URI: process.env.MONGODB_URL,
        USERNAME: process.env.MONGODB_USERNAME,
        PASSWORD: process.env.MONGODB_PASSWORD,
        IS_DEBUG: false,
        AUTH_DB: process.env.MONGODB_AUTH_DB,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: false, // Don't build indexes
            retryAttempts: Number.MAX_VALUE, // Never stop trying to reconnect
            retryDelay: 500, // Reconnect every 500ms
            useUnifiedTopology: true,
        },
    },
    production: {
        URI: process.env.MONGODB_URL,
        USERNAME: process.env.MONGODB_USERNAME,
        PASSWORD: process.env.MONGODB_PASSWORD,
        IS_DEBUG: false,
        AUTH_DB: process.env.MONGODB_AUTH_DB,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: false, // Don't build indexes
            retryAttempts: Number.MAX_VALUE, // Never stop trying to reconnect
            retryDelay: 500, // Reconnect every 500ms
            useUnifiedTopology: true,
        },
    },
}
