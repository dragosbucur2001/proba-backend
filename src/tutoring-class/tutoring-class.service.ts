import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutoringClassDto } from './dto/create-tutoring-class.dto';
import { UpdateTutoringClassDto } from './dto/update-tutoring-class.dto';

@Injectable()
export class TutoringClassService {
  constructor(private prisma: PrismaService) { }

  findAll(token: string) {
    return this.prisma.tutoringClass.findMany({
      where: {
        rookie: { token },
      },
      select: {
        id: true,
        description: true,
        teacher: {
          select: {
            email: true,
            firstname: true,
            lastname: true,
          }
        },
        subject: { select: { title: true, } },
      }
    });
  }

  async findOne(id: number, token: string) {
    let tutoringClass = await this.prisma.tutoringClass.findUnique({ where: { id }, include: { rookie: true } });
    if (!tutoringClass)
      throw new HttpException("TutoringClass not found", HttpStatus.NOT_FOUND);

    if (tutoringClass.rookie.token !== token)
      throw new HttpException("Aceasta meditatie a fost creata de un alt boboc", HttpStatus.I_AM_A_TEAPOT);

    return this.prisma.tutoringClass.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        teacher: {
          select: {
            email: true,
            firstname: true,
            lastname: true,
          }
        },
        subject: { select: { title: true, } },
      }
    });
  }

  async create(createTutoringClassDto: CreateTutoringClassDto, user, token: string) {
    await this.validateToken(token);

    let { subject_id, description } = createTutoringClassDto;
    let subject = await this.prisma.subject.findUnique({ where: { id: subject_id } });
    if (!subject)
      throw new HttpException("Subject does not exist", HttpStatus.BAD_REQUEST);

    return this.prisma.tutoringClass.create({
      data: {
        description,
        teacher: { connect: { id: user.id } },
        subject: { connect: { id: subject_id } },
        rookie: { connect: { token } },
      },
    });
  }

  async enroll(id: number, user, token: string) {
    let tutoringClass = await this.prisma.tutoringClass.findUnique({
      where: { id },
      include: {
        enrolments: { where: { student_id: user.id } },
      },
    });

    if (!tutoringClass)
      throw new HttpException("Tutoring class does not exist", HttpStatus.NOT_FOUND);

    if (tutoringClass.enrolments.length !== 0)
      throw new HttpException("User is already enrolled", HttpStatus.CONFLICT);

    return this.prisma.enrolment.create({
      data: {
        tutoring_class_id: id,
        student_id: user.id,
      },
    });
  }

  async update(id: number, updateTutoringClassDto: UpdateTutoringClassDto, user, token: string) {
    let match = await this.prisma.tutoringClass.count({ where: { id, teacher_id: user.id } });

    if (match === 0)
      throw new HttpException("Tutoring Class does not exist or is owned by somebody else", HttpStatus.BAD_REQUEST);

    return this.prisma.tutoringClass.update({
      data: updateTutoringClassDto,
      where: { id },
    });
  }

  async remove(id: number, user, token: string) {
    let tutoringClass = await this.prisma.tutoringClass.findUnique({ where: { id } })
    if (!tutoringClass)
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);

    if (tutoringClass.teacher_id !== user.id && user.role.title !== Role.ADMIN)
      throw new HttpException('User does not own this review', HttpStatus.FORBIDDEN);

    return this.prisma.tutoringClass.delete({ where: { id } });
  }

  private async validateToken(token: string): Promise<void> {
    let rookie = await this.prisma.rookie.findUnique({ where: { token: token } });
    if (!rookie)
      throw new HttpException('Boboc token nu este valid, asigura-te ca ai copiat tokenul corect, si ca tokenul este introduc in campul boboc-token in header. Daca problema continua contacteaza-ti mentorul.', HttpStatus.I_AM_A_TEAPOT);
  }
}
