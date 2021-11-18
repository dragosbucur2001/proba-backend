import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { Role } from 'src/auth/roles.enum';
import { Auth } from 'src/decorators/auth.decorator';
import { RookieToken } from 'src/decorators/rookie.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactRequestsService } from './contact-requests.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactRequestDto } from './dto/update-contact-request.dto';

@Controller('contact-requests')
export class ContactRequestsController {
  constructor(
    private readonly contactRequestsService: ContactRequestsService,
    private prisma: PrismaService
  ) { }

  @Get()
  @Auth(Role.ADMIN)
  findAll() {
    return this.contactRequestsService.findAll();
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactRequestsService.findOne(id);
  }

  @Post()
  async create(
    @Body() createContactRequestDto: CreateContactRequestDto,
    @RookieToken() token,
  ) {
    let contact = await this.contactRequestsService.create(createContactRequestDto, token);
    delete contact.rookie_id;
    delete contact.updated_at;
    delete contact.created_at;
    return contact;
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContactRequestDto: UpdateContactRequestDto) {
    return this.contactRequestsService.update(id, updateContactRequestDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.contactRequestsService.remove(+id);
  }
}
