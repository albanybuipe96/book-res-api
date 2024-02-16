import { MiddlewareConsumer, Module } from '@nestjs/common'
import { BooksController } from './books.controller'
import { BooksService } from './books.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'
import { CurrentBookMiddleware } from './middlewares/current-book.middleware'

@Module({
  imports: [
    TypeOrmModule.forFeature([Book])
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentBookMiddleware)
      .forRoutes('*')
  }
}
