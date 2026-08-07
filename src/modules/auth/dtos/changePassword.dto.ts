import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class ChangePasswordDto {
    @IsNotEmpty()
    oldPassword: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(6)
    newPassword: string
}