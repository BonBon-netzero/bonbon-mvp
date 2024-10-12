import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateBrandDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    code: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    avatar: string
}
