import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        role: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    delete createUserDto.confirmation_password;
    let student_role_id = (await this.prisma.role.findFirst({
      where: {
        title: 'student'
      }
    })).id;

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        role: {
          connect: { id: student_role_id }
        }
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ data, where: { id } });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
