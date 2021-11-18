import { PrismaClient } from '@prisma/client'
import { Role } from '../src/auth/roles.enum';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient()

async function main() {
    let roles = await prisma.role.createMany({
        data: [
            { title: Role.ADMIN },
            { title: Role.STUDENT },
            { title: Role.TEACHER },
        ]
    });

    let rookieData = [];
    for (let i = 0; i < 70; i++) {
        let token: string = uuidv4()
        rookieData.push({ token });
    }

    let rookies = await prisma.rookie.createMany({ data: rookieData });

    let admin = await prisma.user.create({
        data: {
            email: 'admin@admin.com',
            password: bcrypt.hashSync(process.env.ADMIN_PASS, process.env.PASS_SALT),
            firstname: 'admin',
            lastname: 'ADMIN',
            role: { connect: { title: Role.ADMIN } },
            rookie: { connect: { ...rookieData[0] } },
        }
    });

    let teacher = await prisma.user.create({
        data: {
            email: 'mihai@microsoft.com',
            password: bcrypt.hashSync(process.env.TEACHER_PASS, process.env.PASS_SALT),
            firstname: 'Mihai',
            lastname: 'Profesorescu',
            role: { connect: { title: Role.TEACHER } },
            rookie: { connect: { ...rookieData[0] } },
        }
    });

    let student = await prisma.user.create({
        data: {
            email: 'andrei@stud.upb.ro',
            password: bcrypt.hashSync(process.env.STUDENT_PASS, process.env.PASS_SALT),
            firstname: 'Andrei',
            lastname: 'Studentescu',
            role: { connect: { title: Role.STUDENT } },
            rookie: { connect: { ...rookieData[0] } },
        }
    });

    let reviews = await prisma.review.createMany({
        data: [
            {
                message: "O platforma foarte buna",
                user_id: student.id
            },
            {
                message: "Se fac bani pe aici",
                user_id: teacher.id
            },
            {
                message: "Tot am picat examenul",
                user_id: student.id
            },
        ]
    });

    let subjects = await prisma.subject.createMany({
        data: [
            { title: "Matematici Speciale" },
            { title: "Fizica" },
            { title: "Informatica" },
            { title: "POO" },
        ]
    });
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
