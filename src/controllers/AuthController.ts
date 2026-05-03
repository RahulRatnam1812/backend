import { Request, Response } from "express";
import User from "../models/user";
import argon2 from "argon2";
import passport from '../config/passport.config'
// import AuthenticationService from "../services/Auth/AuthenticationService";
import Jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { JWT_REFRESH_SECRET_KEY, JWT_SECRET_KEY } from "../config/app.config";
import { AuthResponse } from "../types/ResponseType";

export class AuthController {
    public static async login(req: Request, res: Response | any): Promise<any> {
        try {
            const { username, password } = req.body

            // const authentication = new AuthenticationService()
            // authentication.loginUser(username,password)
            passport.authenticate('local', { session: false }, (user: User, err: any, info: any) => {
                if (!user) {
                    return res.status(403).json({ message: info?.message || 'Invalid credentials' });
                }

                if (err) {
                    return res.errorResponse({ message: 'Server error', error: err });
                }
                const parameter: AuthResponse = {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uniqueId: user.uniqueId,
                }
                const token = Jwt.sign(parameter, JWT_SECRET_KEY, { expiresIn: '1D' })
                const refreshToken = Jwt.sign(parameter, JWT_REFRESH_SECRET_KEY, { expiresIn: '7D' })
                return res.succesResponse({
                    message: info?.message || 'Login successful',
                    token: {
                        accessToken: token,
                        refreshToken: refreshToken
                    }
                });
            })(req, res);


        } catch (error) {
            console.log("error", error)
            res.errorResponse({ message: 'Something went wrong.' })

        }
    }

    public static async refreshToken(req: Request, res: Response | any): Promise<any> {
        try {
            const { refreshToken } = req.body

            const decoded = Jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY) as { userId: string }

            const userId = decoded.userId

            const parameter = {
                userId: userId
            }

            const accessToken = Jwt.sign(parameter, JWT_SECRET_KEY, { expiresIn: '1D' })
            const newRefreshToken = Jwt.sign(parameter, JWT_REFRESH_SECRET_KEY, { expiresIn: '1s' })
            return res.succesResponse({
                message: 'Success',
                token: {
                    accessToken: accessToken,
                    refreshToken: newRefreshToken
                }
            });
        } catch (error: any) {
            console.log("error", error)
            if (error instanceof TokenExpiredError) {
                return res.status(401).json({ message: 'Refresh token expired.' })
            }
            if (error instanceof JsonWebTokenError) {
                return res.status(401).json({ message: 'Invalid Refresh token.' })
            }
        }
    }

    public static async createAccount(req: Request, res: Response | any): Promise<any> {
        try {
            const requestData = req.body
            const { firstName, lastName, username, password, email } = requestData
            const hashPassword = await argon2.hash(password);
            await User.create({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: hashPassword,
                email: email
            })
            res.succesResponse({
                success: true,
                message: 'User created successfully.'
            })

        } catch (error) {
            console.log("error", error)
            res.errorResponse({ message: 'Something went wrong.' })
        }
    }

    public static async forgotPassword(req: Request, res: Response | any): Promise<any> {
        try {
            const requestData = req.body;
            const user = await User.findOne({ where: { email: requestData.email } })
            if (!user) {
                return res.errorResponse('User not found with this email.' , null, 404);
            }
            await user.update({ password: await argon2.hash(requestData.password) });
            
            res.succesResponse({
                success: true,
                message: 'Password updated successfully.'
            })

        } catch (error) {
            console.log("error", error)
            res.errorResponse({ message: 'Something went wrong while updating password.' })
        }
    }
}