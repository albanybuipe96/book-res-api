import { IsArray, IsDate, IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword } from 'class-validator'

export class CreateBookDto {
    @IsString()
    title: string

    @IsString()
    author: string

    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    @IsOptional()
    pages: number

    @IsDate()
    @IsOptional()
    started: Date

    @IsDate()
    @IsOptional()
    finished: Date
}