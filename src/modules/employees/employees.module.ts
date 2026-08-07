import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from '@/core/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './entities/employees.entity';

@Module({
    imports: [UsersModule, DatabaseModule, TypeOrmModule.forFeature([Employees])],
    controllers: [EmployeesController],
    providers: [EmployeesService],
    exports: [EmployeesService]
})
export class EmployeesModule { }
