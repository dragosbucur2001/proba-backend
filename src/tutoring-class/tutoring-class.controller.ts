import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TutoringClassService } from './tutoring-class.service';
import { CreateTutoringClassDto } from './dto/create-tutoring-class.dto';
import { UpdateTutoringClassDto } from './dto/update-tutoring-class.dto';
import { User } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { Role } from 'src/auth/roles.enum';
import { RookieToken } from 'src/decorators/rookie.decorator';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('tutoring-classes')
@UseGuards(ThrottlerGuard)
export class TutoringClassController {
  constructor(private readonly tutoringClassService: TutoringClassService) { }

  @Get()
  findAll(@RookieToken() token: string) {
    return this.tutoringClassService.findAll(token);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @RookieToken() token: string,
  ) {
    return this.tutoringClassService.findOne(id, token);
  }

  @Post()
  @Auth(Role.TEACHER)
  create(
    @Body() createTutoringClassDto: CreateTutoringClassDto,
    @User() user,
    @RookieToken() token: string,
  ) {
    return this.tutoringClassService.create(createTutoringClassDto, user, token);
  }

  @Post(':id/enrol')
  @Auth(Role.STUDENT)
  enroll(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
    @RookieToken() token: string,
  ) {
    return this.tutoringClassService.enroll(id, user, token);
  }

  @Patch(':id')
  @Auth(Role.TEACHER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTutoringClassDto: UpdateTutoringClassDto,
    @User() user,
    @RookieToken() token: string,
  ) {
    return this.tutoringClassService.update(id, updateTutoringClassDto, user, token);
  }

  @Delete(':id')
  @Auth(Role.TEACHER)
  remove(
    @Param('id') id: number,
    @User() user,
    @RookieToken() token: string,
  ) {
    return this.tutoringClassService.remove(id, user, token);
  }
}
