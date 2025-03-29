import { Request, Response, NextFunction } from "express";
declare const errorHandler: (err: CustomError, req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
