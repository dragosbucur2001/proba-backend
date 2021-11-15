import { Subject } from '.prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { Trim } from 'src/decorators/trim.decorator';
import { Unique } from 'src/validation-rules/unique.rule';

export class UpdateSubjectDto implements Partial<Subject> {
    @IsString()
    @IsOptional()
    @Trim()
    @Unique(UpdateSubjectDto, s => s.title)
    title: string;
}
