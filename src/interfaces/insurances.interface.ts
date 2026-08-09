
import { Insurances } from '@/modules/insurances/entities/insurances.entity';
import { CreateInsuranceDto } from './../modules/insurances/dtos/createInsurance.dto';
import { UpdateInsuranceDto } from '@/modules/insurances/dtos/updateinsurance.dto';
export interface IInsurancesService {
    createInsurance(dto: CreateInsuranceDto, id: number): Promise<Insurances>;
    updateInsurance(dto: UpdateInsuranceDto, id: number): Promise<Insurances>;
    deleteInsurance(id: number): Promise<void>;
}