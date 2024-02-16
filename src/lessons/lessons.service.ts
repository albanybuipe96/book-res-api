import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from './entities/lesson.entity'
import { Repository } from 'typeorm'
import { Book } from 'src/books/entities/book.entity'

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(Lesson) private readonly repo: Repository<Lesson>) { }
  async create(createLessonDto: CreateLessonDto, book: Book) {
    const lesson = this.repo.create(createLessonDto)
    lesson.book = book
    lesson.user = book.user
    return this.repo.save(lesson)
  }

  getLessons() {
    return this.repo.find({ relations: ['user', 'book'] })
  }

  async getLesson(id: number) {
    const lesson = await this.repo.findOne({ where: { id }, relations: ['user', 'book'] })
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.repo.update(id, updateLessonDto)
  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
