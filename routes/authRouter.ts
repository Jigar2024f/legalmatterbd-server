import { Router } from "express";
import { handleLoginUser, handleLogOut } from "../controller/user.controller";
import { isLogin, isLogOut } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/login", isLogOut, handleLoginUser);

authRouter.post("/logOut", isLogin, handleLogOut);

export default authRouter;
