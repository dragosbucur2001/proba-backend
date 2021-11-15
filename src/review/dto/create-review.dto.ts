import { Review } from ".prisma/client";
import { IsString, Length } from "class-validator";
import { Trim } from "src/decorators/trim.decorator";

export class CreateReviewDto implements Partial<Review> {
    @IsString()
    @Length(1, 1000)
    @Trim()
    message: string
}
