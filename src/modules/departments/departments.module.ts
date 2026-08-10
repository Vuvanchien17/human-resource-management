import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departments } from './entities/departments.entity';
import { DepartmentsController } from './departments.controller';
import { DEPARTMENT_SERVICE } from '@/common/constants/auth.const';

@Module({
  imports: [TypeOrmModule.forFeature([Departments])],
  controllers: [DepartmentsController],
  providers: [{
    provide: DEPARTMENT_SERVICE,
    useClass: DepartmentsService
  }],
  exports: [DEPARTMENT_SERVICE]

})
export class DepartmentsModule { }
