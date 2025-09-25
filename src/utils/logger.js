const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const path = require('path');
const fs = require('fs');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), customFormat),
      level: 'info',
    }),
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
  ],
});

module.exports = logger;
