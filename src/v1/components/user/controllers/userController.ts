import { Request, Response } from "express";
import * as _ from "lodash";
import { User } from "../models/userModel";
import { comparePassword } from "../services/services";
import { validateAuth, validateUser } from "../services/services";
import { getCurrentDatetime } from "../../../utils/common";

export const registerUser = async (req: Request, res: Response) => {
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

export const authUser = async (req: Request, res: Response) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid username or password.");

  const validPassword = await comparePassword(req.body.password, user.password);
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

export const updateUserInformation = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // @ts-ignore
  const user = await User.findByIdAndUpdate(
    // @ts-ignore
    req.user._id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
      },
    },
    { new: true }
  );

  res.send(user);
};
