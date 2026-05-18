import express from 'express';
import { AuthController } from '../controllers/AuthController';
import authMiddleware from '../middleware/authMiddleware';

export const authRoute = express.Router();

authRoute.post('/login',AuthController.login)
authRoute.post('/refresh-token',AuthController.refreshToken)
authRoute.post('/create-user',AuthController.createAccount)
authRoute.post('/forgot-password',AuthController.forgotPassword)
authRoute.post('/verify-email',AuthController.verifyEmail)
authRoute.put('/update-password', authMiddleware, AuthController.updatePassword);