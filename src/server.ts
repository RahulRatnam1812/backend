import http from "node:http";
import { PORT } from "./config/app.config";
import database from "./models/index";
import { app } from "./app";
import socketIo, { socketConfig}  from "./config/socket.config";
import socketAuthMiddleware from "./middleware/socketAuth.middleware";
import { Socket } from "socket.io";
// import socket
const server = http.createServer(app);

socketIo.attach(server, socketConfig);
socketIo.use(socketAuthMiddleware);
const start = async (): Promise<void> => {
  try {

    await database.sync({ force: false });

    server.listen(PORT, () => {
      // console.timeEnd("serverStart")
      console.log(`🚀 Server is running on http://localhost:${PORT}`);

    });

    socketIo.on("connection", (socket: Socket) => {
      console.log("A user connected with socket id:", socket.id);
      socket.on("message",(data)=>{
        console.log("Received message from client:", data);
        socket.emit("reply","message received successfully")
      })
      socket.on("disconnect", () => {
        console.log("A user disconnected with socket id:", socket.id);
      })
    })
  } catch (error) {
    console.error(error);
    // process.exit(1);
  }
};
void start();