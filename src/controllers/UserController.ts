import { Request, Response } from "express";
import User from "../models/user";


export class UserController {
    public static async getAllUsers(req: Request, res: Response | any): Promise<any> {
        try {
            const data = await User.findAll({
                attributes: { include: ['id', 'uniqueId', 'firstName', 'lastName', 'username', 'email'] }
            });
            return res.successResponse('User response successful.', data);
        } catch (error) {
            return res.errorResponse("something went wrong.", error);

        }
    }

    public static async getUser(req: Request, res: Response | any): Promise<any> {
        try {
            const id = req.params.id
            const data = await User.findOne({
                where: { id },
                attributes: ['id', 'uniqueId', 'firstName', 'lastName', 'username', 'email']
            });
            return res.successResponse('User data retrieved successfully.', data);
        } catch (error) {
            return res.errorResponse("Something went wrong.", error, 500);
        }
    }
}