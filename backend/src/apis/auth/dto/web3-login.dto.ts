import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class Web3LoginDto {
    @IsNotEmpty()
    @IsString()
    address: string
}

export class VerifyWeb3LoginDto {
    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    sign: string

    @IsNotEmpty()
    @IsString()
    time: string
}
