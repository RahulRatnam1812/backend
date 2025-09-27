import { NextFunction, Request, Response } from "express";
import { customResponse } from "../types/ResponseType";

export const customResponseHandler = (req: Request | any, res: customResponse|any,next:NextFunction) => {
    res.successResponse = (message:string,data:any) => {
        return res.status(200).json({
            message:message,
            status:'success',
            success:true,
            data:data
        });
    }

    res.errorResponse = (status:number,message:string,error:any) => {
        console.log("error",error)
        return res.status(status).json({
            message:message,
            status:'failed',
            success:false
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
