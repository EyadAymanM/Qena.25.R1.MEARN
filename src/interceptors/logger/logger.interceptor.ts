import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { Observable, tap } from "rxjs";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logfilePath = path.join(__dirname, "../../../logs.log");
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const {
      method,
      url,
      headers: { origin },
    } = request;
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const log = `${new Date().toISOString()} - ${method} ${url} ${origin} - ${responseTime}ms\n`;
        fs.appendFile(this.logfilePath, log, (err) => {
          if (err) console.log(err);
        });
      }),
    );
  }
}
