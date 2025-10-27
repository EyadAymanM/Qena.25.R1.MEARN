import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { jwtSecret } from "src/jwt.constant";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) throw new ForbiddenException("You Must login first");
    const payload = this.jwtService.verify(token, {
      secret: jwtSecret.secret,
    });
    request.user = payload;
    return true;
  }
}
