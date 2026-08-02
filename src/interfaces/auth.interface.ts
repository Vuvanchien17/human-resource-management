import { ISignInResponse } from "@/common/types/auth.type";
import { IUserInRequest } from "@/common/types/user.type";
import { ChangePasswordDto } from "@/modules/auth/dto/changePassword.dto";
import { ResetPasswordDto } from "@/modules/auth/dto/resetPassword.dto";
import { SignInDto } from "@/modules/auth/dto/signin.dto";
import { LoginToken } from "@/modules/auth/models/auth.model";


export interface IAuthService {
    signIn(dto: SignInDto): Promise<ISignInResponse>;
    signOut(refreshToken: string, token: string): Promise<void>;
    changePassword(dto: ChangePasswordDto, curentUser: IUserInRequest, token: string, refreshToken: string): Promise<void>;
    refreshAccessToken(refreshToken: string): Promise<LoginToken>;
    forgotPassword(email: string): Promise<void>
    verifyOtp(otp: string, email: string): Promise<string>
    resetPassword(email: string, newPassword: string, resetToken: string): Promise<void>
}   
