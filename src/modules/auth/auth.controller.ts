import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, Res, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { Public } from '@/decorators/isPublic.decorator';
import { LoginToken } from './models/auth.model';
import { Cookies } from '@/decorators/cookies.decorator';
import { AUTH_SERVICE } from '@/common/constants/auth.const';
import { IAuthService } from '@/interfaces/auth.interface';
import { ExtractToken } from '@/decorators/token.decorator';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { CurrentUser } from '@/decorators/currentUser.decorator';
import { IUserInRequest } from '@/common/types/user.type';
import { ResponseMessage } from '@/decorators/responseMessage.decorator';
import { CreateOtpDto } from './dto/createOtp.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authService: IAuthService
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ResponseMessage('Login success')
    async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response): Promise<LoginToken> {
        const { token, refreshToken } = await this.authService.signIn(dto);
        res.cookie('refresh-token', refreshToken, {
            httpOnly: true,
        });
        return { token };
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    @ResponseMessage('Logout success')
    async signOut(
        @Cookies('refresh-token') refreshToken: string,
        @Res({ passthrough: true }) res: Response,
        @ExtractToken() token: string,
    ): Promise<void> {
        await this.authService.signOut(refreshToken, token);
        res.clearCookie('refresh-token', {
            sameSite: 'strict',
            httpOnly: true
        });
    }

    @HttpCode(HttpStatus.OK)
    @Patch('change-password')
    @ResponseMessage('Change password success')
    async changePassword(
        @Body() dto: ChangePasswordDto,
        @CurrentUser() curentUser: IUserInRequest,
        @ExtractToken() token: string,
        @Cookies('refresh-token') refreshToken: string
    ): Promise<void> {
        return await this.authService.changePassword(dto, curentUser, token, refreshToken);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    @ResponseMessage('Create new token success')
    async refreshAccessToken(@Cookies('refresh-token') refreshToken: string): Promise<LoginToken> {
        return await this.authService.refreshAccessToken(refreshToken);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Send OTP for user via email success')
    @Post('forgot-password')
    async forgotPassword(@Body() dto: CreateOtpDto): Promise<void> {
        return await this.authService.forgotPassword(dto.email);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Verify Otp success')
    @Post('verify-otp')
    async verifyOtp(@Body() dto: VerifyOtpDto, @Res({ passthrough: true }) res: Response): Promise<void> {
        const resetToken = await this.authService.verifyOtp(dto.otp, dto.email);
        res.cookie('reset-token', resetToken, {
            httpOnly: true,
        })
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Reset password success')
    @Patch('reset-password')
    async resetPassword(@Cookies('reset-token') resetToken: string, @Body() dto: ResetPasswordDto, @Res({ passthrough: true }) res: Response): Promise<void> {
        await this.authService.resetPassword(dto.email, dto.newPassword, resetToken);
        res.clearCookie('reset-token');
    }
}
