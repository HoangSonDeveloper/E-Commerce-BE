import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser, IAddress } from "../../../types";
import { UserRole } from "../services/roles";

const addressSchema = new Schema<IAddress>({
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  zip: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
});

const userSchema = new Schema<IUser>({
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
  verified: {
    type: Boolean,
    default: false,
  },
  accountType: {
    type: String,
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.STUDENT,
  },
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  avatar: {
    // allow avatar to be empty
    type: String,
    default: "",
  },
  address: addressSchema,
  phone: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
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

export const User = model<IUser>("User", userSchema);
