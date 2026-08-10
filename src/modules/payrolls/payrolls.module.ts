import { Module } from '@nestjs/common';
import { PayrollsController } from './payrolls.controller';
import { PayrollsService } from './payrolls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payrolls } from './entities/payrolls.entity';
import { PAYROLL_SERVICE } from '@/common/constants/auth.const';

@Module({
  imports: [TypeOrmModule.forFeature([Payrolls])],
  controllers: [PayrollsController],
  providers: [{
    provide: PAYROLL_SERVICE,
    useClass: PayrollsService
  }],
  exports: [PAYROLL_SERVICE]
})
export class PayrollsModule { }
