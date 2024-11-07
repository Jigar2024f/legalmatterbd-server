import { Router } from "express";
import authRouter from "./authRouter";
import blogRuter from "./blog.router";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/blog", blogRuter);

export default rootRouter;
