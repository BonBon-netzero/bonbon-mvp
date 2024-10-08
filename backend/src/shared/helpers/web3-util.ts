import * as Web3 from 'web3'
import { formatUnits } from 'ethers/lib/utils'
import { isAddress, toChecksumAddress } from 'web3-utils'

export default class Web3Utils {
    static generateWeb3(url) {
        return new (Web3 as any)(
            new (Web3 as any).providers.HttpProvider(url, {
                timeout: 10000,
            })
        )
    }

    static checksumAddress(address: string): string {
        try {
            return toChecksumAddress(address)
        } catch (error) {
            return address
        }
    }

    static validateAndChecksumAddress(address: string): string {
        try {
            return toChecksumAddress(address)
        } catch (error) {
            return ''
        }
    }

    static filterInvalidAddresses(addresses: string[]): string[] {
        return addresses.filter((address) => !isAddress(address))
    }

    static formatUnitToFloat(value: string, decimals = 18, fixed?: number) {
        return parseFloat(
            parseFloat(formatUnits(value, decimals)).toFixed(fixed ?? 9)
        )
    }

    static reverseString(str: string): string {
        return str.split('').reverse().join('')
    }
}
