import { Review } from ".prisma/client";
import { IsOptional, IsString, Length } from "class-validator";
import { Trim } from "src/decorators/trim.decorator";

export class UpdateReviewDto implements Partial<Review> {
    @IsString()
    @Length(1, 1000)
    @Trim()
    @IsOptional()
    message?: string
}
