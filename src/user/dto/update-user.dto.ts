import { IsEmail, IsEmpty, IsOptional, IsString, Length } from "class-validator";
import { Trim } from "src/decorators/trim.decorator";
import { Match } from "src/validation-rules/match.rule";
import { Unique } from "src/validation-rules/unique.rule";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    @Trim()
    @Unique(UpdateUserDto, u => u.email)
    email?: string;

    @IsOptional()
    @IsString()
    @Trim()
    firstname?: string;

    @IsOptional()
    @IsString()
    @Trim()
    lastname?: string;

    @IsOptional()
    @IsString()
    @Length(8)
    @Trim()
    password?: string;

    @IsOptional()
    @IsString()
    @Trim()
    @Match(UpdateUserDto, u => u.password)
    confirmation_password?: string;

    @IsOptional()
    @IsEmpty()
    id_card_path?: string;
}
