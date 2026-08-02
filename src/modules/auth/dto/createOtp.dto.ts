import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateOtpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
}