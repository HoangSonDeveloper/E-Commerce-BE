import { Router } from "express";
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
      this.getController(this.userController, "createAccount")
    );

    return router;
  }
}
