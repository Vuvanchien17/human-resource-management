import { INSURANCE_SERVICE } from '@/common/constants/auth.const';
import { UserRole } from '@/common/enum/role.enum';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { IInsurancesService } from '@/interfaces/insurances.interface';
import { Body, Controller, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateInsuranceDto } from './dtos/createInsurance.dto';
import { Insurances } from './entities/insurances.entity';
import { UpdateInsuranceDto } from './dtos/updateinsurance.dto';

@Controller('')
@Roles(UserRole.ADMIN)
export class InsurancesController {
    constructor(
        @Inject(INSURANCE_SERVICE)
        private readonly insurancesService: IInsurancesService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN)
    @Post('employees/:id/insurances')
    @ResponseMessage('Create new insurance success')
    async createInsurance(@Body() dto: CreateInsuranceDto, @Param('id', ParseIntPipe) id: number): Promise<Insurances> {
        return await this.insurancesService.createInsurance(dto, id);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @Patch('insurances/:id')
    @ResponseMessage('Update insurance success')
    async updateInsurance(@Body() dto: UpdateInsuranceDto, @Param('id', ParseIntPipe) id: number): Promise<Insurances> {
        return await this.insurancesService.updateInsurance(dto, id);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @Patch('insurances/:id')
    @ResponseMessage('Delete insurance success')
    async deleteInsurance(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.insurancesService.deleteInsurance(id);
    }

}
