import http from "node:http";
import { PORT } from "./config/app.config";
import database from "./models/index";
import { app } from "./app";

const server = http.createServer(app);

const start = async (): Promise<void> => {
  try {
    await database.sync({ force: false });

    server.listen(PORT, () => {
      // console.timeEnd("serverStart")
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      
    });
  } catch (error) {
    console.error(error);
    // process.exit(1);
  }
};
void start();