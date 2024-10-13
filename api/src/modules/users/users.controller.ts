import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserParamsDto } from './dto/update-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { DeleteUserParamsDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: FindAllUserDto) {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param() params: UpdateUserParamsDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param() params: DeleteUserParamsDto) {
    return await this.usersService.remove(params.id);
  }
}
