import { Request, Response, NextFunction } from "express";


export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status
    Object.setPrototypeOf(this, new.target.prototype)
  }
}



const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Serer Error",
  });
};

export default errorHandler;
