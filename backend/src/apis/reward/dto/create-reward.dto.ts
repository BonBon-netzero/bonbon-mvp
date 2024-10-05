import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator'

import { REWARD_TYPE } from 'shared/constants/type.constant'

export class CreateRewardDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    brandId: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string

    @IsNumber()
    @Min(0)
    amount: number

    @IsNotEmpty()
    @IsEnum(REWARD_TYPE)
    type: REWARD_TYPE
}
