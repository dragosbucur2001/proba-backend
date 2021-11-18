import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { RookieToken } from 'src/decorators/rookie.decorator';
import { Role } from 'src/auth/roles.enum';

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
  @Auth(Role.ADMIN)
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @User() user,
  ) {
    return this.reviewService.create(createReviewDto, user);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ) {
    return this.reviewService.remove(id, user);
  }
}
