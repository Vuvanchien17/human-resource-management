import { IJwtPayload } from "@/common/types/auth.type";
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import { UsersService } from '../modules/users/users.service';
import { Reflector } from "@nestjs/core";
import { EMPLOYEE_SERVICE, IS_PUBLIC_KEY } from "@/common/constants/auth.const";
import Redis from "ioredis";
import { InjectRedis } from "@nestjs-modules/ioredis";
import { Users } from "@/modules/users/entities/users.entity";
import { IEmployeesService } from "@/interfaces/employees.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        @Inject(EMPLOYEE_SERVICE)
        private readonly employeeService: IEmployeesService,
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
            const currentUser = await this.usersService.findOneById(payload.sub) as Users;
            const currentEmployee = await this.employeeService.findOneByUserId(currentUser.id);
            request['user'] = { id: currentUser?.id, role: currentUser?.role, employeeId: currentEmployee.id };
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