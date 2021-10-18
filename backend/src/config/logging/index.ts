import * as morgan from "morgan";
import { config, createLogger, transports, format } from "winston";

// eslint-disable-next-line
const json = require("morgan-json");

const { combine, timestamp, printf, errors, colorize } = format;

const consoleFormat = printf((info) => {
  const { level, message, timestamp, stack } = info;
  return `${timestamp}  ${level}: ${stack || message}`;
});

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      consoleFormat,
    ),
  },
};

const morganFormatStr =
  ":remote-addr :date[web] :method :url :status :res[content-length] :response-time";

export const consoleLogger = createLogger({
  levels: config.npm.levels,
  transports: [new transports.Console(options.console)],
  exitOnError: false,
});

export const httpConsoleLogger = morgan(morganFormatStr, {
  stream: {
    write: (message) => consoleLogger.info(message.replace("\n", "")),
  },
});

export const fileLogger = createLogger({
  levels: config.npm.levels,
  transports: [new transports.File(options.file)],
  exitOnError: false,
});

const morganFormat = json(morganFormatStr);
export const httpFileLogger = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const {
        "remote-addr": remoteAddr,
        date,
        method,
        url,
        status,
        res: contentLength,
        "response-time": responseTime,
      } = JSON.parse(message);

      fileLogger.info("HTTP Access Log", {
        ip: remoteAddr,
        timestamp: date,
        method,
        url,
        status: Number(status),
        contentLength,
        responseTimeMs: Number(responseTime),
      });
    },
  },
});
