import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

dotenv.config();

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TTL }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard, JwtAuthGuard],
  exports: [AuthService, JwtStrategy, RolesGuard, JwtAuthGuard]
})
export class AuthModule { }
