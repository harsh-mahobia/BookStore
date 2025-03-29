import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { AppError } from "./error_handler";


interface AuthRequest extends Request {
  user?: any;
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("AuthToken")
    if (!token) {
      throw new AppError("Access denied. No token fond.", 401);
    }

    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET!)
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError("invalid or expired token.", 401));
  }
};
