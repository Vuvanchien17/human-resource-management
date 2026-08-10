import { Module } from '@nestjs/common';
import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaves } from './entities/leaves.entity';
import { LEAVE_SERVICE } from '@/common/constants/auth.const';

@Module({
  imports: [TypeOrmModule.forFeature([Leaves])],
  controllers: [LeavesController],
  providers: [{
    provide: LEAVE_SERVICE,
    useClass: LeavesService
  }],
  exports: [LEAVE_SERVICE]
})
export class LeavesModule { }
