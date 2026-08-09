import { Module } from '@nestjs/common';
import { AttendancesController } from './attendances.controller';
import { AttendancesService } from './attendances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendances } from './entities/attendances.entity';
import { ATTENDANCE_SERVICE } from '@/common/constants/auth.const';
import { Employees } from '../employees/entities/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendances, Employees])],
  controllers: [AttendancesController],
  providers: [{
    provide: ATTENDANCE_SERVICE,
    useClass: AttendancesService
  }],
  exports: [ATTENDANCE_SERVICE]
})
export class AttendancesModule { }
