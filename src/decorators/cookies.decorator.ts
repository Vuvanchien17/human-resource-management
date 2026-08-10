import { IRequest } from "@/common/types/auth.type";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext): Record<string, string> | string => {
    const request = ctx.switchToHttp().getRequest<IRequest>();
    const cookies = request.cookies as Record<string, string>;
    return data ? cookies?.[data] : cookies;
})

