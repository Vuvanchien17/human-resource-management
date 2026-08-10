import { PartialType } from "@nestjs/mapped-types";
import { CreateEmployeesDto } from "./createEmployees.dto";
import { Gender } from "@/common/enum/gender.enum";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateEmployeeDto extends PartialType(CreateEmployeesDto) {
    @IsOptional()
    @IsString()
    @MaxLength(11)
    @MinLength(1)
    phone?: string

    @IsOptional()
    @IsString()
    gender?: Gender


    @IsOptional()
    @IsString()
    address?: string


    @IsOptional()
    @IsString()
    idCard?: string
}