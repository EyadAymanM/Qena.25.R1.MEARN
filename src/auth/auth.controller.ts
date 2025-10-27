import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO, RegisterDTO } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Post("register")
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }
}
