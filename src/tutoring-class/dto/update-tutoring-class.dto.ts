import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Length } from 'class-validator';
import { CreateTutoringClassDto } from './create-tutoring-class.dto';

export class UpdateTutoringClassDto extends PartialType(CreateTutoringClassDto) {
    @IsOptional()
    @IsString()
    @Length(20, 500)
    description?: string;
}
