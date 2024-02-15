import { IsArray, IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    firstname: string

    @IsString()
    @IsOptional()
    lastname: string

    @IsString()
    @IsStrongPassword()
    password: string

    @IsString()
    @IsOptional()
    profile: string

    @IsArray()
    @IsOptional()
    interests: string[]
}