import { Expose, Transform } from 'class-transformer'
import { Book } from 'src/books/entities/book.entity'

export class UserDto {
    @Expose()
    id: number

    // @Expose()
    // @Transform(({ obj }) => obj.books)
    // books: Book[]

    @Expose()
    email: string

    firstname: string

    lastname: string

    @Expose()
    admin: boolean

    password: string

    @Expose()
    profile: string

    interests: string[]
}