import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { LoginDTO, RegisterDTO } from "./dto/auth.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { jwtSecret } from "src/jwt.constant";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDTO) {
    try {
      const user = await this.userModel.findOne({ email: loginDto.email });
      if (!user) throw new BadRequestException("emial or password isn't correct");
      console.log(loginDto.password);
      console.log(user.password);
      const valid = await bcrypt.compare(loginDto.password, user.password);
      if (!valid)
        throw new BadRequestException("emial or password isn't correct");
      // console.log(jwtSecret.secret);
      const token = this.jwtService.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        {
          secret: jwtSecret.secret,
        }
      );
      return { access_token: token };
    } catch (error) {
      console.log(error);
    }
  }

  async register(registerDto: RegisterDTO) {
    const exist = await this.userModel.findOne({ email: registerDto.email });
    if (exist) throw new ConflictException("Email already exists");
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.userModel.create(registerDto);
    const { password, ...userWithoutPass } = newUser.toObject();
    return { message: "user Registered", user: userWithoutPass };
  }
}
