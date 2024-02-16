import { Book } from 'src/books/entities/book.entity'
import { Review } from 'src/reviews/entities/review.entity'
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Book, (book) => book.user)
    books: Book[]

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]


    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: false })
    admin: boolean

    @Column({ default: '' })
    firstname: string

    @Column({ default: '' })
    lastname: string


    @Column({ default: 'https://d326fntlu7tb1e.cloudfront.net/uploads/4821d814-ac87-4b22-aa80-ac7336916c9a-403017_avatar_default_head_person_unknown_icon.png' })
    profile: string

    @Column('text', { array: true, default: [] })
    interests: string[]

    @AfterInsert()
    logInsert() {
        console.log(`Inserted user with $id`, this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated user with $id`, this.id)
    }

    @AfterRemove()
    logDelete() {
        console.log(`Deleted user with $id`, this.id)
    }
}
