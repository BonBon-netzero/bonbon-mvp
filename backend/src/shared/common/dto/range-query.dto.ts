import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

export class RangeQueryDto {
    @IsNotEmpty()
    @IsString()
    fieldName: string

    @IsOptional()
    @IsNumber()
    gte: number

    @IsOptional()
    @IsNumber()
    lte: number

    @IsOptional()
    @IsNumber()
    gt: number

    @IsOptional()
    @IsNumber()
    lt: number;

    @IsOptional()
    @IsArray()
    in: any[]
}
