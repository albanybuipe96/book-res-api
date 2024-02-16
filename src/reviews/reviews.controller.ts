import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { CurrentBook } from 'src/books/decorators/current-book.decorator'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { ReviewDto } from './dto/review.dto'
import { GuardRoute } from 'src/guards/auth.guard'
import { CurrentUser } from 'src/users/current-user.decorator'
import { User } from 'src/users/entities/user.entity'

@Serialize(ReviewDto)
@GuardRoute()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @CurrentBook() book) {
    console.log(book.user)
    // console.log(book)
    return this.reviewsService.create(createReviewDto, book)
  }

  @Get()
  fetchReviews() {
    return this.reviewsService.getReviews()
  }

  @Get(':id')
  fetchReviewById(@Param('id') id: string) {
    return this.reviewsService.getReview(+id)
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto)
  }

  @Delete(':id/delete')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id)
  }
}
