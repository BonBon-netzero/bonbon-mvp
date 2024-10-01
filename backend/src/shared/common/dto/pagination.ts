import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Max } from 'class-validator'

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Max(500)
    readonly limit = 10

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    readonly offset = 0
}
