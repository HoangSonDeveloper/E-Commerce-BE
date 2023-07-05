import { IRepository } from "@learnbox/common";
import { ICreateUserDTO } from "./user.dto";
import { UserDocument } from "../data-access/models/user.model";
import { ObjectId } from "typeorm";

export interface IUserService {
  createUser(user: ICreateUserDTO): Promise<ObjectId>;
}

export class UserService implements IUserService {
  private userRepository: IRepository<UserDocument>;

  constructor(userRepository: IRepository<UserDocument>) {
    this.userRepository = userRepository;
  }

  async createUser(user: ICreateUserDTO): Promise<ObjectId> {
    const newUserId = await this.userRepository.create(user);
    return newUserId;
  }
}
