import mongoose from "mongoose";
import { serverConfig } from ".";
import logger from "./logger.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(serverConfig.DB_URI);
    logger.info(`MongoDB connected successfully`);
    mongoose.connection.on("error", (err) => {
      logger.error(`MongoDB connection error: ${err}`);
    });
    mongoose.connection.on("disconnected", () => {
      logger.error(`MongoDB connection disconnected`);
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error(error);
  }
};
