import { Server } from "http";
import { AddressInfo } from "net";
import Express, { Application } from "express";
import helmet from "helmet";
import UserRouter from "./router";
import { jwtVerifierMiddleware } from "@learnbox/middlewares";
import * as configProvider from "@learnbox/config-provider";
import getDatabase from "../data-access/models/db.connection";

let connection: Server;

async function startWebServer(): Promise<AddressInfo> {
  const app = Express();
  // app.use(addRequestIdExpressMiddleware);
  app.use(helmet());
  app.use(Express.urlencoded({ extended: true }));
  app.use(Express.json());
  app.use(
    configProvider.getValue("apiPrefix"),
    new UserRouter().defineRoutes()
  );
  // app.use(
  //   jwtVerifierMiddleware({
  //     secret: configProvider.getValue("jwtTokenSecret"),
  //   })
  // );

  // defineErrorHandlingMiddleware(app);
  connectToDatabase();
  const APIAddress = await openConnection(app);
  return APIAddress;
}

async function openConnection(app: Application): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const portToListenTo = configProvider.getValue("port");
    const webServerPort = portToListenTo || 0;
    console.log(`Server is about to listen to port ${webServerPort}`);
    connection = app.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
}

async function connectToDatabase() {
  const database = getDatabase();
  await database.connect();
}

async function stopWebServer() {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve();
      });
    }
  });
}

export { startWebServer, stopWebServer };
