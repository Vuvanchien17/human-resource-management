
import { Inject, Injectable } from '@nestjs/common';
import { CalculatePayrollDto } from './dtos/calculatePayroll.dto';
import { Payrolls } from './entities/payrolls.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Employees } from '../employees/entities/employees.entity';
import { Attendances } from '../attendances/entities/attendances.entity';
import { Insurances } from '../insurances/entities/insurances.entity';
import { InsuranceStatus } from '@/common/enum/insurances.enum';

@Injectable()
export class PayrollsService {
    constructor(
        @InjectRepository(Payrolls)
        private readonly payrollsRepo: Repository<Payrolls>,
    ) { }
    // async calculatePayroll(dto: CalculatePayrollDto): Promise<void> {
    //     const { month, year } = dto;

    //     const STANDARD_WORKING_DAYS = 26;

    //     const INSURANCE_EMPLOYEE_RATE = 0.105;

    //     const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    //     const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    //     const employees = await this.employeesRepository.find({
    //         where: { isActive: true }
    //     });

    //     // if (employees.length === 0) {
    //     //     return [];
    //     // }

    //     const employeeIds = employees.map(emp => emp.id);

    //     const attendances = await this.attendancesRepository.find({
    //         where: {
    //             employeeId: In(employeeIds),
    //             date: Between(startDate, endDate)
    //         }
    //     });

    //     const insurances = await this.insurancesRepository.find({
    //         where: {
    //             employeeId: In(employeeIds),
    //             status: InsuranceStatus.ACTIVE
    //         }
    //     });

    //     const insuranceMap = new Map(insurances.map(ins => [ins.employeeId, ins]));

    //     const payrollsToSave: Payrolls[] = [];


    // }
}
