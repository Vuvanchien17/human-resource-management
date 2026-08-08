import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    level: string
}