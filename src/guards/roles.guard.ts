import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";
import { IUserInRequest } from "@/common/types/user.type";
import { IRequest } from "@/common/types/auth.type";
import { UserRole } from "@/common/enum/role.enum";
import { ROLES_KEY } from "@/common/constants/auth.const";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        if (!requiredRoles) return true;
        const request = context.switchToHttp().getRequest<IRequest>();
        const user: IUserInRequest = request.user;

        return this.matchRoles(requiredRoles, user.role);
    }

    private matchRoles(roles: string[], role: string): boolean {
        return roles.includes(role);
    }
}