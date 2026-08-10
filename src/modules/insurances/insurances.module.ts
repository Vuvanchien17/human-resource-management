import { Module } from '@nestjs/common';
import { InsurancesController } from './insurances.controller';
import { InsurancesService } from './insurances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurances } from './entities/insurances.entity';
import { INSURANCE_SERVICE } from '@/common/constants/auth.const';
import { Employees } from '../employees/entities/employees.entity';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [TypeOrmModule.forFeature([Insurances, Employees]), EmployeesModule],
  controllers: [InsurancesController],
  providers: [{
    provide: INSURANCE_SERVICE,
    useClass: InsurancesService
  }],
  exports: [INSURANCE_SERVICE]
})
export class InsurancesModule { }
