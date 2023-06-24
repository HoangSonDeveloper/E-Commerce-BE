import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.user.admin) return res.status(403).send("Access denied.");
  next();
};
