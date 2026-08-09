import { LEAVE_SERVICE } from '@/common/constants/auth.const';
import { ILeavesService } from '@/interfaces/leaves.interface';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateLeaveDto } from './dtos/createLeave.dto';
import { Leaves } from './entities/leaves.entity';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { CurrentUser } from '@/decorators/currentUser.decorator';
import { IUserInRequest } from '@/common/types/user.type';
import { Roles } from '@/decorators/roles.decorator';
import { UserRole } from '@/common/enum/role.enum';
import { HandleLeaveDto } from './dtos/handleLeave.dto';
import { GetLeavesFilterDto } from './dtos/getLeavesFilter.dto';
import { IPaginatedResponse } from '@/common/types/response.type';
import { UpdateLeaveDto } from './dtos/updateLeave.dto';

@Controller('leaves')
export class LeavesController {
    constructor(
        @Inject(LEAVE_SERVICE)
        private readonly leavesService: ILeavesService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Create new leave success')
    @Post()
    async createLeave(@Body() dto: CreateLeaveDto, @CurrentUser() currentUser: IUserInRequest): Promise<Leaves> {
        return await this.leavesService.createLeave(dto, currentUser.employeeId);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @ResponseMessage('Leave handled succes')
    @Patch(':id/handle')
    async handleLeave(@Body() dto: HandleLeaveDto, @CurrentUser() currentUser: IUserInRequest, @Param('id', ParseIntPipe) id: number): Promise<Leaves> {
        return await this.leavesService.handleLeave(dto, currentUser.employeeId, id);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @ResponseMessage('Get list leaves success')
    @Get()
    async getLeavesByStatus(@Query() filterDto: GetLeavesFilterDto): Promise<IPaginatedResponse<Leaves>> {
        return await this.leavesService.getLeavesByStatus(filterDto);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @ResponseMessage('Get leave success')
    @Get(':id')
    async getLeaveById(@Param('id', ParseIntPipe) id: number): Promise<Leaves> {
        return await this.leavesService.getLeaveById(id);
    }

    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Update leave success')
    @Patch(':id')
    async updateLeave(@Body() dto: UpdateLeaveDto, @Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: IUserInRequest): Promise<Leaves> {
        return await this.leavesService.updateLeave(dto, id, currentUser);
    }

    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Delete leave success')
    @Delete(':id')
    async deleteLeave(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: IUserInRequest): Promise<void> {
        return await this.leavesService.deleteLeave(id, currentUser);
    }


}
