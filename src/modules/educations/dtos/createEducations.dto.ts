import { Degree } from "@/common/enum/degree.enum";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEducationsDto {
    @IsNotEmpty()
    @IsString()
    schoolName: string

    @IsNotEmpty()
    @IsString()
    fieldStudy: string

    @IsNotEmpty()
    @IsString()
    degree: Degree

    @IsNotEmpty()
    @IsNumber()
    startYear: number

    @IsNotEmpty()
    @IsNumber()
    endYear: number
}