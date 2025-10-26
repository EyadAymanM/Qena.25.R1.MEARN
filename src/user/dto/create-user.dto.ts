import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  id: string;
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsEmail()
  email: string;
}
