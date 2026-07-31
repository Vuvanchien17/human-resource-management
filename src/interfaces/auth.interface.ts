import { ISignInResponse } from "@/common/types/auth.type";
import { IUserInRequest } from "@/common/types/user.type";
import { ChangePasswordDto } from "@/modules/auth/dto/changePassword.dto";
import { SignInDto } from "@/modules/auth/dto/signin.dto";
import { UpdateResult } from "typeorm";

export interface IAuthService {
    signIn(dto: SignInDto): Promise<ISignInResponse>;
    signOut(refreshToken: string, token: string): Promise<void>;
    changePassword(dto: ChangePasswordDto, curentUser: IUserInRequest, token: string, refreshToken: string): Promise<void>;
}
