import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Role } from 'src/auth/roles.enum';
import { Auth } from 'src/decorators/auth.decorator';
import { ContactRequestsService } from './contact-requests.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactRequestDto } from './dto/update-contact-request.dto';

@Controller('contact-requests')
export class ContactRequestsController {
  constructor(private readonly contactRequestsService: ContactRequestsService) { }

  @Get()
  @Auth(Role.ADMIN)
  findAll() {
    return this.contactRequestsService.findAll();
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.contactRequestsService.findOne(+id);
  }

  @Post()
  create(@Body() createContactRequestDto: CreateContactRequestDto) {
    return this.contactRequestsService.create(createContactRequestDto);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateContactRequestDto: UpdateContactRequestDto) {
    return this.contactRequestsService.update(+id, updateContactRequestDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.contactRequestsService.remove(+id);
  }
}
