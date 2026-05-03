import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../config/validation.config';
import { validateCreateUser } from '../validations/auth.validation';

export const authRoute = express.Router();

authRoute.post('/login', AuthController.login);
authRoute.post('/refresh-token', AuthController.refreshToken)
authRoute.post('/create-user', validate(validateCreateUser), AuthController.createAccount)
authRoute.post('/forgot-password', AuthController.forgotPassword)