export enum COLLECTION {
    USER = 'users',
}

export enum REDIS_KEY {}

export enum CACHING_KEY {}

export enum ERROR {
    RATE_LIMIT = 'You are being rate limited',
    BODY_WAS_WRONG = "The request's body is wrong",
    TOKEN_IS_EMPTY = 'JWT token is empty',
    INVALID_TOKEN = 'Invalid JWT token',
    USER_BLOCKED = 'The user has been blocked',
    USER_UNVERIFIED = "The user doesn't verified",
}

export enum BASE_VALUE {
    MAX_PASSWORD_LENGTH = 100,
    TTL_TOKEN_REDIS = 7 * 24 * 60 * 60,
}

export enum SortType {
    asc = 'asc',
    desc = 'desc',
}

export const BULL_OPTS = {
    removeOnComplete: true,
    removeOnFail: true,
    // attempts: 0,
    timeout: 5 * 60 * 1000, //5m
}

export const TIMESTAMP_1_DAY = 24 * 60 * 60 * 1000
export const DEFAULT_THREAD = 15
export const LIMIT_IMAGE_SIZE = 10 * 1024 * 1024
export const DATA_DELAY_TIME = 10 * 60 * 1000
