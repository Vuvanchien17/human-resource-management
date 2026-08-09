import { ATTENDANCE_SERVICE } from '@/common/constants/auth.const';
import { Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { IAttendancesService } from './../../interfaces/attendances.interface';
import { Attendances } from './entities/attendances.entity';
import { CurrentUser } from '@/decorators/currentUser.decorator';
import { IUserInRequest } from '@/common/types/user.type';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { IMetaResponse, IPaginatedResponse } from '@/common/types/response.type';
import { GetAttendancesFilterDto } from './dtos/filter.dto';
import { Roles } from '@/decorators/roles.decorator';
import { UserRole } from '@/common/enum/role.enum';


@Controller()
export class AttendancesController {
    constructor(
        @Inject(ATTENDANCE_SERVICE)
        private readonly attendancesService: IAttendancesService
    ) { }

    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Check-in success')
    @Post('attendances/check-in')
    async checkIn(@CurrentUser() currentUser: IUserInRequest): Promise<Attendances> {
        return await this.attendancesService.checkIn(currentUser.employeeId);
    }

    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Check-out success')
    @Patch('attendances/check-out')
    async checkOut(@CurrentUser() currentUser: IUserInRequest): Promise<Attendances> {
        return await this.attendancesService.checkOut(currentUser.employeeId);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @Get('employees/:id/attendances')
    @ResponseMessage('Get list attendances success')
    async getAttendancesByEmployeeId(@Param('id', ParseIntPipe) id: number, @Query() filterDto: GetAttendancesFilterDto): Promise<Attendances[]> {
        return await this.attendancesService.getAttendancesByEmployeeId(id, filterDto);
    }
}
