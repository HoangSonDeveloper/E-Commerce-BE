import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { Schema, model } from "mongoose";
import { IUser, IUserAuth } from "../../../types";

config();

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  admin: Boolean,
});

userSchema.methods.generateAuthToken = function (): string {
  const payload = {
    _id: this._id,
    admin: this.admin,
  };
  const secret = process.env.JWT_SECRET || "";

  return jwt.sign(payload, secret);
};

userSchema.methods.hashPassword = async function (): Promise<void> {
  const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS || 10);
  this.password = await bcrypt.hash(this.password, salt);
};

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUserAuth>("User", userSchema);
