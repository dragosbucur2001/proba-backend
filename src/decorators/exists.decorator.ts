import { registerDecorator, Validate, ValidationOptions } from 'class-validator';
import { ExistsRule } from 'src/validation-rules/exists.rule';

// export const Exists = <T>(obj: T) => Validate((new ExistsRule(obj).validate));

export const Exists =
    <T>(entity: T, validationOptions?: ValidationOptions) =>
        (object: any, propertyName: string) =>
            registerDecorator({
                name: 'exists',
                target: object.constructor,
                propertyName: propertyName,
                options: validationOptions,
                validator: ExistsRule,
                constraints: [entity],
            });

// export function UserExists(validationOptions?: ValidationOptions) {
//     return function (object: any, propertyName: string) {
//         registerDecorator({
//             name: 'UserExists',
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             validator: UserExistsRule,
//         });
//     };
// }
