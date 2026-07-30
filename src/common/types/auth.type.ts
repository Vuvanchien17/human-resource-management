import { Request } from "express";
import { IUserInRequest } from "./user.type";

export interface IJwtPayload {
    sub: number
    iat: number
    exp: number
}

export interface ICookies {
    refreshToken: string
}

export interface IRequest extends Request {
    user: IUserInRequest
}

export interface ISignInResponse {
    token: string
    refreshToken: string
}

export interface IMessage {
    message: string
}