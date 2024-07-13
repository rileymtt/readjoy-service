import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  // if (Number(SystemSettings.SYSTEM_MAINTENANCE)) {
  //   return res.sendStatus(503);
  // } else {
  //   next();
  // }
  next();
};
