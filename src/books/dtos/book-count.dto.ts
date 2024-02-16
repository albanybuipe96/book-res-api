import { Expose } from 'class-transformer'

export class BookCountDto {
    @Expose()
    count: number
}