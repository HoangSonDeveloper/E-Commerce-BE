import { Request, Response } from "express";
import { config } from "dotenv";

config();

export const apiInfo = (req: Request, res: Response) => {
  res.json({
    name: process.env.API_NAME,
    version: process.env.npm_package_version,
  });
};
