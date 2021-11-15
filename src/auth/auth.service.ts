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

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        let user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                role: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        console.log(user == null ? false : !bcrypt.compareSync(password, user.password));

        if (user == null ? true : !bcrypt.compareSync(password, user.password))
            throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);

        return {
            'ttl': process.env.JWT_TTL,
            'token': this.jwtService.sign({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            })
        };
    }

    async register(createUserDto: CreateUserDto, title: Role) {
        switch (title) {
            case Role.TEACHER:
                if (createUserDto.email.match(/(.+)@microsoft.com$/))
                    break;
            case Role.STUDENT:
                if (createUserDto.email.match(/(.+)@stud.upb.com$/))
                    break;
            default:
                throw new HttpException("Email address does not match expected format", HttpStatus.BAD_REQUEST);
        }

        delete createUserDto.confirmation_password;
        let student_role_id = (await this.prisma.role.findFirst({
            where: { title }
        })).id;
        createUserDto.password = bcrypt.hashSync(createUserDto.password, process.env.PASS_SALT);

        return this.prisma.user.create({
            data: {
                ...createUserDto,
                role: {
                    connect: { id: student_role_id }
                }
            },
        });
    }
}
