import errors from "config/errors";
import { AppError } from "exceptions/AppError";
import { NextFunction, Request, Response } from "express";

interface CustomSyntaxError extends SyntaxError {
  status?: number;
}

export default (
  error: CustomSyntaxError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    throw new AppError(400, "", [errors.BAD_JSON]);
  }
  next();
};
