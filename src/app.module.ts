import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ExistsRule } from './validation-rules/exists.rule';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [],
  // providers: [ExistsRule],
  // exports: [ExistsRule],
})
export class AppModule { }
