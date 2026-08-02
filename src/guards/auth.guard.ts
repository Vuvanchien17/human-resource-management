import { IJwtPayload } from "@/common/types/auth.type";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import { UsersService } from '../modules/users/users.service';
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "@/common/constants/auth.const";
import Redis from "ioredis";
import { InjectRedis } from "@nestjs-modules/ioredis";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly reflector: Reflector,
        @InjectRedis()
        private readonly redis: Redis,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException("Unverified account");

        const blacklistKey = `blacklist:${token}`;
        const isBlacklisted = await this.redis.get(blacklistKey);
        if (isBlacklisted) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync<IJwtPayload>(token);
            const currentUser = await this.usersService.findOneById(payload.sub);
            request['user'] = { id: currentUser?.id, role: currentUser?.role };
        } catch (error) {
            throw new UnauthorizedException("Unverified account");
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}