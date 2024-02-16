import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Review } from './entities/review.entity'
import { Repository } from 'typeorm'
import { ErrorMessages } from 'src/constants/errors.constants'
import { Book } from 'src/books/entities/book.entity'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private readonly repo: Repository<Review>) { }
  async create(createReviewDto: CreateReviewDto, book: Book) {
    const review = await this.repo.create(createReviewDto)
    review.book = book
    review.user = book.user
    return this.repo.save(review)
  }

  getReviews() {
    return this.repo.find({ relations: ['user', 'book'] })
  }

  async getReview(id: number) {
    const review = await this.repo.findOne({ where: { id }, relations: ['user', 'book'] })
    if (!review) {
      throw new NotFoundException(ErrorMessages.NO_REVIEW_FOUND)
    }

    return review
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.getReview(id)
    review.content = updateReviewDto.content
    return this.repo.save(review)
  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
