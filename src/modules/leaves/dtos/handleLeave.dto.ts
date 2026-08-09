import { LeaveStatus, LeaveType } from "@/common/enum/leave.enum";
import { IsNotEmpty, IsString } from "class-validator";

export class HandleLeaveDto {
    @IsNotEmpty()
    @IsString()
    status: LeaveStatus

    @IsNotEmpty()
    @IsString()
    type: LeaveType
}