import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    let user = await this.prisma.user.findFirst({ where: { id } });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    delete createUserDto.confirmation_password;
    let student_role_id = (await this.prisma.role.findFirst({
      where: {
        title: 'student'
      }
    })).id;

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        role: {
          connect: { id: student_role_id }
        }
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({ data, where: { id } });
  }

  async remove(id: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
