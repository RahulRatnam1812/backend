import {Response} from 'express'
export interface customResponse extends Response{
    successResponse(message:string,data:any):this
    errorResponse(status: number, message: string, error?: any): this;
}