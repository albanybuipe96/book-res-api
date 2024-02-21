import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, Res, Session, UploadedFile, UseInterceptors } from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBookDto } from './dtos/create-book.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { BookDto } from './dtos/book.dto'
import { GuardRoute } from 'src/guards/auth.guard'
import { UpdateBookDto } from './dtos/update-book.dto'
import { CurrentUser } from 'src/users/current-user.decorator'
import { User } from 'src/users/entities/user.entity'
import { CurrentBook } from './decorators/current-book.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { generateSlug } from 'random-word-slugs'
import { of } from 'rxjs'

@Controller('books')
@Serialize(BookDto)
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    @GuardRoute()
    async add(
        @Body() createBookDto: CreateBookDto,
        @CurrentUser() user: User,
        @Session() session: any,
    ) {
        const book = await this.booksService.addBook(createBookDto, user)
        session.bookId = book.id
        return book
    }

    @Get()
    @GuardRoute()
    async fetchBooks() {
        return this.booksService.getBooks(null)
    }

    @Get('review')
    async review(@CurrentBook() book) {
        return book || {}
    }

    @Get('/user')
    @GuardRoute()
    async fetchBooksByUser(@CurrentUser() user: User) {
        return this.booksService.getBooksByUser(user)
    }

    @Get('/:id')
    @GuardRoute()
    async fetchBookById(
        @Param('id') id: string,
        @Session() session: any,
    ) {
        const book = await this.booksService.getBook(+id)
        session.bookId = book.id
        return book
    }

    @Patch('update/:id')
    @GuardRoute()
    async updateBook(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto,
        @CurrentUser() user: User,
    ) {
        return this.booksService.updateBook(+id, updateBookDto, user)
    }

    @Delete('delete/:id')
    @GuardRoute()
    async delete(@Param('id') id: string, @CurrentUser() user: User) {
        console.log({ id })
        return this.booksService.deleteBook(+id, user)
    }
}
