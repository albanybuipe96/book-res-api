import { Expose } from 'class-transformer'

export class UserDto {
    @Expose()
    id: number

    @Expose()
    email: string

    firstname: string

    lastname: string

    password: string

    profile: string

    interests: string[]
}