import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateEmployeesDto, EmployeeResponse } from './dtos/createEmployees.dto';
import { Employees } from './entities/employees.entity';
import { Roles } from '@/decorators/roles.decorator';
import { UserRole } from '@/common/enum/role.enum';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { EMPLOYEE_SERVICE } from '@/common/constants/auth.const';
import { IEmployeesService } from '@/interfaces/employees.interface';
import { CurrentUser } from '@/decorators/currentUser.decorator';
import { IUserInRequest } from '@/common/types/user.type';
import { UpdateEmployeeDto } from './dtos/updateEmployee.dto';

@Controller()
export class EmployeesController {

    constructor(
        @Inject(EMPLOYEE_SERVICE)
        private readonly employeesService: IEmployeesService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN)
    @Post('employees')
    @ResponseMessage('Create new employee success')
    async createEmployee(@Body() dto: CreateEmployeesDto): Promise<Employees> {
        return await this.employeesService.createEmployee(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @Get('departments/:id/employees')
    @ResponseMessage('Get list employees success')
    async getListEmployeesByDepartmentId(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: IUserInRequest): Promise<Employees[]> {
        return await this.employeesService.getListEmployeesByDepartmentId(id, currentUser);
    }


    @HttpCode(HttpStatus.OK)
    @Get('employees/:id')
    @ResponseMessage('Get detail employees success')
    async getDetailEmployeeById(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: IUserInRequest): Promise<Employees> {
        return await this.employeesService.getDetailEmployeeById(id, currentUser);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('employees/:id')
    @ResponseMessage('Update employees success')
    async updateEmployee(@Body() dto: UpdateEmployeeDto, @Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: IUserInRequest): Promise<Employees> {
        return await this.employeesService.updateEmployee(dto, id, currentUser);
    }
}
