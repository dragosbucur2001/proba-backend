import { User } from ".prisma/client";
import { Exclude } from "class-transformer";

export class ResponseUserDto implements Partial<User> {
    @Exclude()
    password: string;

    @Exclude()
    updated_at: Date

    @Exclude()
    created_at: Date

    constructor(partial: Partial<ResponseUserDto>) {
        Object.assign(this, partial);
    }
}
