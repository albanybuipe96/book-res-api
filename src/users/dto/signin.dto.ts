import { IsEmail, IsString, IsStrongPassword } from 'class-validator'
import { DtoMessage } from 'src/constants/dto-message.constants'

export class SignInDto {
    @IsString()
    @IsEmail({}, { message: DtoMessage.EMPTY_EMAIL })
    email: string

    @IsString()
    @IsStrongPassword({}, { message: DtoMessage.EMPTY_PASSWORD })
    password: string
}