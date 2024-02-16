import { Book } from 'src/books/entities/book.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.lessons)
    user: User

    @ManyToOne(() => Book, (book) => book.lessons)
    book: Book
}
