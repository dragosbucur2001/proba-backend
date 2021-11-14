import { Transform } from "class-transformer";
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

export const Hash = () => Transform(({ value }) => bcrypt.hashSync(value, process.env.PASS_SALT));
