import { config } from "dotenv";
import { startWebServer } from "./api/server";
import logger from "@learnbox/logger";
import * as configProvider from "@learnbox/config-provider";
import configSchema from "./config";

async function initConfig() {
  if (process.env.NODE_ENV === "development") {
    config();
  }
  configProvider.initializeAndValidate(configSchema);
}

async function start() {
  return Promise.all([startWebServer()]);
}

async function startServer() {
  try {
    await initConfig();
    await start();
    logger.info("Server started");
  } catch (error) {
    logger.error(error);
    throw error;
    process.exit(1);
  }
}

startServer();
