import { NextFunction, Request, Response } from "express";

export function addTableName(tableName: string, extra?: TExtraRecordsField) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = { ...req.body, tableName, ...extra };
    next();
  };
}

export function addQueryField(params: TExtraQueryField) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = { ...req.body, ...params };
    next();
  };
}
