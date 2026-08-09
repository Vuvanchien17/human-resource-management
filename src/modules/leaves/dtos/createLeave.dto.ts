import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateLeaveDto {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    startDate: Date

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    endDate: Date

    @IsNotEmpty()
    @IsString()
    reason: string
}