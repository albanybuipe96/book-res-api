import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto)
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
