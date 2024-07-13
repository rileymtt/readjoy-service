import { ERoles } from "config/enums";
import { NextFunction, Request, Response } from "express";

export const isSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { verifyUser } = req.body;
  if (verifyUser.role > ERoles.SuperAdmin) {
    return res.sendStatus(403);
  }
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { verifyUser } = req.body;
  if (verifyUser.role > ERoles.Admin) {
    return res.sendStatus(403);
  }
  next();
};

export const isSupport = (req: Request, res: Response, next: NextFunction) => {
  const { verifyUser } = req.body;
  if (verifyUser.role > ERoles.Support) {
    return res.sendStatus(403);
  }
  next();
};
