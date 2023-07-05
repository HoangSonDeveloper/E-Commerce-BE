import Joi from "joi";
import { IUser } from "../../../types";

export const validateUser = (user: IUser) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};

export const validateAuth = (user: IUser) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};

export const validateUserInfo = (user: IUser) => {
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
