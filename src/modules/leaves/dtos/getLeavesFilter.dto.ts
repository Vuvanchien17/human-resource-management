import { LeaveStatus } from "@/common/enum/leave.enum";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class GetLeavesFilterDto {
    @IsOptional()
    status: LeaveStatus

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 10;
}