import { Expose, Transform } from 'class-transformer'
import { IsArray, IsDate, IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword } from 'class-validator'

export class BookDto {
    @Expose()
    id: number

    @Expose()
    @Transform(({ obj }) => obj.user ? obj.user.id : null)
    userId: number

    @Expose()
    @Transform(({ obj }) => obj.user ? obj.user.email : null)
    email: string

    @Expose()
    title: string

    @Expose()
    cover: string

    @Expose()
    author: string

    @Expose()
    description: string

    @Expose()
    pages: number

    // @Expose()
    started: Date

    // @Expose()
    finished: Date
}