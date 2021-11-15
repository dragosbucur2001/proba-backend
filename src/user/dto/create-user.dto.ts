import { Exclude } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { Hash } from "src/decorators/hash.decorator";
import { Trim } from "src/decorators/trim.decorator";
import { Match } from "src/validation-rules/match.rule";
import { Unique } from "src/validation-rules/unique.rule";

export class CreateUserDto {
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
    @Hash()
    @Exclude({ toPlainOnly: true })
    password: string;

    @IsString()
    @Trim()
    @Hash()
    @Exclude({ toPlainOnly: true })
    @Match(CreateUserDto, u => u.password)
    confirmation_password: string;
}
