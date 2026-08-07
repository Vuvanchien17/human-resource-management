import { UserRole } from "@/common/enum/role.enum";
import { ResetPasswordDto } from "@/modules/auth/dtos/resetPassword.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEmployeesDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(6)
    password: string

    @IsNotEmpty()
    @IsString()
    role: UserRole

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    fullName: string

    @IsNotEmpty()
    @IsString()
    position: string

    @IsNotEmpty()
    @IsNumber()
    salary: number

    @IsNotEmpty()
    @IsNumber()
    departmentId: number
}


export class EmployeeResponse {

    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    code: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    fullName: string

    @IsNotEmpty()
    @IsString()
    position: string

    @IsNotEmpty()
    @IsString()
    department: string
}