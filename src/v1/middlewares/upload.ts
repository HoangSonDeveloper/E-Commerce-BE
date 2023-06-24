import { Request, Response, NextFunction } from "express";
import { getStorage } from "firebase/storage";
import multer from "multer";

export const upload = multer({ storage: multer.memoryStorage() });
