import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from '@/core/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './entities/employees.entity';
import { EMPLOYEE_SERVICE } from '@/common/constants/auth.const';
import { Departments } from '../departments/entities/departments.entity';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
    imports: [UsersModule, DatabaseModule, TypeOrmModule.forFeature([Employees, Departments]), DepartmentsModule],
    controllers: [EmployeesController],
    providers: [{
        provide: EMPLOYEE_SERVICE,
        useClass: EmployeesService
    }],
    exports: [EMPLOYEE_SERVICE]
})
export class EmployeesModule { }
