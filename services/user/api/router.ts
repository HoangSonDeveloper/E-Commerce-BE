import { Request, Response, NextFunction, Application, Router } from "express";
import UserRepository from "../data-access/user.repository";
import { UserController } from "../domain/user.controller";
import { asyncWrap } from "@learnbox/common";

export default class UserRouter {
  private userController = new UserController();

  private getController(context: any, func: string) {
    return asyncWrap(context[func].bind(context));
  }

  public defineRoutes() {
    const router = Router();

    router.post(
      "/users",
      this.getController(this.userController, "createUser")
    );
    router.get("/hello", this.getController(this.userController, "hello"));

    return router;
  }
}
