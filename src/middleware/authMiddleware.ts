//auth.m
import { Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/app.config';

export default async (req: Request, res: any, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]
  try {
    if (!token) {
      return res.errorResponse(401, "Access Denied.")
    }
    const verify = jwt.verify(token, JWT_SECRET_KEY)
    
    if (!verify) {
      return res.errorResponse(401,"Invalid Authorization")
    }

    const jwtData = jwt.decode(token)

    const user = jwtData
    //   req.user = jwtData
    next()
  } catch (error) {
    console.log("middle error", error)
  }
};

