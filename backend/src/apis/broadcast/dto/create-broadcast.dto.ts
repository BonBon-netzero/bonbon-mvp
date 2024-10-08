import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBroadcastDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsNotEmpty()
    @IsString()
    message: string
}
