import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TutoringClassService } from './tutoring-class.service';
import { CreateTutoringClassDto } from './dto/create-tutoring-class.dto';
import { UpdateTutoringClassDto } from './dto/update-tutoring-class.dto';
import { User } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('tutoring-classes')
export class TutoringClassController {
  constructor(private readonly tutoringClassService: TutoringClassService) { }

  @Get()
  findAll() {
    return this.tutoringClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tutoringClassService.findOne(id);
  }

  @Post()
  @Auth(Role.TEACHER)
  create(
    @Body() createTutoringClassDto: CreateTutoringClassDto,
    @User() user,
  ) {
    return this.tutoringClassService.create(createTutoringClassDto, user);
  }

  @Patch(':id')
  @Auth(Role.TEACHER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTutoringClassDto: UpdateTutoringClassDto,
    @User() user,
  ) {
    return this.tutoringClassService.update(id, updateTutoringClassDto, user);
  }

  @Delete(':id')
  @Auth(Role.TEACHER)
  remove(
    @Param('id') id: number,
    @User() user
  ) {
    return this.tutoringClassService.remove(id, user);
  }
}
