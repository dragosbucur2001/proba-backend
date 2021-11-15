import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ExistsConstraint } from './validation-rules/exists.rule';
import { UniqueConstraint } from './validation-rules/unique.rule';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { SubjectModule } from './subject/subject.module';
import { TutoringClassModule } from './tutoring-class/tutoring-class.module';
import { ContactRequestsModule } from './contact-requests/contact-requests.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, ReviewModule, SubjectModule, TutoringClassModule, ContactRequestsModule],
  controllers: [],
  providers: [ExistsConstraint, UniqueConstraint],
  exports: [ExistsConstraint, UniqueConstraint],
})
export class AppModule { }
