import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

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
