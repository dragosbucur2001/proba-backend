import { User } from '.prisma/client';
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.review.findMany({
      select: {
        id: true,
        message: true,
        user: {
          select: {
            firstname: true,
            lastname: true,
            role: {
              select: { title: true }
            }
          }
        }
      }
    });
  }

  async findOne(id: number) {
    let review = await this.prisma.review.findFirst({ where: { id } });
    if (!review)
      throw new HttpException("Review does not exist", HttpStatus.BAD_REQUEST);

    return review;
  }

  async create(createReviewDto: CreateReviewDto, user: User) {
    return this.prisma.review.create({
      data: {
        ...createReviewDto,
        user: {
          connect: { id: user.id }
        },
      },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    let match = await this.prisma.review.count({ where: { id } });

    if (match === 0)
      throw new HttpException("Review does not exist", HttpStatus.BAD_REQUEST);

    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto
    });
  }

  async remove(id: number, user) {
    let exists = await this.prisma.review.count({ where: { id } })
    if (exists === 0)
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);

    let owns = await this.prisma.review.count({ where: { id, user_id: user.id } })
    if (owns === 0 && user.role.title !== Role.ADMIN)
      throw new HttpException('User does not own this review', HttpStatus.FORBIDDEN);

    return this.prisma.review.delete({ where: { id } });
  }
}
