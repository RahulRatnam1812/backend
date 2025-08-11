import express from 'express';
import { UserController } from '../controllers/UserController';

export const userRoute = express.Router();

userRoute.get('/all-users',UserController.getAllUsers)
userRoute.post('/create-user',UserController.createAccount)
userRoute.post('/login',UserController.login)