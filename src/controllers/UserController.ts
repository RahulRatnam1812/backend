import { Request, Response } from "express";
import User from "../models/user";
import argon2 from "argon2";
import passport from '../config/passport.config'
// import AuthenticationService from "../services/Auth/AuthenticationService";
import Jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { JWT_REFRESH_SECRET_KEY, JWT_SECRET_KEY } from "../config/app.config";

export class UserController {
    public static async getAllUsers(req: Request, res: Response): Promise<any> {
        try {
            const resp = await User.findAll();
            console.log("resp", resp)
            return res.status(200).json({
                data: resp,
                message: 'User response successful.'
            })
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong.' })
        }
    }
    public static async getUser(req: Request, res: Response): Promise<any> {
        try {
            const resp = await User.findAll();
            console.log("resp", resp)
            return res.status(200).json({
                data: resp,
                message: 'User response successful.'
            })
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong.' })
        }
    }
}