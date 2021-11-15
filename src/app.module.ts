import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ExistsConstraint } from './validation-rules/exists.rule';
import { UniqueConstraint } from './validation-rules/unique.rule';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [ExistsConstraint, UniqueConstraint],
  exports: [ExistsConstraint, UniqueConstraint],
})
export class AppModule { }
