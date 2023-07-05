import Express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import { config } from "dotenv";
import { router } from "./v1/router";
import serverConfig from "./v1/config/config";
import { connectToMongoDBDatabase, connectToFirebaseDatabase } from "./v1/db";

if (process.env.NODE_ENV !== "production") {
  config();
}

const app = Express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(Express.json());
app.use(session(serverConfig.sessionConfig));

app.use(process.env.ROOT_ENDPOINT, router);

// Development-only middleware
if (app.get("env") === "development") {
  app.use(morgan("combined"));
  console.log("Morgan enabled.");
}

connectToMongoDBDatabase(serverConfig.mongoDBConfig);
connectToFirebaseDatabase(serverConfig.firebaseConfig);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
