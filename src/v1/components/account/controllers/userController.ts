import { Request, Response } from "express";
import * as _ from "lodash";
import passport from "passport";
import { User } from "../models/userModel";
import serverConfig from "../../../config/config";
import {
  validateAuth,
  validateUserInfo,
  validateUser,
} from "../services/validate";

export const register = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Mail has already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  await user.hashPassword();
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
};

export const login = async (req: Request, res: Response) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid username or password.");

  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");

  const token = user.generateAuthToken();

  res.send(token);
};

export const getUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

export const updateUserInfo = async (req: Request, res: Response) => {
  const { error } = validateUserInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userId = req.params.userId;
  const userInfo = req.body;
  if (!userId) return res.status(400).send("Invalid user ID.");
  const user = await User.findById(userId);
  if (!user) return res.status(404).send("User not found.");

  Object.assign(user, userInfo);

  await user.save();

  res.send(user);
};
