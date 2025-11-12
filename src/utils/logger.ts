import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,       // 🌈 colors
      translateTime: "HH:MM:ss", // 🕒 timestamp
      ignore: "pid,hostname",    // 🧹 cleaner output
    },
  },
});

export default logger;
