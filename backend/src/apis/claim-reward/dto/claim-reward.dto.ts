import { IsNotEmpty, IsString } from 'class-validator'

export class ClaimRewardDto {
    @IsNotEmpty()
    @IsString()
    code: string
}
