import dbTables from "config/dbTables";
import errors from "config/errors";
import { AppError } from "exceptions/AppError";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { execute } from "utils/mysql.connector";

export const userStatistic: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError(400, "", [errors.REQUIRE_FIELD]);
    }
    const query = `
        SELECT
          type,
          SUM(amount) AS total
        FROM
            ${dbTables.transactionTable} t
        WHERE t.userId = ?
        GROUP BY t.type
    `;
    const result: any[] = await execute(query, [Number(id)]);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
