import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Role } from 'src/auth/roles.enum';
import { Auth } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ProfileService } from './profile.service';

@Controller('my')
@Auth()
@UseGuards(ThrottlerGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get()
    async getProfile(@User() user) {
        return new ResponseUserDto(await this.profileService.getProfile(user));
    }

    @Patch()
    async updateProfile(
        @User() user,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return new ResponseUserDto(await this.profileService.updateProfile(updateUserDto, user));
    }

    @Get('/reviews')
    async getMyReviews(@User() user) {
        return await this.profileService.getMyReviews(user);
    }

    @Get('/tutoring-classes')
    @Roles(Role.TEACHER)
    async getMyTutoringClasses(@User() user) {
        return await this.profileService.getMyTutoringClasses(user);
    }

    @Get('/enrolments')
    @Roles(Role.STUDENT)
    async getMyEnrolmemt(@User() user) {
        return await this.profileService.getMyEnrolments(user);
    }

    @Delete('/enrolments/:tutoring_class_id')
    @Roles(Role.STUDENT)
    async getMyEnrolments(
        @Param('tutoring_class_id', ParseIntPipe) tutoring_class_id: number,
        @User() user,
    ) {
        return await this.profileService.removeMyEnrolment(tutoring_class_id, user);
    }
}
