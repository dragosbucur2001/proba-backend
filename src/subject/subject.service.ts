import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.review.findMany();
  }

  async findOne(id: number) {
    let subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject)
      throw new HttpException("Subject not found", HttpStatus.NOT_FOUND);

    return subject;
  }

  create(createSubjectDto: CreateSubjectDto) {
    return this.prisma.subject.create({ data: createSubjectDto });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    let subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject)
      throw new HttpException("Subject not found", HttpStatus.NOT_FOUND);

    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }

  async remove(id: number) {
    let subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject)
      throw new HttpException("Subject not found", HttpStatus.NOT_FOUND);

    return this.prisma.subject.delete({ where: { id } });
  }
}
