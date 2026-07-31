import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokens } from './entities/refresh-token.entity';
import { AuthGuard } from '@/guards/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AUTH_SERVICE } from '@/common/constants/auth.const';
import { Users } from '../users/users.entity';


@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RefreshTokens]),
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret = configService.get<string>('auth.JWT_SECRET_KEY');
        if (!secret) {
          throw new Error('JWT secret not configured');
        }
        return {
          secret,
          signOptions: { expiresIn: '1800s' },
        };
      },
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, {
    provide: AUTH_SERVICE,
    useClass: AuthService
  }],
  exports: [AUTH_SERVICE, AuthGuard]
})
export class AuthModule { }
