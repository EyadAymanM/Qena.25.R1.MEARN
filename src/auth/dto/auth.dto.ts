import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class RegisterDTO {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsEmail()
  email: string;
  @Length(6, 18)
  password: string;

  @IsOptional()
  role?: string;
}

export class LoginDTO {
  @IsString()
  @IsEmail()
  email: string;
  @Length(6, 18)
  password: string;
}
