import { Router } from "express";
import { indexRouter } from "../components/index/routes/routes";

const router = Router();

const routes = [
  {
    path: "/",
    router: indexRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export { router };
