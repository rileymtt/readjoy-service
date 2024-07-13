import winstonLogger from "loggers/winston.logger";
import { Socket as BaseSocket } from "socket.io";
import { verifyToken } from "utils/jwt";

export interface Socket extends BaseSocket {
  userId?: number;
}

export async function handleSocket(socket: Socket) {
  try {
    const token = socket.handshake.auth.token;
    const verifyUser = verifyToken(token);
  } catch (error) {
    winstonLogger.error(JSON.stringify(error));
  }
}

export async function emitToAll(event: string, data: any) {
  SocketServer.emit(event, data);
}
