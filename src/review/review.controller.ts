import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id);
  }

  @Post()
  @Auth()
  async create(@Body() createReviewDto: CreateReviewDto, @User() user) {
    return this.reviewService.create(createReviewDto, user);
  }

  @Patch(':id')
  @Auth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @User() user
  ) {
    return this.reviewService.update(id, updateReviewDto, user);
  }

  @Delete(':id')
  @Auth()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user
  ) {
    return this.reviewService.remove(id, user);
  }
}
