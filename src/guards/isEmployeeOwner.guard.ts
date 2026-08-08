
import { UserRole } from '@/common/enum/role.enum';
import { IUserInRequest } from '@/common/types/user.type';
import { Users } from '@/modules/users/entities/users.entity';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsEmployeeOwnerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request['user'] as IUserInRequest;
        const employeeIdFromParam = request.params.id;

        if (user.employeeId !== Number(employeeIdFromParam) && user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('You do not have permission');
        }

        return true;
    }
}