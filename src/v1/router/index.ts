import { Router } from "express";
import { indexRouter } from "../components/index/routes/routes";
import { userRouter } from "../components/account/routes/routes";

const router = Router();

const routes = [indexRouter, userRouter];

routes.forEach((route) => {
  router.use("/", route);
});

export { router };
