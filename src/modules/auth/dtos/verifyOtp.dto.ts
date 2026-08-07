import { IsNotEmpty, IsString, Length } from "class-validator";
import { CreateOtpDto } from "./createOtp.dto";

export class VerifyOtpDto extends CreateOtpDto {
    @IsNotEmpty()
    @IsString()
    @Length(6)
    otp: string
}