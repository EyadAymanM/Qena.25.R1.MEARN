import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;
    const roles: string[] = this.reflector.get("roles", context.getHandler());
    console.log("handler:",context.getHandler());
    console.log("user role:", role);
    console.log("roles:", roles);
    if (!roles.includes(role)) throw new ForbiddenException("Not Allowed");
    return true;
  }
}
