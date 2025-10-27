import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { LoggerInterceptor } from "./interceptors/logger/logger.interceptor";
// import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  // app.useGlobalGuards(AuthenticationGuard);
  await app.listen(process.env.PORT ?? 3000);
  console.log("env:", process.env.PORT);
}
bootstrap();
