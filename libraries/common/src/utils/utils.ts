import { ObjectId } from "mongodb";
import { InvalidIdError } from "../app-errors";
import { Request, Response, NextFunction } from "express";

export function getValidObjectId(id: string | ObjectId) {
  if (!ObjectId.isValid(id)) {
    throw new InvalidIdError();
  }

  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  return id;
}
// Wraps async functions, catching all errors and sending them forward to express error handler
export function asyncWrap(controller: CallableFunction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
