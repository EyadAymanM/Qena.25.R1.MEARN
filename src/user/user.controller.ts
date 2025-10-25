import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser, User } from 'src/types/user.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() body: User) {
    return this.userService.create(body);
  }

  @Post('many')
  createMany(@Body() body: User[]) {
    return this.userService.createMany(body);
  }

  @Get('')
  getAllUser(): User[] {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getUser(@Param('id') id) {
    return this.userService.getUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() body: UpdateUser) {
    return this.userService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id) {
    return this.userService.deleteUser(+id);
  }
}
