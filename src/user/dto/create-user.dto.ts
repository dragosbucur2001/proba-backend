import { User } from ".prisma/client";
import { IsEmail, IsEmpty, IsEnum, IsString, Length, Min } from "class-validator";
import { Role } from "src/auth/roles.enum";
import { Trim } from "src/decorators/trim.decorator";
import { Match } from "src/validation-rules/match.rule";
import { Unique } from "src/validation-rules/unique.rule";

export class CreateUserDto implements Partial<User> {
    @IsEmail()
    @Trim()
    email: string;

    @IsString()
    @Trim()
    firstname: string;

    @IsString()
    @Trim()
    lastname: string;

    @IsString()
    @Length(8)
    @Trim()
    password: string;

    @IsString()
    @Trim()
    @Match(CreateUserDto, u => u.password)
    confirmation_password: string;

    @IsEnum(Role)
    role: Role;

    @IsEmpty()
    id_card_path?: string;
}
