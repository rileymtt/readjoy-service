import appConfig from "config/app.config";
import errors from "config/errors";
import { AppError } from "exceptions/AppError";
import { NextFunction, Request, Response } from "express";
import winstonLogger from "./winston.logger";

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { verifyUser } = req.body;
  winstonLogger.error(
    `${verifyUser ? `User #${verifyUser.id} ` : ""}${JSON.stringify(err)}`
  );
  if (err.statusCode === 400) {
    res.status(400).json({
      success: false,
      errors: err.errors,
    });
  } else if (err.statusCode === 401) {
    res.status(401).json({
      success: false,
      errors: [
        {
          code: "INVALID_CREDENTIALS",
          message: "Invalid credentials",
        },
      ],
    });
  } else {
    console.log(err);
    const userAgent = req.headers["user-agent"];
    DiscordBot.sendError(
      String(err.stack),
      appConfig.EnvironmentConfig.service,
      appConfig.EnvironmentConfig.env,
      req.ip,
      `${userAgent} #${verifyUser.id}`
    );
    res.status(500).json({
      success: false,
      errors: [errors.INTERNAL_SERVER_ERROR],
    });
  }
  next();
};
