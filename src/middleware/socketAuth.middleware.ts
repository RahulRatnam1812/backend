import { JWT_SECRET_KEY } from "../config/app.config";
import { AuthResponse } from "../types/ResponseType";
import jwt from "jsonwebtoken";

export default async (socket: any, next: any) => {
    try {
        const auth = socket.handshake.auth.Authorization || socket.handshake.headers['authorization'];
        const token = auth?.split(' ')[1];
        if (!token) {
            return next(new Error("Authentication error: Token not provided"));
        }
        const verifiedUser = jwt.verify(token, JWT_SECRET_KEY); // Implement this function to verify the token and return user data
        if (!verifiedUser) {
            return next(new Error("Authentication error: Invalid token"));
        }
        const data: AuthResponse = jwt.decode(token) as AuthResponse;
        if (data) {
            console.log("data",data)
            socket.join(data.uniqueId)
            console.log(`UserId: ${data.userId} authenticated and joined room: ${data.uniqueId}`);
        }
        next();
    } catch (error) {
        console.error("Socket authentication error:", error);
        return next(new Error("Authentication error: Invalid token"));
    }
    next();
}