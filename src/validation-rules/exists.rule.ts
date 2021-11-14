import { PrismaClient } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PrismaService } from "src/prisma/prisma.service";

@ValidatorConstraint({ name: 'exists', async: true })
// @Injectable()
export class ExistsRule implements ValidatorConstraintInterface {
    // constructor(private prisma: PrismaService, entity: PrismaClient) { };
    constructor(private entity) { };

    async validate(value: string, args: ValidationArguments) {
        console.log(args);
        console.log(this.entity);
        // this.entity.user
        return true;
        // return await this.prisma.user.count({ where: { email: value } }) == 0;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Email ($value) already exists.';
    }
}
