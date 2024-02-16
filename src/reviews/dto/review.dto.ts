import { Expose, Transform } from 'class-transformer'
import { IsArray, IsDate, IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword } from 'class-validator'

export class ReviewDto {
    @Expose()
    id: number

    @Expose()
    content: string

    @Expose()
    @Transform(({ obj }) => obj.book ? obj.book.title : null)
    title: string

    @Expose()
    @Transform(({ obj }) => obj.user ? obj.user.id : null)
    userId: number

    @Expose()
    @Transform(({ obj }) => obj.user ? obj.user.email : null)
    email: string

    @Expose()
    @Transform(({ obj }) => obj.book ? obj.book.id : null)
    bookId: number

}