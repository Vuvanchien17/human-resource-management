import { IMetaResponse, IPaginatedResponse } from "@/common/types/response.type";
import { GetAttendancesFilterDto } from "@/modules/attendances/dtos/filter.dto";
import { Attendances } from "@/modules/attendances/entities/attendances.entity";

export interface IAttendancesService {
    checkIn(employeeId: number): Promise<Attendances>;
    checkOut(employeeId: number): Promise<Attendances>;
    getAttendancesByEmployeeId(employeeId: number, filterDto: GetAttendancesFilterDto): Promise<Attendances[]>;
}