import { NextFunction, Request, Response } from "express";
import { customResponse } from "../types/ResponseType";

export const customResponseHandler = (req: Request, res: customResponse,next:NextFunction) => {
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
}
