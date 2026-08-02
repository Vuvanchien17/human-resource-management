
import { UsersService } from '@/modules/users/users.service';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokens } from './entities/refresh-token.entity';
import { IsNull, Repository } from 'typeorm';
import { IJwtPayload, ISignInResponse } from '@/common/types/auth.type';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { IAuthService } from '@/interfaces/auth.interface';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { IUserInRequest } from '@/common/types/user.type';
import { LoginToken } from './models/auth.model';
import { MailerService } from '@nestjs-modules/mailer';
import otpTemplate from '@/common/utils/templateOTP';
import { DataSource } from 'typeorm';
import { Otps } from './entities/otps.entity';
import { TTL_OTP } from '@/common/constants/auth.const';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRedis()
        private readonly redis: Redis,
        @InjectRepository(RefreshTokens)
        private readonly refreshTokenRepo: Repository<RefreshTokens>,
        private readonly mailerService: MailerService,
        private readonly dataSourse: DataSource,
        @InjectRepository(Otps)
        private readonly otpsRepo: Repository<Otps>,
    ) { }


    async signIn(dto: SignInDto): Promise<ISignInResponse> {
        const user = await this.usersService.findOneByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Email or password incorrect');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Email or password incorrect');
        }

        const payload = { sub: user.id }
        const jwt = await this.jwtService.signAsync(payload);


        const refreshTokenValue = crypto.randomBytes(64).toString("hex");

        await this.refreshTokenRepo.save({
            value: refreshTokenValue,
            user: user,
            expiredAt: new Date(Date.now() + parseInt(this.configService.get<string>('auth.REFRESH_TOKEN_TTL') || '604800000'))
        })

        return { token: jwt, refreshToken: refreshTokenValue };
    }

    async signOut(refreshToken: string, token: string): Promise<void> {
        const result = await this.refreshTokenRepo.softDelete({ value: refreshToken });
        if (result.affected === 0) {
            throw new NotFoundException();
        }

        await this.blacklistTokenInRedis(token);
    }

    private async blacklistTokenInRedis(token: string): Promise<void> {
        try {
            const decoded = this.jwtService.decode<IJwtPayload>(token);
            if (decoded && decoded.exp) {
                const currentTime = Math.floor(Date.now() / 1000);
                const ttl = decoded.exp - currentTime;

                if (ttl > 0) {
                    const blacklistKey = `blacklist:${token}`;
                    await this.redis.set(blacklistKey, 'true', 'EX', ttl);
                }
            }
        } catch (error) {
            throw new InternalServerErrorException("Token invalid or expires");
        }
    }

    async changePassword(dto: ChangePasswordDto, currentUser: IUserInRequest, token: string, refreshToken: string): Promise<void> {
        const user = await this.usersService.findOneById(currentUser.id);
        if (!user) throw new NotFoundException("User not exists");

        const isPasswordMatch = await bcrypt.compare(dto.oldPassword, user.password);
        if (!isPasswordMatch) throw new BadRequestException("Old password is incorrect");

        const result = await this.refreshTokenRepo.softDelete({ value: refreshToken });
        if (result.affected === 0) {
            throw new NotFoundException("Token not exists");
        }

        await this.blacklistTokenInRedis(token);

        await this.usersService.updatePassword(currentUser.id, dto.newPassword);
    }

    async refreshAccessToken(refreshToken: string): Promise<LoginToken> {
        const refreshTokenExist = await this.refreshTokenRepo.findOne({
            where: { value: refreshToken },
            relations: {
                user: true,
            }
        });
        if (!refreshTokenExist || refreshTokenExist.expiredAt.getTime() < Date.now()) {
            throw new UnauthorizedException("Token expires or invalid")
        }

        console.log(refreshTokenExist);
        const payload = { sub: refreshTokenExist.user.id };
        const jwt = await this.jwtService.signAsync(payload);

        return { token: jwt };
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new BadRequestException("Email is incorrect");

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const queryRunner = this.dataSourse.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.update(
                Otps,
                { email: email, deletedAt: IsNull() },
                { deletedAt: new Date() }
            )

            await queryRunner.manager.save(
                Otps,
                { email, otpCode: otp, expiresAt: new Date(Date.now() + TTL_OTP * 1000), }
            )
            await queryRunner.commitTransaction();
        } catch (error) {
            console.log("Rollback");
            console.log("Error transaction:", error);
            throw error;
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        await this.sendOtpViaEmail(email, otp)

    }

    private async sendOtpViaEmail(userEmail: string, otp: string) {
        try {
            await this.mailerService.sendMail({
                to: userEmail,
                subject: 'Chào mừng bạn đến với hệ thống!',
                text: `Xin chào!`,
                html: otpTemplate(otp)
            });
        } catch (error) {
            await this.dataSourse.manager.softDelete(
                Otps,
                { email: userEmail, expiresAt: IsNull() }
            )
            throw error;
        }
    }

    async verifyOtp(otp: string, email: string): Promise<string> {
        const exists = await this.otpsRepo.findOneBy({
            email,
            otpCode: otp
        })
        if (!exists) {
            throw new BadRequestException("Otp is incorrect");
        }

        if (exists && exists.expiresAt.getTime() < Date.now()) {
            throw new BadRequestException("Otp expires")
        }

        await this.otpsRepo.softDelete({
            email,
            otpCode: otp
        })

        const resetToken = crypto.randomBytes(64).toString("hex");
        const resetTokenKey = `resetToken:${resetToken}`;
        const ttl = this.configService.get<number>('auth.RESET_TOKEN_TTL') as number / 1000;
        try {
            await this.redis.set(resetTokenKey, 'true', 'EX', ttl);
        } catch (error) {
            console.log("Error set resetToken redis:", error);
            throw error;
        }
        return resetToken;
    }

    async resetPassword(email: string, newPassword: string, resetToken: string): Promise<void> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException("User not exist");
        }

        const resetTokenKey = `resetToken:${resetToken}`
        const exist = await this.redis.get(resetTokenKey);
        if (!exist) throw new UnauthorizedException("No permission");

        await this.usersService.updatePassword(user.id, newPassword);
    }

}
