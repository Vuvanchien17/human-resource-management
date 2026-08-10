import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateDepartmentsDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string
}