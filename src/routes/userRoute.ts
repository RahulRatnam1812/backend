import express from 'express';
import { UserController } from '../controllers/UserController';
import authMiddleware from '../middleware/authMiddleware';
// import authM
export const userRoute = express.Router();
userRoute.use(authMiddleware)
userRoute.get('/all-users',UserController.getAllUsers)
userRoute.get('/user-details/:id',UserController.getUser)