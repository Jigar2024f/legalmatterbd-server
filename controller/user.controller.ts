import { CookieOptions, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { successResponse } from "./response.controller";
import "dotenv/config";
import createHttpError from "http-errors";

export const handleLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dbEmail = process.env.EMAIL || "jigarsir@gmail.com";
    const dbPassword = process.env.PASSWORD || "12345A@";
    const { email, password } = req.body;
    if (email !== dbEmail || password !== dbPassword) {
      return next(createHttpError(401, "Invalid email or password"));
    }
    const accessToken = jwt.sign(
      { user: { email: dbEmail } },
      process.env.JWT_SECRET_KEY || "dfdsfdsfsdfsdfsddfdsfdsf",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    successResponse(res, {
      statusCode: 200,
      message: "Login successful",
      payload: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const handleLogOut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    };

    res.clearCookie("accessToken", cookieOptions);
    successResponse(res, {
      statusCode: 200,
      message: "LogOut successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log({ user: req.user });
    if (!req.user) {
      return next(createHttpError(403, "User not authenticated"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Fetched current user successfully",
      payload: { user: true },
    });
  } catch (error) {
    next(error);
  }
};
