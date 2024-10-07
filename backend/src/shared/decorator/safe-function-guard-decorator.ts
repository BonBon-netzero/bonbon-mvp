export function SafeFunctionGuard(): MethodDecorator {
    return (
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        const originalMethod = descriptor.value
        descriptor.value = async function (...args: any[]) {
            try {
                await originalMethod.apply(this, [...args])
            } catch (e) {
                // @ts-ignore
                console.log(`${propertyKey} - ${e}`)
            }
        }
        return descriptor
    }
}
