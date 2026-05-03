import { Server } from "http"

export const socketConfig = {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
}

export default new Server()