import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departments } from './entities/departments.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentsDto } from './dtos/createDepartments.dto';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { IDepartmentsService } from './../../interfaces/departments.interface';

@Injectable()
export class DepartmentsService implements IDepartmentsService {
    constructor(
        @InjectRepository(Departments)
        private readonly departmentsRepo: Repository<Departments>
    ) { }

    async createDepartment(dto: CreateDepartmentsDto): Promise<Departments> {
        return await this.departmentsRepo.save(
            { name: dto.name, description: dto.description }
        )
    }

    async getDepartmentById(id: number): Promise<Departments> {
        return await this.departmentsRepo.findOneBy({ id: id }) as Departments;
    }

    async updateDeparment(dto: UpdateDepartmentDto, id: number): Promise<Departments> {
        return await this.departmentsRepo.save({ id: id, ...dto });
    }

    async deleteDepartment(id: number): Promise<void> {
        await this.departmentsRepo.softDelete({ id: id });
    }

}
