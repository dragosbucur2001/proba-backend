import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactRequestDto } from './dto/update-contact-request.dto';

@Injectable()
export class ContactRequestsService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.contactRequest.findMany();
  }

  async findOne(id: number) {
    let contactRequest = await this.prisma.contactRequest.findUnique({ where: { id } });
    if (!contactRequest)
      throw new HttpException('Contact Request not found', HttpStatus.NOT_FOUND);

    return contactRequest;
  }

  create(data: CreateContactRequestDto) {
    return this.prisma.contactRequest.create({ data });
  }

  async update(id: number, data: UpdateContactRequestDto) {
    let contactRequest = await this.prisma.contactRequest.findUnique({ where: { id } });
    if (!contactRequest)
      throw new HttpException('Contact Request not found', HttpStatus.NOT_FOUND);

    return this.prisma.contactRequest.update({ data, where: { id } });
  }

  async remove(id: number) {
    let contactRequest = await this.prisma.contactRequest.findUnique({ where: { id } });
    if (!contactRequest)
      throw new HttpException('Contact Request not found', HttpStatus.NOT_FOUND);

    return this.prisma.contactRequest.delete({ where: { id } });
  }
}
