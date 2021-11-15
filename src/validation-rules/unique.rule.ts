import { Injectable } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PrismaService } from "src/prisma/prisma.service";

export const Unique = <T>(
    type: ClassConstructor<T>,
    property: (o: T) => any,
    validationOptions?: ValidationOptions,
) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property, type],
            validator: UniqueConstraint,
        });
    };
};

@ValidatorConstraint({ name: "Unique", async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
    constructor(private prisma: PrismaService) { }

    async validate(value: any, args: ValidationArguments) {
        const [fn, type] = args.constraints;
        const name: string = type.name.toLowerCase();
        const property = fn.toString().split('.')[1];

        const entity = Object.keys(this.prisma).filter(k => !k.startsWith('_') && name.includes(k))[0];
        const p = this.prisma[entity];
        let where = {};
        where[property] = value;

        return !(await p.count({ where }) ? true : false);
    }

    defaultMessage(args: ValidationArguments) {
        const [constraintProperty]: (() => any)[] = args.constraints;
        return `${constraintProperty} and ${args.property} does not match, is not unique`;
    }
}
