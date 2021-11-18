import { User } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll(token: string): Promise<User[]> {
    await this.validateToken(token);

    return this.prisma.user.findMany({
      where: {
        rookie: { token }
      },
      include: {
        role: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  async findOne(id: number, token: string): Promise<User> {
    await this.validateToken(token);

    return this.prisma.user.findFirst({ where: { id } });
  }

  async update(id: number, data: UpdateUserDto, token: string): Promise<User> {
    await this.validateToken(token);

    return this.prisma.user.update({ data, where: { id } });
  }

  async remove(id: number, token: string): Promise<User> {
    await this.validateToken(token);

    return this.prisma.user.delete({ where: { id } });
  }

  private async validateToken(token: string): Promise<void> {
    let rookie = await this.prisma.rookie.findUnique({ where: { token } });
    if (!rookie)
      throw new HttpException('Boboc token nu este valid, asigura-te ca ai copiat tokenul corect, si ca tokenul este introduc in campul boboc-token in header. Daca problema continua contacteaza-ti mentorul.', HttpStatus.I_AM_A_TEAPOT);
  }
}
