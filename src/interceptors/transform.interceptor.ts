import { RESPONSE_MESSGAE } from '@/common/constants/auth.const';
import { CommonResponse } from '@/common/types/response.type';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, CommonResponse<T>> {
    constructor(private readonly reflector: Reflector) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResponse<T>> {
        const message = this.reflector.get<string>(RESPONSE_MESSGAE, context.getHandler());

        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = response.statusCode;
        return next.handle().pipe(map((data: T) => ({
            statusCode, message, data
        })))
    }
}