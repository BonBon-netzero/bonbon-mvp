export function CronjobGuard(): MethodDecorator {
    let isRunning = false

    return (
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        const originalMethod = descriptor.value
        descriptor.value = async function (...args: any[]) {
            if (isRunning) {
                return
            }
            isRunning = true
            try {
                await originalMethod.apply(this, [...args])
            } catch (e) {
                console.log(e)
            }
            isRunning = false
        }
        return descriptor
    }
}
