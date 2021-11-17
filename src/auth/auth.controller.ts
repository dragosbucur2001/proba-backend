import { Body, Controller, Param, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { AuthService } from './auth.service';
import { Role } from './roles.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Post('register/:title')
    @Auth()
    async register(
        @Body() createUserDto: CreateUserDto,
        @Param('title') title: Role
    ): Promise<ResponseUserDto> {
        return new ResponseUserDto(await this.authService.register(createUserDto, title));
    }
}
