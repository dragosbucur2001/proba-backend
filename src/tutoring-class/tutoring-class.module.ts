import { Module } from '@nestjs/common';
import { TutoringClassService } from './tutoring-class.service';
import { TutoringClassController } from './tutoring-class.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TutoringClassController],
  providers: [TutoringClassService]
})
export class TutoringClassModule { }
