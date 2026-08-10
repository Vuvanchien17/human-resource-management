import { Module } from '@nestjs/common';
import { EducationsController } from './educations.controller';
import { EducationsService } from './educations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Educations } from './entities/educations.entity';
import { EDUCATION_SERVICE } from '@/common/constants/auth.const';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [TypeOrmModule.forFeature([Educations]), EmployeesModule],
  controllers: [EducationsController],
  providers: [{
    provide: EDUCATION_SERVICE,
    useClass: EducationsService
  }],
  exports: [EDUCATION_SERVICE]
})
export class EducationsModule { }
