import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    console.log({ accessToken });
    if (!accessToken) {
      return next(
        createHttpError(401, "Access token not found, please log in")
      );
    }
    const decode = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY ||
        "dfdsffkjdskflkjldjfjfjljsflksdjfjldkfjlkdsf56"
    ) as JwtPayload;

    if (!decode || !decode.user) {
      return next(
        createHttpError(401, "Invalid token or missing user information")
      );
    }

    req.user = decode.user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const isLogOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      return next(createHttpError(401, "User already logged in"));
    }
    next();
  } catch (error) {
    console.log(error + "logout");
    next(error);
  }
};
// is admin
