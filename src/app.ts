import Express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import { router } from "./v1/router";
import connectToDatabase from "./v1/models";

config();

const app = Express();
const port: number = process.env.PORT || 8000;

if (app.get("env") === "development") {
  app.use(morgan("combined"));
  console.log("Morgan enabled.");
}

app.use(cors());
app.use(Express.json());
app.use(process.env.ROOT_ENDPOINT, router);

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
