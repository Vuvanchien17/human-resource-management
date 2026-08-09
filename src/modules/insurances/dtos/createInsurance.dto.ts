import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsSemVer, IsString, Length, Max, MaxLength } from "class-validator";


export class CreateInsuranceDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    code: string

    @IsNotEmpty()
    @IsNumber()
    insuranceSalary: number

    @IsNotEmpty()
    @Type(() => Date)
    startDate: Date
}