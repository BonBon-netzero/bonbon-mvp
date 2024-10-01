import { IsNotEmpty, IsString } from 'class-validator'

import { SortType } from 'shared/constants'

export class WhereInputDto {
    @IsNotEmpty()
    @IsString()
    fieldName: string

    @IsNotEmpty()
    value: any
}

export class SortInputDto {
    @IsNotEmpty()
    @IsString()
    sortBy: string

    @IsNotEmpty()
    @IsString()
    sortType: SortType
}
