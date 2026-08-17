import { IEducationsService } from '@/interfaces/education.interface';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Educations } from './entities/educations.entity';
import { CreateEducationsDto } from './dtos/createEducations.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '@/common/enum/role.enum';
import { EMPLOYEE_SERVICE } from '@/common/constants/auth.const';
import { IEmployeesService } from '@/interfaces/employees.interface';
import { UpdateEducationDto } from './dtos/updateEducation.dto';
import { IUserInRequest } from '@/common/types/user.type';

@Injectable()
export class EducationsService implements IEducationsService {
    constructor(
        @InjectRepository(Educations)
        private readonly educationRepo: Repository<Educations>,
        @Inject(EMPLOYEE_SERVICE)
        private readonly employeesService: IEmployeesService
    ) { }

    async createEducation(dto: CreateEducationsDto, id: number): Promise<Educations> {
        try {
            const exist = await this.employeesService.findOneByCondition({ id: id });
            if (!exist) throw new NotFoundException("Resourse not found")

            return await this.educationRepo.save({ ...dto, employeeId: exist.id });
        } catch (error) {
            console.log('EducationsService.createEducation error:', error);
            throw error;
        }
    }

    async updateEducation(dto: UpdateEducationDto, id: number, currentUser: IUserInRequest): Promise<Educations> {
        try {
            const exist = await this.educationRepo.findOneBy({ id: id });
            if (!exist) throw new NotFoundException('Resource not found');
            if (currentUser.employeeId !== exist.employeeId && currentUser.role !== UserRole.ADMIN) {
                throw new ForbiddenException('You do not have permission')
            }

            return await this.educationRepo.save({
                id: id,
                ...dto,
            })
        } catch (error) {
            console.log('EducationsService.updateEducation error:', error);
            throw error;
        }
    }

    async deleteEducation(id: number, currentUser: IUserInRequest): Promise<void> {
        try {
            const exist = await this.educationRepo.findOneBy({ id: id });
            if (!exist) throw new NotFoundException('Resource not found');
            if (currentUser.employeeId !== exist.employeeId && currentUser.role !== UserRole.ADMIN) {
                throw new ForbiddenException('You do not have permission')
            }

            await this.educationRepo.softDelete({ id: id });
        } catch (error) {
            console.log('EducationsService.deleteEducation error:', error);
            throw error;
        }
    }
}
