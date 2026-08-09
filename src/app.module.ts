import { Module, ValidationPipe, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CatchEverythingFilter } from './common/exceptions/all-exception.filter';
import { RedisModule } from '@nestjs-modules/ioredis';
import redisConfig from './config/redis.config';
import nodeMailerConfig from './config/nodeMailer.config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmployeesModule } from './modules/employees/employees.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { SeederService } from './core/database/seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/entities/users.entity';
import { Educations } from './modules/educations/entities/educations.entity';
import { EducationsModule } from './modules/educations/educations.module';
import { Employees } from './modules/employees/entities/employees.entity';
import { SkillsModule } from './modules/skills/skills.module';
import { LeavesModule } from './modules/leaves/leaves.module';
import { AttendancesModule } from './modules/attendances/attendances.module';
import { InsurancesModule } from './modules/insurances/insurances.module';



@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, EmployeesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, redisConfig, nodeMailerConfig]
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: `redis://${configService.get<string>('REDIS_HOST')}:${configService.get<number>('REDIS_PORT')}`,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mailer.MAILER_HOST'),
          port: configService.get<number>('mailer.MAILER_PORT'),
          auth: {
            user: configService.get<string>('mailer.MAILER_USER'),
            pass: configService.get<string>('mailer.MAILER_APP_PASS'),
          }
        },
        defaults: {
          from: '"No Reply" <JE@gmail.com>'
        }
      })
    }),
    DepartmentsModule, TypeOrmModule.forFeature([Users, Employees]), EducationsModule, SkillsModule, LeavesModule, AttendancesModule, InsurancesModule
  ],
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
    }, {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }, SeederService],
})
export class AppModule { }
