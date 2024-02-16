
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class LessonDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    content: string
}
