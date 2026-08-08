import { ConflictException, Injectable } from '@nestjs/common';
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

@Injectable()
export class EmployeesService implements IEmployeesService {
    constructor(
        private readonly usersService: UsersService,
        private readonly dataSource: DataSource,
        @InjectRepository(Employees)
        private readonly employeeRepo: Repository<Employees>
    ) { }

    async findOneByUserId(id: number): Promise<Employees> {
        return await this.employeeRepo.findOneBy({ userId: id }) as Employees;
    }

    async findOneById(id: number): Promise<Employees> {
        return await this.employeeRepo.findOneBy({ id: id }) as Employees;
    }

    async createEmployee(dto: CreateEmployeesDto): Promise<Employees> {
        const exist = await this.usersService.findOneByEmail(dto.email);
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
}
