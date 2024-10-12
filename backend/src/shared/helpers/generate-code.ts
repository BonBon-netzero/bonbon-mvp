import * as CodeGenerator from 'voucher-code-generator'

export default class GenerateCodeUtil {
    static create(option: { length: number; charset?: string }) {
        const { length, charset } = option
        return CodeGenerator.generate({
            length,
            count: 1,
            charset:
                charset ||
                '123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
        })[0]
    }
}
