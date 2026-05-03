import { Server } from "socket.io";
export const socketConfig = {
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
    }
}

export default new Server();