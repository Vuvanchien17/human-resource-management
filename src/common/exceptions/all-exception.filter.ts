import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from "express";
import { DEFAULT_MESSAGE } from "../constants/auth.const";
import { IMessage } from "../types/auth.type";

@Catch(HttpException)
export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const res = exception instanceof HttpException ? exception.getResponse() : null;

        const HttpMessage = typeof res === 'object' && res !== null && 'message' in res
            ? (res as { message: string | string[] }).message
            : typeof res === 'string'
                ? res
                : DEFAULT_MESSAGE;

        const responseBody = {
            statusCode: httpStatus,
            message: HttpMessage,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest<Request>()) as string,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

}