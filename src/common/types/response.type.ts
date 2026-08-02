export interface CommonResponse<T> {
    statusCode: number,
    message: string,
    data?: T
}

