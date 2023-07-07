import { BadRequestError, IRepository } from "@learnbox/common";
import { createAccountSchema, CreateAccountDTO } from "./user.dto";
import { UserDocument } from "../data-access/models/user.model";
import { ValidateFunction } from "ajv";
import { ajv } from "@learnbox/core";
import { ObjectId } from "typeorm";

export interface IUserService {
  createAccount(account: CreateAccountDTO): Promise<ObjectId>;
}

export class UserService implements IUserService {
  private userRepository: IRepository<UserDocument>;

  constructor(userRepository: IRepository<UserDocument>) {
    this.userRepository = userRepository;
  }

  async createAccount(account: CreateAccountDTO): Promise<ObjectId> {
    let validationSchema: ValidateFunction<CreateAccountDTO> | undefined;
    validationSchema = ajv.getSchema<CreateAccountDTO>("create-account");
    if (!validationSchema) {
      ajv.addSchema(createAccountSchema, "create-account");
      validationSchema = ajv.getSchema<CreateAccountDTO>("create-account");
    }
    const valid = validationSchema!(account);
    if (!valid) {
      throw new BadRequestError("Invalid email or password");
    }
    let user = await this.userRepository.find({ email: account.email }, 1, 0, {
      _id: 1,
    });
    console.log(user);
    if (user.length > 0) {
      throw new BadRequestError("Email already exists");
    }
    const newUserId = await this.userRepository.create(account);
    return newUserId;
  }

  async hello() {}
}
