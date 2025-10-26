import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ParseObjectIdPipe } from "src/parse-object-id/parse-object-id.pipe";

@Controller("user")
// @UsePipes(new ValidationPipe())
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  // @Post("many")
  // createMany(@Body() body: CreateUserDto[]) {
  //   return this.userService.createMany(body);
  // }

  @Get("")
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(":id")
  getUser(@Param("id", ParseObjectIdPipe) id) {
    return this.userService.getUser(id);
  }
  @Patch(":id")
  update(@Param("id") id, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param("id") id) {
    return this.userService.deleteUser(id);
  }
}
