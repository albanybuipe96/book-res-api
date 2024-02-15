import { IsString, IsStrongPassword } from 'class-validator'

export class SignInDto {
    @IsString()
    email: string

    @IsString()
    @IsStrongPassword()
    password: string
}