import { NextFunction, Request, Response } from "express";
import { Err } from "../interfaces/Error.interface";

export const ErrorMiddleWare = (
  err: Err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    message,
  });
};
