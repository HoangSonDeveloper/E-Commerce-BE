import { Router } from "express";
import { auth, admin } from "../../../middlewares/auth";
import { registerUser, authUser, getUser } from "../controllers/userController";

const router = Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.get("/profile", [auth], getUser);

export { router as userRouter };
