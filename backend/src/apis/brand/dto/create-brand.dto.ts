import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateBrandDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    code: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    avatar: string
}
