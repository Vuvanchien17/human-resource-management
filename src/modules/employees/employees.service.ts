import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeesDto, EmployeeResponse } from './dtos/createEmployees.dto';
import { UsersService } from '../users/users.service';
import { DataSource, Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { Employees } from './entities/employees.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner } from 'typeorm';
import { Departments } from '../departments/entities/departments.entity';
import { IEmployeesService } from './../../interfaces/employees.interface';
import { IUserInRequest } from '@/common/types/user.type';
import { UserRole } from '@/common/enum/role.enum';
import { DEPARTMENT_SERVICE } from '@/common/constants/auth.const';
import { IDepartmentsService } from '@/interfaces/departments.interface';
import { UpdateEmployeeDto } from './dtos/updateEmployee.dto';

@Injectable()
export class EmployeesService implements IEmployeesService {
    constructor(
        private readonly usersService: UsersService,
        private readonly dataSource: DataSource,
        @InjectRepository(Employees)
        private readonly employeeRepo: Repository<Employees>,

        @InjectRepository(Departments)
        private readonly departmentRepo: Repository<Departments>,

        @Inject(DEPARTMENT_SERVICE)
        private readonly departmentsService: IDepartmentsService
    ) { }

    async findOneByCondition(params): Promise<Employees | null> {
        return await this.employeeRepo.findOneBy(params);
    }

    async createEmployee(dto: CreateEmployeesDto): Promise<Employees> {
        const exist = await this.usersService.findOneByCondition({ email: dto.email });
        if (exist) throw new ConflictException('Account existed');

        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const passwordHash = await bcrypt.hash(dto.password, 10);
            const user = await queryRunner.manager.save(
                Users,
                { email: dto.email, password: passwordHash, role: dto.role }
            )

            const nextCode = await this.generateNextCode();

            const saveEmployee = await queryRunner.manager.save(
                Employees,
                {
                    fullName: dto.fullName,
                    position: dto.position,
                    salary: dto.salary,
                    userId: user.id,
                    departmentId: dto.departmentId,
                    code: nextCode
                },

            )
            await queryRunner.commitTransaction();

            const employee = await queryRunner.manager.createQueryBuilder(Employees, 'employee')
                .leftJoinAndSelect(Users, 'user')
                .leftJoinAndSelect(Departments, 'department')
                .select(['employee.id', 'employee.code', 'employee.fullName', 'employee.position', 'user.id', 'user.email', 'department.id', 'department.name'])
                .where('employee.id = :id', { id: saveEmployee.id })
                .getOne()

            return employee as Employees;

        } catch (error) {
            console.log("Error transaction:", error);
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    private async generateNextCode(): Promise<string> {
        const lastEmployee = await this.employeeRepo
            .createQueryBuilder("Employees")
            .orderBy({ code: 'DESC' })
            .offset(0)
            .limit(1)
            .getOne() as Employees

        let nextCode = "";
        if (!lastEmployee) {
            nextCode = "NV0001";
        } else {
            const lastCode = lastEmployee.code;
            const currentNumber = parseInt(lastCode.replace("NV", ""), 10);
            const nextNumber = currentNumber + 1;
            nextCode = `NV${String(nextNumber).padStart(4, "0")}`;
        }
        return nextCode;
    }

    async getListEmployeesByDepartmentId(id: number, currentUser: IUserInRequest): Promise<Employees[]> {
        const exist = await this.departmentsService.getDepartmentById(id);
        if (!exist) throw new NotFoundException('Resource not found');

        const currentEmployee = await this.employeeRepo.findOneBy({ id: currentUser.employeeId }) as Employees;

        if (currentUser.role === UserRole.MANAGER && currentEmployee.departmentId !== id) {
            throw new ForbiddenException('You do not have permission');
        };

        const listEmployees = await this.employeeRepo.createQueryBuilder("e")
            .leftJoinAndSelect('e.department', 'dept')
            .where('dept.id = :id', { id: id })
            .andWhere('e.isActive = :isActive', { isActive: true })
            .andWhere('e.id != :currentEmployeeId', { currentEmployeeId: currentEmployee.id })
            .select(['e.id', 'e.code', 'e.fullName', 'e.position'])
            .addSelect(['dept.id', 'dept.name'])
            .getMany();

        return listEmployees;

    }

    async getDetailEmployeeById(id: number, currentUser: IUserInRequest): Promise<Employees> {
        const exist = await this.employeeRepo.findOneBy({ id: id });
        if (!exist) throw new NotFoundException('Resource not found');

        const currentEmployee = await this.employeeRepo.findOneBy({ id: currentUser.employeeId }) as Employees;
        if (currentUser.role === UserRole.EMPLOYEE && currentEmployee.id !== id) {
            throw new ForbiddenException('You do not have permission');
        }

        if (currentUser.role === UserRole.MANAGER && currentEmployee.departmentId !== exist.id) {
            throw new ForbiddenException('You do not have permission');
        }

        return await this.employeeRepo.createQueryBuilder('e')
            .where('e.id = :id', { id: id })
            .andWhere('e.isActive = :isActive', { isActive: true })
            .leftJoinAndSelect('e.department', 'dept')
            .leftJoinAndSelect('e.skills', 'skills')
            .leftJoinAndSelect('e.educations', 'edu')
            .select(['e.id', 'e.code', 'e.fullName', 'e.position', 'e.gender', 'e.birth', 'e.address', 'dept.id', 'dept.name', 'skills.name', 'skills.level', 'edu.schoolName', 'edu.fieldStudy', 'edu.degree'])
            .getOne() as Employees;
    }

    async updateEmployee(dto: UpdateEmployeeDto, employeeId: number, currentUser: IUserInRequest): Promise<Employees> {
        const exist = await this.employeeRepo.findOneBy({ id: employeeId });
        if (!exist) throw new NotFoundException('Resourse not found');

        if (currentUser.employeeId !== exist.id && currentUser.role !== UserRole.ADMIN) {
            throw new ForbiddenException('You do not have permission');
        }

        return await this.employeeRepo.save({ id: employeeId, ...dto });
    }

}
