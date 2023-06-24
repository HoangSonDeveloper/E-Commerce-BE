import { Router } from "express";
import { indexRouter } from "../components/index/routes/routes";
import { userRouter } from "../components/user/routes/routes";

const router = Router();

const routes = [
  {
    path: "/",
    router: indexRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export { router };
