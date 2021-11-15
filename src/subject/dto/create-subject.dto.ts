import { Subject } from ".prisma/client";
import { IsString } from "class-validator";
import { Trim } from "src/decorators/trim.decorator";
import { Unique } from "src/validation-rules/unique.rule";

export class CreateSubjectDto implements Partial<Subject> {
    @IsString()
    @Trim()
    @Unique(CreateSubjectDto, s => s.title)
    title: string
}
