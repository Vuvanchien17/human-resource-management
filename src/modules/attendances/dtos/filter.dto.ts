import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class GetAttendancesFilterDto {
    @IsNotEmpty()
    @Type(() => Number)
    month: number

    @IsNotEmpty()
    @Type(() => Number)
    year: number
}