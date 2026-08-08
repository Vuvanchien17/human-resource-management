import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { CreateEmployeesDto, EmployeeResponse } from './dtos/createEmployees.dto';
import { Employees } from './entities/employees.entity';
import { Roles } from '@/decorators/roles.decorator';
import { UserRole } from '@/common/enum/role.enum';
import { EmployeesService } from './employees.service';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { EMPLOYEE_SERVICE } from '@/common/constants/auth.const';
import { IEmployeesService } from '@/interfaces/employees.interface';

@Controller('employees')
export class EmployeesController {

    constructor(
        @Inject(EMPLOYEE_SERVICE)
        private readonly employeesService: IEmployeesService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN)
    @Post('')
    @ResponseMessage('Create new employee success')
    async createEmployee(@Body() dto: CreateEmployeesDto): Promise<Employees> {
        return await this.employeesService.createEmployee(dto);
    }
}
