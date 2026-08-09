export interface CommonResponse<T> {
    statusCode: number,
    message: string,
    data?: T
}

export interface IMetaResponse {
    total: number;
    count: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IPaginatedResponse<T> {
    data: T[];
    meta: IMetaResponse;
}
