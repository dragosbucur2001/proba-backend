import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async getProfile(user) {
        return this.prisma.user.findUnique({ where: { id: user.id } });
    }

    async updateProfile(updateUserDto: UpdateUserDto, user) {
        return this.prisma.user.update({
            where: { id: user.id },
            data: {
                ...updateUserDto,
            },
        });
    }

    async getMyReviews(user) {
        return this.prisma.review.findMany({ where: { user_id: user.id } });
    }

    async getMyTutoringClasses(user) {
        return this.prisma.tutoringClass.findMany({ where: { teacher_id: user.id } });
    }

    async getMyEnrolments(user) {
        return this.prisma.tutoringClass.findMany({
            where: {
                enrolments: {
                    some: {
                        student_id: user.id
                    },
                },
            },
            include: {
                teacher: {
                    select: {
                        firstname: true,
                        lastname: true,
                    },
                },
                subject: {
                    select: {
                        title: true,
                    },
                },
            },
        });
    }

    async removeMyEnrolment(tutoring_class_id: number, user) {
        let enrolment = await this.prisma.enrolment.findUnique({
            where: {
                student_id_tutoring_class_id: {
                    student_id: user.id,
                    tutoring_class_id: tutoring_class_id
                }
            },
        });

        if (!enrolment)
            throw new HttpException('Student is not enrolled in this class', HttpStatus.NOT_FOUND);

        return this.prisma.enrolment.delete({ where: { id: enrolment.id } });
    }
}
