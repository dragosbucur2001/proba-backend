import { IsEmail, IsString } from "class-validator";
import { Trim } from "src/decorators/trim.decorator";

export class LoginUserDto {
    @IsEmail()
    @Trim()
    email: string;

    @IsString()
    @Trim()
    password: string
}
