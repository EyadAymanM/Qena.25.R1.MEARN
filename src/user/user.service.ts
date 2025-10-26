import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  users: CreateUserDto[] = [];
  async create(body: CreateUserDto) {
    const exist = await this.userModel.findOne({ email: body.email });
    if (exist) throw new ConflictException("this email already exists");
    const user = await this.userModel.create(body);
    return { message: "User created successfully", user };
  }

  // createMany(users: CreateUserDto[]) {
  //   this.users.push(...users);
  //   return { message: "Many users added", users };
  // }

  async getAllUser() {
    return await this.userModel.find();
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException("user not found");
    return user;
  }

  async update(id: string, updateUser: UpdateUserDto) {
    const newUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    return {
      message: "User Updated Succeessfully",
      updatedUser: newUser,
    };
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
