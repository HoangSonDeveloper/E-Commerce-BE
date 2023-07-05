import { Database } from "@learnbox/core";
import * as configProvider from "@learnbox/config-provider";

let database: Database;

export default function getDatabase(): Database {
  if (!database) {
    database = new Database(
      configProvider.getValue("DB.host"),
      configProvider.getValue("DB.userName"),
      configProvider.getValue("DB.password"),
      configProvider.getValue("DB.dbName"),
      configProvider.getValue("DB.protocol")
    );
  }
  return database;
}
