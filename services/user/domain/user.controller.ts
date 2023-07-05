import UserRepository from "../data-access/user.repository";
import { Request, Response } from "express";
import { ICreateUserDTO } from "./user.dto";
import { IUserService, UserService } from "./user.service";
import { ObjectId } from "typeorm";

export class UserController {
  private userService: IUserService;

  constructor() {
    this.userService = new UserService(new UserRepository());
  }

  async createUser(req: Request, res: Response) {
    const user: ICreateUserDTO = req.body;
    const newUserId = await this.userService.createUser(user);

    res.status(201).json({ id: newUserId });
  }

  async hello(req: Request, res: Response) {
    res.status(200).json({ message: "Hello World!" });
  }
}
