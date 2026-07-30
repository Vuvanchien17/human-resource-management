
import { UsersService } from '@/modules/users/users.service';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokens } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { IJwtPayload, ISignInResponse } from '@/common/types/auth.type';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { IAuthService } from '@/interfaces/auth.interface';


@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRedis()
        private readonly redis: Redis,
        @InjectRepository(RefreshTokens)
        private readonly refreshTokenRepo: Repository<RefreshTokens>
    ) { }


    async signIn(dto: SignInDto): Promise<ISignInResponse> {
        const user = await this.usersService.findOneByEmail(dto.email);
        console.log("user :", user);
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
                    const redisKey = `blacklist:${token}`;
                    await this.redis.set(redisKey, 'true', 'EX', ttl);
                }
            }
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
