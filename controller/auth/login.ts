import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../database/user.model";
import { AppError } from "../../middlewares/error_handler";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new AppError("Email and password are required", 400)
    }
    if (typeof email !== "string" || typeof password !== "string") {
      throw new AppError("Invlid input types", 400);
    }
    if (!email.includes("@") || !email.includes(".")) {
      throw new AppError("invalid email format", 400)
    }
    if (password.length < 6) {
      throw new AppError("password must be at least 6 characters long", 400)
    }

  
    const user = await User.findOne({email});
    if (!user || user.password !== password) {
      throw new AppError("Invalid credentials", 401)
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { 
      expiresIn: "1h" 
    
    });

    res.json({token});
  } catch (error) {
    next(error);
  }
};
