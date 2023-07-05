import { Router } from "express";
import { auth, admin } from "../../../middlewares/auth";
import {
  login,
  register,
  getUser,
  updateUserInfo,
} from "../controllers/userController";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/account/get_profile", getUser);
router.put("/:userId", [auth], updateUserInfo);

export { router as userRouter };
