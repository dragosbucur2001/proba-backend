import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { RookieToken } from 'src/decorators/rookie.decorator';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(@RookieToken() token: string): Promise<ResponseUserDto[]> {
    return (await this.userService.findAll(token)).map(e => new ResponseUserDto(e));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @RookieToken() token: string,
  ): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.userService.findOne(id, token));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @RookieToken() token: string,
  ): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.userService.update(id, updateUserDto, token));
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @RookieToken() token: string,
  ): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.userService.remove(id, token));
  }
}
