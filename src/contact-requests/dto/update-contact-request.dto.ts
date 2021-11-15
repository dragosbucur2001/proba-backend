import { IsBoolean } from "class-validator";

export class UpdateContactRequestDto {
    @IsBoolean()
    is_resolved: boolean;
}
