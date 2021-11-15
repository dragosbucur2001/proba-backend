import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from "src/decorators/trim.decorator";

export class CreateContactRequestDto {
    @IsString()
    @IsNotEmpty()
    @Trim()
    name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    message: string;
}
