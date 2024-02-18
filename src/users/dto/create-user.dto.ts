import { IsArray, IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator'
import { DtoMessage } from 'src/constants/dto-message.constants'

export class CreateUserDto {
    @IsString()
    @IsEmail({}, { message: DtoMessage.EMPTY_EMAIL})
    email: string

    @IsString()
    @IsOptional()
    firstname: string

    @IsString()
    @IsOptional()
    lastname: string

    @IsString()
    @IsStrongPassword({}, {message: DtoMessage.WEAK_PASSWORD})
    password: string

    @IsOptional()
    admin: boolean

    @IsString()
    @IsOptional()
    profile: string

    @IsArray()
    @IsOptional()
    interests: string[]
}