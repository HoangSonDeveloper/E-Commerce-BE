import { Router } from "express";
import { apiInfo } from "../controllers/index";

const router = Router();

router.get("/", apiInfo);

export { router as indexRouter };
