import { Type } from "class-transformer";
import { IsNotEmpty, Max, Min } from "class-validator";

export class GetAttendancesFilterDto {
    @IsNotEmpty()
    @Type(() => Number)
    @Min(1)
    @Max(12)
    month: number

    @IsNotEmpty()
    @Type(() => Number)
    year: number
}