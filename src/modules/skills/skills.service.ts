import { ISkillsService } from '@/interfaces/skills.interface';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dtos/createSkill.dto';
import { Skills } from './entities/skills.entity';
import { IUserInRequest } from '@/common/types/user.type';
import { UpdateSkillDto } from './dtos/updateSkill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMPLOYEE_SERVICE } from '@/common/constants/auth.const';
import { IEmployeesService } from '@/interfaces/employees.interface';
import { UserRole } from '@/common/enum/role.enum';

@Injectable()
export class SkillsService implements ISkillsService {
    constructor(
        @InjectRepository(Skills)
        private readonly skillRepo: Repository<Skills>,

        @Inject(EMPLOYEE_SERVICE)
        private readonly employeesService: IEmployeesService
    ) { }

    async createSkill(dto: CreateSkillDto, id: number): Promise<Skills> {
        try {
            const exist = await this.employeesService.findOneByCondition(id);
            if (!exist) throw new NotFoundException('Resourse not found');

            return await this.skillRepo.save({ ...dto, employeeId: exist.id });
        } catch (error) {
            console.log('SkillsService.createSkill error:', error);
            throw error;
        }
    }

    async updateSkill(dto: UpdateSkillDto, id: number, currentUser: IUserInRequest): Promise<Skills> {
        try {
            const exist = await this.skillRepo.findOneBy({ id: id });
            if (!exist) throw new NotFoundException('Resourse not found');

            if (currentUser.employeeId !== exist.employeeId && currentUser.role !== UserRole.ADMIN) {
                throw new ForbiddenException('You do not have permission');
            }

            return await this.skillRepo.save({ id: id, ...dto });
        } catch (error) {
            console.log('SkillsService.updateSkill error:', error);
            throw error;
        }
    }

    async deleteSkill(id: number, currentUser: IUserInRequest): Promise<void> {
        try {
            const exist = await this.skillRepo.findOneBy({ id: id });
            if (!exist) throw new NotFoundException('Resourse not found');

            if (currentUser.employeeId !== exist.employeeId && currentUser.role !== UserRole.ADMIN) {
                throw new ForbiddenException('You do not have permission');
            }

            await this.skillRepo.softDelete({ id: id });
        } catch (error) {
            console.log('SkillsService.deleteSkill error:', error);
            throw error;
        }
    }
}
