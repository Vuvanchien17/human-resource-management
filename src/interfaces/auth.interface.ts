import { ISignInResponse } from "@/common/types/auth.type";
import { SignInDto } from "@/modules/auth/dto/auth.dto";

export interface IAuthService {
    signIn(dto: SignInDto): Promise<ISignInResponse>;
    signOut(refreshToken: string, token: string): Promise<void>;
}
