import { SKILL_SERVICE } from '@/common/constants/auth.const';
import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ISkillsService } from '@/interfaces/skills.interface';
import { CreateSkillDto } from './dtos/createSkill.dto';
import { Skills } from './entities/skills.entity';
import { IsEmployeeOwnerGuard } from '@/guards/isEmployeeOwner.guard';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { UpdateSkillDto } from './dtos/updateSkill.dto';
import { CurrentUser } from '@/decorators/currentUser.decorator';
import { IUserInRequest } from '@/common/types/user.type';

@Controller()
export class SkillsController {
    constructor(
        @Inject(SKILL_SERVICE)
        private readonly skillService: ISkillsService
    ) { }

    @UseGuards(IsEmployeeOwnerGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('employees/:id/skills')
    @ResponseMessage('Create new skill success')
    async createSkill(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateSkillDto): Promise<Skills> {
        return await this.skillService.createSkill(dto, id);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('skills/:id')
    @ResponseMessage('Update skill success')
    async updateEducation(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSkillDto, @CurrentUser() currentUser: IUserInRequest): Promise<Skills> {
        return await this.skillService.updateSkill(dto, id, currentUser);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('skills/:id')
    @ResponseMessage('Delete skill success')
    async deleteEducation(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: IUserInRequest): Promise<void> {
        return await this.skillService.deleteSkill(id, currentUser);
    }
}
