import { IAttendancesService } from '@/interfaces/attendances.interface';
import { Injectable, InternalServerErrorException, HttpCode, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Attendances } from './entities/attendances.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AttendanceStatus } from '@/common/enum/attendance.enum';
import { GetAttendancesFilterDto } from './dtos/filter.dto';
import { Employees } from '../employees/entities/employees.entity';

@Injectable()
export class AttendancesService implements IAttendancesService {
    constructor(
        @InjectRepository(Attendances)
        private readonly attendancesRepo: Repository<Attendances>,
        @InjectRepository(Employees)
        private readonly employeesRepo: Repository<Employees>
    ) { }

    async checkIn(employeeId: number): Promise<Attendances> {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const companyStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
        let status = AttendanceStatus.PRESENT;
        if (now > companyStartTime) status = AttendanceStatus.LATER;

        try {
            const newAttendance = this.attendancesRepo.create({
                date: today,
                checkIn: now,
                status: status,
                employeeId: employeeId
            })

            return await this.attendancesRepo.save(newAttendance)
        } catch (error: any) {
            throw new ConflictException('You have already checked in today')
        }
    }

    async checkOut(employeeId: number): Promise<Attendances> {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const attendance = await this.attendancesRepo.findOne({
            where: {
                employeeId: employeeId,
                date: today,
            },
        });

        if (!attendance) throw new NotFoundException('You have not checked in yet')
        if (attendance.checkOut) throw new BadRequestException('You have already checked out today');

        attendance.checkOut = now;

        return await this.attendancesRepo.save(attendance);
    }

    async getAttendancesByEmployeeId(employeeId: number, filterDto: GetAttendancesFilterDto): Promise<Attendances[]> {
        const exist = await this.employeesRepo.findOneBy({ id: employeeId });

        if (!exist) throw new NotFoundException('Resourse not found');

        const { month, year } = filterDto;

        const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        return await this.attendancesRepo.find({
            where: {
                employeeId: employeeId,
                date: Between(startDate, endDate)
            }
        })
    }
}
