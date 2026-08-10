import { IInsurancesService } from '@/interfaces/insurances.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInsuranceDto } from './dtos/createInsurance.dto';
import { Insurances } from './entities/insurances.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMPLOYEE_SERVICE } from '@/common/constants/auth.const';
import { IEmployeesService } from '@/interfaces/employees.interface';
import { UpdateInsuranceDto } from './dtos/updateinsurance.dto';

@Injectable()
export class InsurancesService implements IInsurancesService {
    constructor(
        @InjectRepository(Insurances)
        private readonly insurancesRepo: Repository<Insurances>,

        @Inject(EMPLOYEE_SERVICE)
        private readonly employeesService: IEmployeesService
    ) { }

    async createInsurance(dto: CreateInsuranceDto, id: number): Promise<Insurances> {
        const exist = await this.employeesService.findOneById(id);
        if (!exist) throw new NotFoundException('Resourse not found');

        return await this.insurancesRepo.save({
            ...dto,
            employeeId: exist.id
        })
    }

    async updateInsurance(dto: UpdateInsuranceDto, id: number): Promise<Insurances> {
        const exist = await this.insurancesRepo.findOneBy({ id: id });
        if (!exist) throw new NotFoundException('Resourse not found');

        return await this.insurancesRepo.save({ id: id, ...dto });
    }

    async deleteInsurance(id: number): Promise<void> {
        const exist = await this.insurancesRepo.findOneBy({ id: id });
        if (!exist) throw new NotFoundException('Resourse not found');

        await this.insurancesRepo.softDelete({ id: id })
    }
}
