import { IsNotEmpty, IsString, MaxLength, MinLength, IsEmail } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    email: string


    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(6)
    newPassword: string
}