import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Role } from './roles.enum';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async login(loginUserDto: LoginUserDto, token: string) {
        await this.validateToken(token);

        const { email, password } = loginUserDto;
        let user = await this.prisma.user.findFirst({
            where: { email },
            include: {
                role: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        let userByRookie = await this.prisma.user.findFirst({
            where: {
                email,
                rookie: { token },
            },
            include: {
                role: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        if (!user ? true : !bcrypt.compareSync(password, user.password))
            throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);

        if (!userByRookie ? true : !bcrypt.compareSync(password, user.password))
            throw new HttpException('Userul este asociat cu alt boboc token, verifica daca ai tokenul in campul boboc-token din header', HttpStatus.I_AM_A_TEAPOT);

        return {
            'ttl': process.env.JWT_TTL,
            'token': this.jwtService.sign({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                }
            }),
            'role': user.role,
        };
    }

    async register(createUserDto: CreateUserDto, token: string) {
        await this.validateToken(token);

        let user = await this.prisma.user.findUnique({
            where: {
                email_rookie_id: {
                    email: createUserDto.email,
                    rookie_id: (await this.prisma.rookie.findUnique({ where: { token } })).id
                }
            }
        })
        if (user)
            throw new HttpException("Exista deja un user cu acest email", HttpStatus.BAD_REQUEST);

        let { role } = createUserDto;
        delete createUserDto.role;

        switch (role) {
            case Role.TEACHER:
                if (!createUserDto.email.match(/(.+)@onmicrosoft.upb.ro$/)) {
                    throw new HttpException("Email address does not match expected format for role " + role + ". Teacher emails should end in @onmicrosoft.upb.ro", HttpStatus.BAD_REQUEST);
                } else {
                    break;
                }
            case Role.STUDENT:
                if (!createUserDto.email.match(/(.+)@stud.upb.ro$/)) {
                    throw new HttpException("Email address does not match expected format for role " + role + ". Student emails should end in @stud.upb.ro", HttpStatus.BAD_REQUEST);
                } else {
                    break;
                }
            case Role.ADMIN:
                throw new HttpException("Fuck off", HttpStatus.I_AM_A_TEAPOT);
            default:
                throw new HttpException("Email address does not match expected format for role " + role, HttpStatus.BAD_REQUEST);
        }

        delete createUserDto.confirmation_password;

        let student_role_id = (await this.prisma.role.findFirst({
            where: { title: role }
        })).id;
        createUserDto.password = bcrypt.hashSync(createUserDto.password, process.env.PASS_SALT);

        return this.prisma.user.create({
            data: {
                ...createUserDto,
                role: {
                    connect: { id: student_role_id }
                },
                rookie: {
                    connect: { token },
                },
            },
        });
    }

    private async validateToken(token: string): Promise<void> {
        let rookie = await this.prisma.rookie.findUnique({ where: { token } });
        if (!rookie)
            throw new HttpException('Boboc token nu este valid, asigura-te ca ai copiat tokenul corect, si ca tokenul este introduc in campul boboc-token in header. Daca problema continua contacteaza-ti mentorul.', HttpStatus.I_AM_A_TEAPOT);
    }
}
