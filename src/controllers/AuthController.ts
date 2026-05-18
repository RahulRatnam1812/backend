import { Request, Response } from "express";
import User from "../models/user";
import argon2 from "argon2";
import passport from '../config/passport.config'
// import AuthenticationService from "../services/Auth/AuthenticationService";
import Jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { EMAIL_PASS, EMAIL_USER, JWT_REFRESH_SECRET_KEY, JWT_SECRET_KEY } from "../config/app.config";
import VerificationOtp from "../models/verificationOtp";
import nodemailer from "nodemailer";

export class AuthController {
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


            // let message;
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
            res.status(500).json({ message: 'Something went wrong.' })

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

    public static async createAccount(req: Request, res: Response): Promise<any> {
        try {
            const requestData = req.body
            const { firstName, lastName, userName, password,email } = requestData
            const hashPassword = await argon2.hash(password)
            console.log("hashPassword", hashPassword)
            const response = await User.create({
                first_name: firstName,
                last_name: lastName,
                user_name: userName,
                password: hashPassword,
                email:email
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

    
    public static async forgotPassword(req: Request, res: Response | any): Promise<any> {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "User not found with this email" });
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
            await VerificationOtp.destroy({ where: { email } });
            await VerificationOtp.create({ email, otp, expires_at: expiresAt });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from:EMAIL_USER,
                to: email,
                subject: "Password Reset OTP",
                text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
            });
            return res.successResponse("OTP sent successfully");

            // return res.status(200).json({
            //     success: true,
            //     message: "OTP sent successfully",
            // });

        } catch (error) {
            console.log("error", error);
            return res.errorResponse("Something went wrong.")
            // return res.status(500).json({ message: "Something went wrong." });
        }
    }

    public static async verifyEmail(req: Request, res: Response): Promise<any> {
        try {
            const { email, otp } = req.body;
            if (!email || !otp) {
                return res.status(400).json({ message: "Email and OTP are required" });
            }
            const user = await User.findOne({ where: { email } });
            console.log("user",req.user)
            if (!user) {
                return res.status(404).json({ message: "User not found with this email" });
            }
            const record = await VerificationOtp.findOne({ where: { email, otp } })
            if (!record) {
                return res.status(400).json({ message: "Invalid OTP" })
            }
            if (record.expires_at < new Date()) {
                return res.status(400).json({ message: "OTP expired" });
            }
            await VerificationOtp.destroy({ where: { email, otp } });
                const parameter = {
                userId: user?.id
            }

            const accessToken = Jwt.sign(parameter, JWT_SECRET_KEY, { expiresIn: '1D' })
            const refreshToken = Jwt.sign(parameter, JWT_REFRESH_SECRET_KEY, { expiresIn: '1s' })
            const loginResponse = {
                id: user?.id,
                email: user?.email,
                user_name: user?.user_name
            }
            return res.status(200).json({
                success: true,
                message: "Email verified successfully",
                token:{
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            console.log("error", error);
            return res.status(500).json({ message: "Something went wrong." });
        }
    }

    public static async updatePassword(req: Request, res: Response): Promise<any> {
        try {
            const { newPassword, confirmPassword } = req.body;
            if (!newPassword || !confirmPassword) {
                return res.status(400).json({ message: "confirmPassword and newPassword  are required" });
            }
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }
            // const userId :any= req.user?.req.user;
            // const userId = (req.user as any)?.id;
            console.log("req.user", req.user);

            const userId = (req.user as any)?.userId;
            if (!userId) {
                return res.status(400).json({ message: "unauthorized." })
            }
            const hashedPassword = await argon2.hash(newPassword);
            console.log("hashedPassword",hashedPassword)
            await User.update(
                { password: hashedPassword },
                { where: { id: userId } }
            );
            return res.status(200).json({
                success: true,
                message: "Updated password successfully",
            })
        } catch (error) {
            console.log("error", error);
            return res.status(500).json({ message: "Something went wrong." });
        }
    }
}