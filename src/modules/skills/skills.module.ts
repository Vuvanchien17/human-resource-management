import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from './entities/skills.entity';
import { SKILL_SERVICE } from '@/common/constants/auth.const';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skills]), EmployeesModule],
  controllers: [SkillsController],
  providers: [{
    provide: SKILL_SERVICE,
    useClass: SkillsService
  }],
  exports: [SKILL_SERVICE]
})
export class SkillsModule { }
