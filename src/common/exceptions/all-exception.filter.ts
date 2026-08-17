import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from "express";
import { DEFAULT_MESSAGE } from "../constants/auth.const";

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    private readonly logger = new Logger(CatchEverythingFilter.name)
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
    ) { }
    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        // const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

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

        if (!(exception instanceof HttpException)) {
            this.logger.error(`[${request.method}] ${request.url} - Status: ${httpStatus}`)
        } else {
            this.logger.warn(
                `[${request.method}] ${request.url} - Status: ${httpStatus} - Message: ${JSON.stringify(HttpMessage)}`,
            );
        }

        const responseBody = {
            statusCode: httpStatus,
            message: HttpMessage,
            path: httpAdapter.getRequestUrl(ctx.getRequest<Request>()) as string,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

}