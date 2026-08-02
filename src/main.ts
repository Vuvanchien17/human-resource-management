import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AuthGuard } from './guards/auth.guard';
import { LogLevel } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("api/v1")
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
