import { IUserInRequest } from "@/common/types/user.type";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";


export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): IUserInRequest => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request['user'] as IUserInRequest;
})