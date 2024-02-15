import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.books)
    user: User

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