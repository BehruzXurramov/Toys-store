const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}:${message}\n${stack}`;
});

const logger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), myFormat),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: "./log/error.log", level: "debug" }),
  ],
});

module.exports = logger;
