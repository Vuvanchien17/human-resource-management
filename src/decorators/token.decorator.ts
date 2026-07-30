import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ExtractToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const authorization = request.headers.authorization;
        if (!authorization) {
            return undefined;
        }
        const [type, token] = authorization.split(' ');
        if (type === 'Bearer' && token) {
            return token;
        }
        return undefined;
    },
);