import path from "path";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf, align, colorize } = format;

const transport = new transports.DailyRotateFile({
  filename: path.join(__dirname, "..", "logs", `%DATE%.log`),
  datePattern: "YYYY-MM-DD",
  json: false,
  maxSize: "20m",
  maxFiles: "14d",
});

const errorTransport = new transports.DailyRotateFile({
  level: "error",
  filename: path.join(__dirname, "..", "logs", `error.%DATE%.log`),
  datePattern: "YYYY-MM-DD",
  json: false,
  maxSize: "20m",
  maxFiles: "14d",
});

const customFormat = printf((info: any) => {
  let { timestamp, level, message, label } = info;
  const ts = timestamp.slice(0, 19).replace("T", " ");
  return `${ts} ${level} ${label ? label : "System"}  ${message}`;
});

const winstonLogger = createLogger({
  level: "debug",
  format: combine(
    format((info: any) => {
      info.level = "●";
      return info;
    })(),
    colorize(),
    timestamp(),
    align(),
    customFormat
  ),
  transports: [new transports.Console(), transport, errorTransport],
});

export default winstonLogger;
