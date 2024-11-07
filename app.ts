import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

const app = express();
import cors from "cors";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import {
  errorResponse,
  successResponse,
} from "./controller/response.controller";
import rootRouter from "./routes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use("/api/v1", rootRouter);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  successResponse(res, {
    statusCode: 200,
    message: "Hello, I am typescript and express server. image uploader",
    payload: {},
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "route not found"));
});

app.use(((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || "An unexpected error occurred";

  errorResponse(res, { statusCode, message });
}) as unknown as ErrorRequestHandler);

export default app;
