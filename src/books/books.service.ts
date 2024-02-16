import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'
import { Repository } from 'typeorm'
import { CreateBookDto } from './dtos/create-book.dto'
import { ErrorMessages } from 'src/constants/errors.constants'
import { UpdateBookDto } from './dtos/update-book.dto'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
    ) { }

    addBook(createBookDto: CreateBookDto, user: User) {
        console.log(BooksService.name, createBookDto)
        const book = this.bookRepository.create(createBookDto)
        book.user = user
        return this.bookRepository.save(book)
    }

    getBooks(title: string) {
        return this.bookRepository.find({ where: { title }, relations: ['user'] })
    }

    getBooksByUser(user: User) {
        return this.bookRepository.find({ where: { user }, relations: ['user'] })
    }

    /*
    const jobsQueried = await this.repo.createQueryBuilder('job')
            .where('job.title = :title', { title })
            .orWhere('job.location = :location', { location })
            .orWhere('job.company = :company', { company })
            .orWhere('job.salary = :salary', { salary })
            .getMany()
    */
    booksCount(user: User) {

        const query = this.bookRepository.createQueryBuilder('book')
            .where('book.user = :user')
            .setParameter('user', user)
            .select('COUNT(book.id)', 'count')

        console.log(query)

        return query.getRawOne()

    }

    async getBook(id: number) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: ['user'],
        })
        if (!book) {
            throw new NotFoundException(ErrorMessages.NO_BOOK_FOUND)
        }
        return book
    }

    async deleteBook(id: number, user: User) {
        const book = await this.getBook(id)
        if (book.user.id !== user.id) {
            throw new UnauthorizedException(ErrorMessages.NOT_AUTHORIZED)
        }

        return this.bookRepository.delete(id)
    }

    async updateBook(id: number, updateBookDto: UpdateBookDto, user: User) {
        const book = await this.getBook(id)
        if (book.user.id !== user.id) {
            throw new UnauthorizedException(ErrorMessages.NOT_AUTHORIZED)
        }
        book.author = updateBookDto.author
        book.description = updateBookDto.description
        book.title = updateBookDto.title
        book.finished = updateBookDto.finished
        book.started = updateBookDto.started
        book.pages = updateBookDto.pages

        return this.bookRepository.save(book)
    }
}
