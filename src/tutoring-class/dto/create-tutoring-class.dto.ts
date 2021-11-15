import { TutoringClass } from ".prisma/client";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateTutoringClassDto implements Partial<TutoringClass> {
    @IsNumber()
    subject_id: number;

    @IsString()
    @Length(20, 500)
    description: string;
}
