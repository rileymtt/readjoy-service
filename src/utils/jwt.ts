import { AppError } from "exceptions/AppError";
import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export function generateToken(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, user: TUser) => {
      if (err) {
        return false;
      }
      return user;
    }
  );
}

export function checkAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, user: TUser) => {
      if (!err) {
        req.body.verifyUser = user;
      }
      next();
    }
  );
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, user: TUser) => {
      if (err) {
        throw new AppError(401, "");
      }
      req.body.verifyUser = user;
      next();
    }
  );
}

export function authenticateAdminToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) throw new AppError(401, "");

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, user: TUser) => {
      if (err) {
        throw new AppError(401, "");
      }
      req.body.verifyUser = user;
      next();
    }
  );
}
