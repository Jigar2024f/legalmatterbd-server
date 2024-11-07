import { Router } from "express";
import authRouter from "./authRouter";
import blogRuter from "./blog.router";
import userRouter from "./user.router";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/blog", blogRuter);
rootRouter.use("/user", userRouter);

export default rootRouter;
