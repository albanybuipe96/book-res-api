import { Exclude } from 'class-transformer'
import { Lesson } from 'src/lessons/entities/lesson.entity'
import { Review } from 'src/reviews/entities/review.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.books)
    user: User

    @OneToMany(() => Review, (review) => review.book)
    reviews: Review[]

    @OneToMany(() => Lesson, (lesson) => lesson.book)
    lessons: Lesson[]

    @Column()
    title: string

    @Column()
    author: string

    @Column({ default: '' })
    description: string


    @Column({ default: 0 })
    pages: number

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    started: Date

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    finished: Date
}