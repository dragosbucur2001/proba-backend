import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactRequestDto } from './dto/update-contact-request.dto';

@Injectable()
export class ContactRequestsService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.contactRequest.findMany({
      select: {
        id: true,
        message: true,
        name: true,
        email: true,
        is_resolved: true,
      }
    });
  }

  async findOne(id: number) {
    let contactRequest = await this.prisma.contactRequest.findUnique({
      where: { id },
      select: {
        id: true,
        message: true,
        name: true,
        email: true,
        is_resolved: true,
      }
    });
    if (!contactRequest)
      throw new HttpException('Contact Request not found', HttpStatus.NOT_FOUND);

    return contactRequest;
  }

  async create(createContactRequestDto: CreateContactRequestDto, token: string) {
    await this.validateToken(token);
    return this.prisma.contactRequest.create({
      data: {
        ...createContactRequestDto,
        rookie: {
          connect: { token },
        },
      },
    });
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

  private async validateToken(token: string): Promise<void> {
    let rookie = await this.prisma.rookie.findUnique({ where: { token } });
    if (!rookie)
      throw new HttpException('Rookie token not valid', HttpStatus.BAD_REQUEST);
  }
}
