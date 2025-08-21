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

    public static async createAccount(req: Request, res: Response): Promise<any> {
        try {
            const requestData = req.body
            const { firstName, lastName, userName, password } = requestData
            const hashPassword = await argon2.hash(password)
            console.log("hashPassword", hashPassword)
            const response = await User.create({
                first_name: firstName,
                last_name: lastName,
                user_name: userName,
                password: hashPassword
            })
            res.status(200).json({
                success: true,
                message: 'User created successfully.'
            })

        } catch (error) {
            console.log("error", error)
            res.status(500).json({ message: 'Something went wrong.' })
        }
    }

    public static async login(req: Request, res: Response): Promise<any> {
        try {
            const { userName, password } = req.body

            // const authentication = new AuthenticationService()
            // authentication.loginUser(userName,password)
            passport.authenticate('local', { session: false }, (user: User, err: any, info: any) => {
                if (!user) {
                    return res.status(403).json({ message: info?.message || 'Invalid credentials' });
                }

                if (err) {
                    return res.status(500).json({ message: 'Server error', error: err });
                }
                const parameter = {
                    userId: user.id
                }
                const token = Jwt.sign(parameter, JWT_SECRET_KEY, { expiresIn: '1D' })
                const refreshToken = Jwt.sign(parameter, JWT_REFRESH_SECRET_KEY, { expiresIn: '7D' })
                return res.status(200).json({
                    message: info?.message || 'Login successful',
                    token: {
                        accessToken: token,
                        refreshToken: refreshToken
                    }
                });
            })(req, res);


            let message;
            // if(response){
            //     res.status(200).json({
            //         message:'User logged in successfully.'
            //     })
            // } else{
            //     res.status(403).json({
            //         message:'Invalid username or password.'
            //     })
            // }


        } catch (error) {
            console.log("error", error)
        }
    }

    public static async refreshToken(req: Request, res: Response): Promise<any> {
        try {
            const { refreshToken } = req.body

                const decoded = Jwt.verify(refreshToken,JWT_REFRESH_SECRET_KEY) as {userId:string}

                const userId = decoded.userId

                const parameter = {
                    userId:userId
                }

                const accessToken = Jwt.sign(parameter, JWT_SECRET_KEY, { expiresIn: '1D' })
                const newRefreshToken = Jwt.sign(parameter, JWT_REFRESH_SECRET_KEY, { expiresIn: '1s' })
                return res.status(200).json({
                    message: 'Success',
                    token: {
                        accessToken: accessToken,
                        refreshToken: newRefreshToken
                    }
                });
        } catch (error:any) {
            console.log("error", error)
            if (error instanceof TokenExpiredError){
                return res.status(401).json({message: 'Refresh token expired.'})
            }
            if(error instanceof JsonWebTokenError){
                return res.status(401).json({message: 'Invalid Refresh token.'})
            }
        }
    }
}