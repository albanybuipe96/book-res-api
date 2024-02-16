import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common'
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { GuardRoute } from 'src/guards/auth.guard'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { LessonDto } from './dto/lesson.dto'
import { CurrentBook } from 'src/books/decorators/current-book.decorator'
import { Book } from 'src/books/entities/book.entity'

import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@GuardRoute()
@Serialize(LessonDto)
@Controller('lessons')
export class LessonsController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly lessonsService: LessonsService
  ) { }

  @Post()
  create(@Body() createLessonDto: CreateLessonDto, @CurrentBook() book: Book) {
    return this.lessonsService.create(createLessonDto, book);
  }

  @Get()
  findAll() {
    return this.lessonsService.getLessons();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.getLesson(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id/delete')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
