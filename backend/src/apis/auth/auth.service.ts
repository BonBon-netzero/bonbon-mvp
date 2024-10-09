import * as Web3 from 'web3'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { VerifyWeb3LoginDto, Web3LoginDto } from 'apis/auth/dto/web3-login.dto'
import { UserEntity } from 'apis/user/entities/user.entity'
import { User } from 'apis/user/models/user.schema'
import { RedisService } from 'frameworks/redis-service/redis.service'
import { IUser } from 'shared/common/interfaces/user.interface'
import { BASE_VALUE, COLLECTION, REDIS_KEY, ROLE } from 'shared/constants'
import GenerateCodeUtil from 'shared/helpers/generate-code'

@Injectable()
export class AuthService {
    private web3

    constructor(
        @InjectModel(COLLECTION.USER)
        private readonly UserModel: Model<User>,
        private readonly redis: RedisService,
        private readonly jwtService: JwtService,
        private readonly http: HttpService
    ) {
        this.web3 = new (Web3 as any)()
    }

    async login(user: IUser): Promise<any> {
        const oldToken = await this.redis.get(user.id)

        const userInfo = new UserEntity(user)
        if (oldToken) {
            return { ...userInfo, access_token: oldToken }
        }
        const token = this.jwtService.sign(
            {
                username: user.username,
                time: new Date().getTime(),
                access: this.generateAccess(),
            },
            { expiresIn: '7 days' }
        )

        await Promise.all([
            this.redis.set(token, userInfo, BASE_VALUE.TTL_TOKEN_REDIS),
            this.redis.set(user.id, token, BASE_VALUE.TTL_TOKEN_REDIS),
        ])

        return { ...userInfo, access_token: token }
    }

    async logout(token: string): Promise<void> {
        const user: IUser = await this.redis.get(token)
        if (user) {
            await this.redis.del(user.id)
        }
        return this.redis.del(token)
    }

    async web3Login(doc: Web3LoginDto): Promise<any> {
        doc.address = doc.address
            ? this.web3.utils.toChecksumAddress(doc.address)
            : null
        const verifyCode = this.generateOtp()

        const oldToken = await this.redis.get(doc.address)
        if (oldToken) {
            await this.logout(oldToken)
        }

        await this.redis.set(
            REDIS_KEY.VERIFY_LOGIN + doc.address,
            {
                address: doc.address,
                verifyCode,
            },
            5 * 60 //5m
        )
        return { verifyCode }
    }

    async web3VerifyLogin(doc: VerifyWeb3LoginDto): Promise<any> {
        doc.address = this.web3.utils.toChecksumAddress(doc.address)
        const [confirmInfo, user] = await Promise.all([
            this.redis.get(REDIS_KEY.VERIFY_LOGIN + doc.address),
            this.UserModel.findOne({ username: doc.address }),
        ])
        if (!confirmInfo) {
            throw new BadRequestException('Invalid verify code')
        }

        await this.verifySign({
            signature: doc.sign,
            address: doc.address,
            verifyCode: confirmInfo.verifyCode,
            time: doc.time,
            isCoinbaseWallet: doc.isCoinbaseWallet,
        })

        let userInfo: UserEntity
        if (user) {
            userInfo = new UserEntity(user)
        } else {
            const createdUser: User = await new this.UserModel({
                username: doc.address,
                role: ROLE.USER,
                isActivated: true,
            }).save()
            userInfo = new UserEntity(createdUser)
        }

        const token = this.jwtService.sign({
            username: doc.address,
            time: new Date().getTime(),
            access: this.generateAccess(),
        })

        await Promise.all([
            this.redis.set(token, userInfo, BASE_VALUE.TTL_TOKEN_REDIS),
            this.redis.set(userInfo.id, token, BASE_VALUE.TTL_TOKEN_REDIS),
            this.redis.del(REDIS_KEY.VERIFY_LOGIN + doc.address),
        ])

        return {
            ...userInfo,
            access_token: token,
        }
    }

    async verifySign(option: {
        signature: string
        address: string
        verifyCode: string
        time: string
        isCoinbaseWallet: boolean
    }): Promise<boolean> {
        const { signature, address, verifyCode, time } = option

        const message = `I want to login on bonbon.eco at ${time}. Login code: ${verifyCode}`

        if (option.isCoinbaseWallet) {
            const { isValid } = await this.http
                .post(
                    ' https://api.sequence.app/rpc/API/IsValidMessageSignature',
                    {
                        walletAddress: address,
                        message,
                        signature,
                        chainId: '8453',
                    }
                )
                .toPromise()
                .then((res) => res.data)
            return isValid
        }
        // Use ecrecover
        let recoveredAddress = recoverPersonalSignature({
            data: message,
            signature: signature,
        })
        recoveredAddress = this.web3.utils.toChecksumAddress(recoveredAddress)
        if (recoveredAddress !== address) {
            throw new BadRequestException('Invalid signature')
        }
        return true
    }

    generateAccess() {
        return (
            GenerateCodeUtil.create({
                length: 10,
                charset:
                    '123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
            }) + new Date().getTime()
        )
    }

    generateOtp() {
        return GenerateCodeUtil.create({
            length: 6,
            charset: '0123456789',
        })
    }
}
