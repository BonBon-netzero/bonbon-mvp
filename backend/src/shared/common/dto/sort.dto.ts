import { IsEnum, IsOptional, IsString } from 'class-validator'

import { SortType } from 'shared/constants'

export class SortDto {
    @IsOptional()
    @IsEnum(SortType)
    sortType?: SortType

    @IsOptional()
    @IsString()
    sortBy?: string
}
