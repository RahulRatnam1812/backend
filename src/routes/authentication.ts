import express from 'express';
import { AuthController } from '../controllers/AuthController';

export const authRoute = express.Router();

authRoute.post('/login',AuthController.login)
authRoute.post('/refresh-token',AuthController.refreshToken)
authRoute.post('/create-user',AuthController.createAccount)