import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateEducationsDto } from './dtos/createEducations.dto';
import { Educations } from './entities/educations.entity';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { EDUCATION_SERVICE } from '@/common/constants/auth.const';
import { IEducationsService } from '@/interfaces/education.interface';
import { Roles } from '@/decorators/roles.decorator';
import { UserRole } from '@/common/enum/role.enum';
import { IsEmployeeOwnerGuard } from '@/guards/isEmployeeOwner.guard';
import { UpdateEducationDto } from './dtos/updateEducation.dto';
import { CurrentUser } from '@/decorators/currentUser.decorator';
import { IUserInRequest } from '@/common/types/user.type';

@Controller()
export class EducationsController {
    constructor(
        @Inject(EDUCATION_SERVICE)
        private readonly educationService: IEducationsService
    ) { }

    @UseGuards(IsEmployeeOwnerGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('employees/:id/educations')
    @ResponseMessage('Create new education success')
    async createEducation(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateEducationsDto): Promise<Educations> {
        return await this.educationService.createEducation(dto, id);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('educations/:id')
    @ResponseMessage('Update ecudation success')
    async updateEducation(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEducationDto, @CurrentUser() currentUser: IUserInRequest): Promise<Educations> {
        return await this.educationService.updateEducation(dto, id, currentUser);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('educations/:id')
    @ResponseMessage('Delete ecudation success')
    async deleteEducation(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: IUserInRequest): Promise<void> {
        return await this.educationService.deleteEducation(id, currentUser);
    }
}
