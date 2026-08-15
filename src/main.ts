import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AuthGuard } from './guards/auth.guard';
import { Logger, LogLevel, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser())
  const configService = app.get(ConfigService);
  const globalPrefix = configService.get<string>('GLOBAL_PREFIX') || 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  await app.listen(String(process.env.PORT));
  const port = process.env.PORT ?? 5000;
  logger.log(`Application is running on: http://localhost:${port}`)
}
bootstrap();
