import dotenv from "dotenv";
import { Server } from "socket.io";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";

//dotEnv Config
dotenv.config();

//env Variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//Mongodb connection//
mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

db.on("connected", () => {
  logger.info("Connected to Mongodb");
});

db.on("error", (err) => {
  logger.error(`Mongodb connection error: ${err}`);
  process.exit(1);
});
//Mongodb connection//

let server;

server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}.`);
});

//Socket io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
});
io.on("connection", (socket) => {
  logger.info("socket is connected successfully.");
});

//handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
