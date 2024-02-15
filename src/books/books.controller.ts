import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBookDto } from './dtos/create-book.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { BookDto } from './dtos/book.dto'
import { GuardRoute } from 'src/guards/auth.guard'
import { UpdateBookDto } from './dtos/update-book.dto'
import { CurrentUser } from 'src/users/current-user.decorator'
import { User } from 'src/users/entities/user.entity'

@Controller('books')
@Serialize(BookDto)
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    @GuardRoute()
    async add(@Body() createBookDto: CreateBookDto, @CurrentUser() user: User) {
        return this.booksService.addBook(createBookDto, user)
    }

    @Get()
    @GuardRoute()
    async fetchBooks() {
        return this.booksService.getBooks(null)
    }

    @Get('/user')
    @GuardRoute()
    async fetchBooksByUser(@CurrentUser() user: User) {
        return this.booksService.getBooksByUser(user)
    }

    @Get('/:id')
    @GuardRoute()
    async fetchBookById(@Param('id') id: string) {
        return this.booksService.getBook(+id)
    }

    @Patch('/:id/update')
    @GuardRoute()
    async updateBook(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto,
        @CurrentUser() user: User,
    ) {
        return this.booksService.updateBook(+id, updateBookDto, user)
    }

    @Delete('/:id/delete')
    @GuardRoute()
    async delete(@Param('id') id: string, @CurrentUser() user: User) {
        console.log({ id })
        return this.booksService.deleteBook(+id, user)
    }
}
