import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { Public } from '@/decorators/isPublic.decorator';
import { LoginToken } from './models/auth.model';
import { Cookies } from '@/decorators/cookies.decorator';
import { AUTH_SERVICE } from '@/common/constants/auth.const';
import { IAuthService } from '@/interfaces/auth.interface';
import { ExtractToken } from '@/decorators/token.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authService: IAuthService
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response): Promise<LoginToken> {
        const { token, refreshToken } = await this.authService.signIn(dto);
        res.cookie('refresh-token', refreshToken, {
            httpOnly: true,
        });
        return { token };
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async signOut(
        @Cookies('refresh-token') refreshToken: string,
        @Res({ passthrough: true }) res: Response,
        @ExtractToken() token: string,
    ): Promise<{ message: string }> {
        await this.authService.signOut(refreshToken, token);
        res.clearCookie('refresh-token', {
            sameSite: 'strict',
            httpOnly: true
        });

        return { message: "Logout success" }
    }
}
