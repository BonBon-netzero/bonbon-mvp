export default class TimeUtil {
    static async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    static convertBlockchainTimeStamp(timeStamp: number) {
        return new Date(timeStamp * 1000)
    }

    static toStartOfDate(date: Date | number) {
        return typeof date === 'number'
            ? new Date(new Date(date).setHours(0, 0, 0, 0))
            : new Date(new Date(date.getTime()).setHours(0, 0, 0, 0))
    }

    static toEndOfDate(date: Date) {
        return new Date(new Date(date.getTime()).setHours(23, 59, 59, 0))
    }
}
