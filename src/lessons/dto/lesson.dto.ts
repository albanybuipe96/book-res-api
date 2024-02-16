
import { Expose, Transform } from 'class-transformer'

export class LessonDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    content: string

    @Expose()
    @Transform(({ obj }) => obj.user ? obj.user.id : null)
    userId: number

    @Expose()
    @Transform(({ obj }) => obj.user ? obj.user.email : null)
    email: string

    @Expose()
    @Transform(({ obj }) => obj.book ? obj.book.id : null)
    bookId: string
}
