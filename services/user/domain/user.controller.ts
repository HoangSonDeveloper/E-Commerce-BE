import UserRepository from "../data-access/user.repository";
import { Request, Response } from "express";
import { CreateAccountDTO } from "./user.dto";
import { IUserService, UserService } from "./user.service";

export class UserController {
  private userService: IUserService;

  constructor() {
    this.userService = new UserService(new UserRepository());
  }

  async createAccount(req: Request, res: Response) {
    const newUserId = await this.userService.createAccount(req.body);

    res.status(201).json({ id: newUserId });
  }
}
