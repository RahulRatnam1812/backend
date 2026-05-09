import { NextFunction, Request, Response } from "express";
import { customResponse } from "../types/ResponseType";
import { ENV } from "../config/env.config";

export const defaultError: any = {
	toJSON: () => {
		return {};
	},
}
export const customResponseHandler = (req: Request | any, res: customResponse|any,next:NextFunction) => {
    res.successResponse = (message:string,data:any) => {
        return res.status(200).json({
            success: true,
            status: 'success',
            message,
            data
        });
    }

    res.errorResponse = (message:string,error:any, status:number = 500) => {
        console.log("error.......",error)
        return res.status(status).json({
            success: false,
            status: 'failed',
            message,
            data: null
        })
    }
      next();

}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: "failed",
        success: false,
        message: "Route not found",
    });
    next()
};


export function routeErrors(err: Error, req: Request, res: Response, next: NextFunction) {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let errorMessage = 'Internal Server Error'

	if (ENV.nodeEnv == "development") {
		errorMessage = err.message || 'Internal Server Error';
	}
	res.status(statusCode).json({
		status: "failed",
		success: false,
		message: errorMessage,
	});
}
