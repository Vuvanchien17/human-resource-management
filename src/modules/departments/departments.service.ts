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
        try {
            return await this.departmentsRepo.save(
                { name: dto.name, description: dto.description }
            )
        } catch (error) {
            console.log('DepartmentsService.createDepartment error:', error);
            throw error;
        }
    }

    async getDepartmentById(id: number): Promise<Departments> {
        try {
            return await this.departmentsRepo.findOneBy({ id: id }) as Departments;
        } catch (error) {
            console.log('DepartmentsService.getDepartmentById error:', error);
            throw error;
        }
    }

    async updateDeparment(dto: UpdateDepartmentDto, id: number): Promise<Departments> {
        try {
            return await this.departmentsRepo.save({ id: id, ...dto });
        } catch (error) {
            console.log('DepartmentsService.updateDeparment error:', error);
            throw error;
        }
    }

    async deleteDepartment(id: number): Promise<void> {
        try {
            await this.departmentsRepo.softDelete({ id: id });
        } catch (error) {
            console.log('DepartmentsService.deleteDepartment error:', error);
            throw error;
        }
    }

}
