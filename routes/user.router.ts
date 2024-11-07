import { Router } from "express";
import { handleGetCurrentUser } from "../controller/user.controller";
import { isLogin } from "../middleware/auth.middleware";
const userRouter: Router = Router();

userRouter.get("/me", isLogin, handleGetCurrentUser);

export default userRouter;
