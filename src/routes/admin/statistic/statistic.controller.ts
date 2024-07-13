import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatisticTypes } from "./constant";

export const getStatisticTypes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      types: StatisticTypes,
      defaultType: 4,
    });
  } catch (error) {
    next(error);
  }
};
