import { User } from ".prisma/client";
import { Exclude } from "class-transformer";
import { IsEmail, IsEmpty, IsString, Min } from "class-validator";
import { Hash } from "src/decorators/hash.decorator";
import { Trim } from "src/decorators/trim.decorator";
import { Match } from "src/validation-rules/match.rule";
import { Unique } from "src/validation-rules/unique.rule";

export class CreateUserDto implements Partial<User> {
    @IsEmail()
    @Trim()
    @Unique(CreateUserDto, u => u.email)
    email: string;

    @IsString()
    @Trim()
    firstname: string;

    @IsString()
    @Trim()
    lastname: string;

    @IsString()
    @Trim()
    @Min(8)
    @Hash()
    password: string;

    @IsString()
    @Trim()
    @Hash()
    @Match(CreateUserDto, u => u.password)
    confirmation_password: string;

    @IsEmpty()
    id_card_path?: string;
}
