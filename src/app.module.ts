import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CatchEverythingFilter } from './common/exceptions/all-exception.filter';
import { RedisModule } from '@nestjs-modules/ioredis';
import redisConfig from './config/redis.config';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [authConfig, redisConfig]
  }), RedisModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'single',
      url: `redis://${configService.get<string>('REDIS_HOST')}:${configService.get<number>('REDIS_PORT')}`,
    }),
    inject: [ConfigService],
  })],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }, {
      provide: APP_GUARD,
      useClass: RolesGuard
    }, {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }],
})
export class AppModule { }
