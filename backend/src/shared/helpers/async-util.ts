export default class AsyncUtil {
    static async awaitTimeout(delay: number, reason?: any, isReject = false) {
        return new Promise((resolve, reject) =>
            setTimeout(
                // @ts-ignore
                () => {
                    const action = isReject ? reject : resolve
                    return reason === undefined ? action() : action(reason)
                },
                delay
            )
        )
    }

    static async wrapPromise(
        promise: any,
        delay: number,
        reason?: any,
        isReject = false
    ) {
        return Promise.race([
            promise,
            this.awaitTimeout(delay, reason, isReject),
        ])
    }
}
