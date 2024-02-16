import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { Book } from '../entities/book.entity'
import { BooksService } from '../books.service'

declare global {
    namespace Express {
        interface Request {
            currentBook?: Book
        }
    }
}

@Injectable()
export class CurrentBookMiddleware implements NestMiddleware {
    constructor(private readonly booksService: BooksService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const { bookId } = req.session || {}
        if (bookId) {
            const book = await this.booksService.getBook(bookId)
            req.currentBook = book
        }
        next()
    }
}