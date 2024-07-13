import compression from "compression";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import errorLogger from "loggers/error.logger";
import winstonLogger from "loggers/winston.logger";
import badJson from "middleware/bad-json.middleware";
import path from "path";
import MainRouter from "routes";

const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1000, // ms
  max: 100, // limit each IP requests per windowMs
  validate: { xForwardedForHeader: false },
});

export default (app: Express) => {
  function shouldCompress(req: any, res: any) {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  }

  app.use(limiter);
  app.use(
    morgan((tokens: any, req: Request, res: Response) => {
      const message = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
      winstonLogger.debug({
        message: message,
        label: "Morgan",
      });
    })
  );
  app.use(
    compression({
      level: 6,
      threshold: 100 * 1000,
      filter: shouldCompress,
    })
  );
  app.use(helmet());
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ limit: "5mb", extended: true }));
  app.use(badJson);
  app.use(cors());
  app.use("/api", MainRouter);
  app.use("/images", express.static(path.join("public", "images")));
  app.use(errorLogger);
};
