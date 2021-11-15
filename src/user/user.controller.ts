import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    return (await this.userService.findAll()).map(e => new ResponseUserDto(e));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.userService.findOne(id));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.userService.create(createUserDto));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.userService.remove(id));
  }
}
