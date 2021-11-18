import { Body, Controller, Param, Post } from '@nestjs/common';
import { RookieToken } from 'src/decorators/rookie.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { AuthService } from './auth.service';
import { Role } from './roles.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(
        @Body() loginUserDto: LoginUserDto,
        @RookieToken() token: string,
    ) {
        return this.authService.login(loginUserDto, token);
    }

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto,
        @RookieToken() token: string,
    ): Promise<ResponseUserDto> {
        return new ResponseUserDto(await this.authService.register(createUserDto, token));
    }
}
