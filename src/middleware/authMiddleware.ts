//auth.m
import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/app.config';



export default async function authMiddleware(req: Request, res: Response | any, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  try {
    if (!token) {
      console.log('10');
    return res.errorResponse("Access Denied.", null, 401);
    }

    const verify = jwt.verify(token, JWT_SECRET_KEY);
    if (!verify) {
      return res.errorResponse("Invalid Authorization", null, 401);
    }

    next();
  } catch (error) {
    console.log('middle error', error);
    return res.errorResponse("Invalid Authorization", null, 401);
  }
};

