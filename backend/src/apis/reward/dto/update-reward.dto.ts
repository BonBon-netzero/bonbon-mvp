import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator'

import { REWARD_TYPE } from 'shared/constants/type.constant'

export class UpdateRewardDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    amount: number

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(REWARD_TYPE)
    type: REWARD_TYPE
}
