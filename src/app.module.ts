import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ExistsConstraint } from './validation-rules/exists.rule';
import { UniqueConstraint } from './validation-rules/unique.rule';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [],
  providers: [ExistsConstraint, UniqueConstraint],
  exports: [ExistsConstraint, UniqueConstraint],
})
export class AppModule { }
