import { ObjectId, Schema, model, Document } from "mongoose";

export interface UserDocument {
  _id: ObjectId;
  email: string;
  password: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
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
    type: String,
    default: "",
  },
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

const User = model<UserDocument>("User", userSchema);

export default User;
