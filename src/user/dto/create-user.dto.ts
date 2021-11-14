import { User } from ".prisma/client";
import { Exclude } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { Exists } from "src/decorators/exists.decorator";
import { Hash } from "src/decorators/hash.decorator";
import { Trim } from "src/decorators/trim.decorator";

export class CreateUserDto {

    @IsEmail()
    @Trim()
    @Exists<User>()
    email: string;

    @IsString()
    @Trim()
    username: string;

    @IsString()
    @Trim()
    @Hash()
    @Exclude({ toPlainOnly: true })
    password: string;
}
