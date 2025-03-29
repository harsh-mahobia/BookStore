import { Request, Response, NextFunction } from "express"
import User from "../../database/user.model";


import { AppError } from "../../middlewares/error_handler"

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.body)
    throw new AppError("Email and password are required", 400)
  
    const { email, password } = req.body

    if (!email || !password) {
      throw new AppError("Email and password are required", 400)
    }
    if (typeof email !== "string" || typeof password !== "string") {
      throw new AppError("Invalid input types", 400);
    }

    if (!email.includes("@") || !email.includes(".")) {
      throw new AppError("Invalid email format", 400)
    }

    if (password.length < 6) {
      throw new AppError("Password must be at least 6 characters long", 400);
    }

    const existingUser = await User.findOne({ email});

    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const user = new User({ email, password})
    await user.save();

    res.status(201).json({message: "User registered successfully" })
  } catch (error) {
    next(error);
  }
};
