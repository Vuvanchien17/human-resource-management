import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Roles } from '@/decorators/roles.decorator';
import { CreateDepartmentsDto } from './dtos/createDepartments.dto';
import { UserRole } from '@/common/enum/role.enum';
import { Departments } from './entities/departments.entity';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { IDepartmentsService } from '@/interfaces/departments.interface';
import { DEPARTMENT_SERVICE } from '@/common/constants/auth.const';

@Controller('departments')
export class DepartmentsController {
    constructor(
        @Inject(DEPARTMENT_SERVICE)
        private readonly departmentsService: IDepartmentsService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN)
    @ResponseMessage('Create new department success')
    @Post()
    async createDepartment(@Body() dto: CreateDepartmentsDto): Promise<Departments> {
        return await this.departmentsService.createDepartment(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @ResponseMessage('Update department success')
    @Patch(':id')
    async updateDepartment(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDepartmentDto): Promise<Departments> {
        return await this.departmentsService.updateDeparment(dto, id);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @ResponseMessage('Delete department success')
    @Delete(':id')
    async deleteDepartment(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.departmentsService.deleteDepartment(id);
    }

}
