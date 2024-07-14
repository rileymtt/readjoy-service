import express from "express";
import expressHelper from "express.helper";
import setupDatabase from "helpers/setup-database";
import { handleSocket } from "helpers/socker.helper";
import swaggerDocs from "helpers/swagger";
import winstonLogger from "loggers/winston.logger";
import { RedisClient } from "redis/main";
import { Server as SocketIOServer } from "socket.io";
import * as MySQLConnector from "utils/mysql.connector";

const app = express();
const PORT = process.env.NODE_DOCKER_PORT || 3001;

//? setup mysql
MySQLConnector.init();

//? setup routes
expressHelper(app);

const server = app.listen(PORT, async () => {
  try {
    winstonLogger.info({
      label: "System",
      message: `Server listening at http://localhost:${PORT}`,
    });
    await setupDatabase();
    SocketServer.on("connection", handleSocket);
    swaggerDocs(app);
  } catch (error) {
    console.log(error);
  }
});

declare global {
  var SocketServer: SocketIOServer;
  var RedisClient: RedisClient;
}

global.RedisClient = new RedisClient();
global.SocketServer = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});
