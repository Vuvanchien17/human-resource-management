import { IPaginatedResponse } from "@/common/types/response.type";
import { IUserInRequest } from "@/common/types/user.type";
import { CreateLeaveDto } from "@/modules/leaves/dtos/createLeave.dto";
import { GetLeavesFilterDto } from "@/modules/leaves/dtos/getLeavesFilter.dto";
import { HandleLeaveDto } from "@/modules/leaves/dtos/handleLeave.dto";
import { UpdateLeaveDto } from "@/modules/leaves/dtos/updateLeave.dto";
import { Leaves } from "@/modules/leaves/entities/leaves.entity";

export interface ILeavesService {
    createLeave(dto: CreateLeaveDto, employeeId: number): Promise<Leaves>;
    handleLeave(dto: HandleLeaveDto, approvedBy: number, leaveId: number): Promise<Leaves>;
    getLeavesByStatus(filterDto: GetLeavesFilterDto): Promise<IPaginatedResponse<Leaves>>
    getLeaveById(id: number): Promise<Leaves>;
    updateLeave(dto: UpdateLeaveDto, id: number, currentUser: IUserInRequest): Promise<Leaves>
    deleteLeave(id: number, currentUser: IUserInRequest): Promise<void>
}