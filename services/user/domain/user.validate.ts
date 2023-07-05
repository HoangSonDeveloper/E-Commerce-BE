import * as Joi from "joi";
import { IUserInfoDTO, ICreateUserDTO } from "./user.dto";
import { UserDocument } from "../data-access/models/user.model";

export const validateUser = (user: ICreateUserDTO) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};

export const validateUserInfo = (user: IUserInfoDTO) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(255),
    lastName: Joi.string().min(2).max(255),
    avatar: Joi.string().min(2).max(255),
    address: Joi.object({
      address: Joi.string().min(2).max(255),
      city: Joi.string().min(2).max(255),
      state: Joi.string().min(2).max(255),
      country: Joi.string().min(2).max(255),
      zip: Joi.string().min(2).max(255),
    }),
    phone: Joi.string().min(2).max(255),
  });

  return schema.validate(user);
};
