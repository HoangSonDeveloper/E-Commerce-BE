import { ObjectId } from "mongodb";
import { InvalidIdError } from "../constants/app-errors";

export function getValidObjectId(id: string | ObjectId) {
  if (!ObjectId.isValid(id)) {
    throw new InvalidIdError();
  }

  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  return id;
}
