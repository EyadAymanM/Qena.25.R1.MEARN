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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ParseObjectIdPipe } from "src/pipes/parse-object-id/parse-object-id.pipe";
import { AuthenticationGuard } from "src/auth/guards/authentication/authentication.guard";
import { Roles } from "src/decorators/roles/roles.decorator";
import { AuthorizationGuard } from "src/auth/guards/authorization/authorization.guard";
import { LoggerInterceptor } from "src/interceptors/logger/logger.interceptor";

@Controller("user")
// @UsePipes(new ValidationPipe())
// @UseGuards(AuthenticationGuard)
// @UseInterceptors(LoggerInterceptor)
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
  @Roles("admin")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get("")
  getAllUser() {
    return this.userService.getAllUser();
  }

  // @UseGuards(AuthenticationGuard)
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
