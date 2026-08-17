import { ILeavesService } from '@/interfaces/leaves.interface';
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateLeaveDto } from './dtos/createLeave.dto';
import { Leaves } from './entities/leaves.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HandleLeaveDto } from './dtos/handleLeave.dto';
import { GetLeavesFilterDto } from './dtos/getLeavesFilter.dto';
import { IPaginatedResponse } from '@/common/types/response.type';
import { UpdateLeaveDto } from './dtos/updateLeave.dto';
import { UserRole } from '@/common/enum/role.enum';
import { IUserInRequest } from '@/common/types/user.type';
import { LeaveStatus } from '@/common/enum/leave.enum';

@Injectable()
export class LeavesService implements ILeavesService {
    constructor(
        @InjectRepository(Leaves)
        private readonly leavesRepo: Repository<Leaves>
    ) { }
    async createLeave(dto: CreateLeaveDto, employeeId: number): Promise<Leaves> {
        try {
            return await this.leavesRepo.save({ ...dto, employeeId: employeeId });
        } catch (error) {
            console.log('LeavesService.createLeave error:', error);
            throw error;
        }
    }

    async handleLeave(dto: HandleLeaveDto, approvedBy: number, leaveId: number): Promise<Leaves> {
        try {
            return await this.leavesRepo.save({ id: leaveId, ...dto, approvedById: approvedBy })
        } catch (error) {
            console.log('LeavesService.handleLeave error:', error);
            throw error;
        }
    }

    async getLeavesByStatus(filterDto: GetLeavesFilterDto): Promise<IPaginatedResponse<Leaves>> {
        try {
            const { status, page = 1, limit = 10 } = filterDto;
            const skip: number = (page - 1) * limit;

            const query = this.leavesRepo.createQueryBuilder('Leaves');

            if (status) {
                query.andWhere('Leaves.status = :status', { status });
            }

            query.orderBy('Leaves.createdAt', 'DESC')
                .take(limit)
                .skip(skip)

            const [data, total] = await query.getManyAndCount();

            return {
                data,
                meta: {
                    total: total,
                    count: data.length,
                    itemsPerPage: limit,
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                }
            }
        } catch (error) {
            console.log('LeavesService.getLeavesByStatus error:', error);
            throw error;
        }
    }

    async getLeaveById(id: number): Promise<Leaves> {
        try {
            return await this.leavesRepo.createQueryBuilder('Leaves')
                .leftJoinAndSelect('Leaves.employee', 'employee')
                .leftJoinAndSelect('Leaves.approvedBy', 'approvedBy')
                .select(['Leaves.id', 'Leaves.startDate', 'Leaves.endDate', 'Leaves.status', 'Leaves.reason', 'employee.id', 'employee.code', 'employee.fullName', 'approvedBy.id', 'approvedBy.code', 'approvedBy.fullName'])
                .where('Leaves.id = :id', { id: id })
                .getOne() as Leaves
        } catch (error) {
            console.log('LeavesService.getLeaveById error:', error);
            throw error;
        }
    }

    async updateLeave(dto: UpdateLeaveDto, id: number, currentUser: IUserInRequest): Promise<Leaves> {
        try {
            const exist = await this.leavesRepo.findOneBy({ id: id });
            if (!exist) throw new NotFoundException('Resourse not found');

            if (currentUser.employeeId !== exist.employeeId && currentUser.role !== UserRole.ADMIN) {
                throw new ForbiddenException('You do not have permission');
            }

            if (exist.status !== LeaveStatus.PENDING) {
                throw new ForbiddenException('The leave has been approved');
            }

            return await this.leavesRepo.save({ id: id, ...dto })
        } catch (error) {
            console.log('LeavesService.updateLeave error:', error);
            throw error;
        }
    }

    async deleteLeave(id: number, currentUser: IUserInRequest): Promise<void> {
        try {
            const exist = await this.leavesRepo.findOneBy({ id: id });
            if (!exist) throw new NotFoundException('Resourse not found');

            if (currentUser.employeeId !== exist.employeeId && currentUser.role !== UserRole.ADMIN) {
                throw new ForbiddenException('You do not have permission');
            }

            if (exist.status !== LeaveStatus.PENDING) {
                throw new ForbiddenException('The leave has been approved');
            }

            await this.leavesRepo.softDelete({ id: id })
        } catch (error) {
            console.log('LeavesService.deleteLeave error:', error);
            throw error;
        }
    }
}
