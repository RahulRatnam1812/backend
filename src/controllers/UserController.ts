import { Request, Response } from "express";
import User from "../models/user";
import argon2 from "argon2";
import passport from '../config/passport.config'
// import AuthenticationService from "../services/Auth/AuthenticationService";
import Jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { JWT_REFRESH_SECRET_KEY, JWT_SECRET_KEY } from "../config/app.config";
// import redis from "../config/redis";

export class UserController {
    public static async getAllUsers(req: Request, res: Response | any): Promise<any> {
        try {
            const data = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            // console.log("resp", resp)
            return res.successResponse('User response successful.', data);
        } catch (error) {
            return res.errorResponse("something went wrong.", error);

        }
    }

    public static async getUser(req: Request, res: Response | any): Promise<any> {
        try {
            const id = req.params.id
            // let resp:any = await redis.get(`user:${id}`)
            // resp = resp ? JSON.parse(resp):null
            // if(!resp){
            //     resp = await User.findOne({
            //     where :{id: id}
            //     });
            //     await redis.set(`user:${id}`,JSON.stringify(resp))
            // }

            // return res.status(200).json({
            //     data: resp,
            //     message: 'User response successful.'
            // })
        } catch (error) {
            return res.errorResponse("Something went wrong.", error, 500);
        }
    }
}