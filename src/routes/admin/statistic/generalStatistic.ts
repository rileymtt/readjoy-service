import dbTables from "config/dbTables";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Helper } from "helpers";
import { AdminService } from "services";
import { execute } from "utils/mysql.connector";
import { StatisticTypes } from "./constant";
import logModel from "models/log.model";

const getStat = async (tableName: string, statisticDate: any) => {
  const query = `SELECT DATE(createdAt) AS skey, COUNT(*) AS svalue FROM ${tableName} WHERE createdAt >= ? GROUP BY skey`;
  const result: any[] = await execute(query, [statisticDate]);
  return result;
};

export const generalStatistic: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let statisticType = StatisticTypes.length - 1;
    if (req.query.type) statisticType = Number(req.query.type);

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    const statisticDate = new Date(currentDate);
    statisticDate.setDate(
      statisticDate.getDate() - StatisticTypes[statisticType].value
    );

    const [
      userCount,
      totalArticle,
      totalComment,
      totalMemo,
      totalUserReport,
      totalArticleReport,
    ] = await Promise.all([
      execute<{ count: number }[]>(
        `SELECT COUNT(*) AS count FROM ${dbTables.userTable} WHERE type = 0 AND createdAt >= ?`,
        [statisticDate]
      ),
      execute<{ count: number }[]>(
        `SELECT COUNT(*) AS count FROM ${dbTables.articleTable} WHERE type = 0 AND createdAt >= ?`,
        [statisticDate]
      ),
      execute<{ count: number }[]>(
        `SELECT COUNT(*) AS count FROM ${dbTables.commentTable} WHERE createdAt >= ?`,
        [statisticDate]
      ),
      execute<{ count: number }[]>(
        `SELECT COUNT(*) AS count FROM ${dbTables.memoTable} WHERE createdAt >= ?`,
        [statisticDate]
      ),
      execute<{ count: number }[]>(
        `SELECT COUNT(*) AS count FROM ${dbTables.userReports} WHERE createdAt >= ?`,
        [statisticDate]
      ),
      execute<{ count: number }[]>(
        `SELECT COUNT(*) AS count FROM ${dbTables.articleReports} WHERE createdAt >= ?`,
        [statisticDate]
      ),
    ]);

    let stats: any[] = [];

    const tables = [
      {
        key: "user",
        label: "Users",
        table: dbTables.userTable,
      },
      {
        key: "login",
        label: "Login Users",
        table: dbTables.Logs,
      },
      {
        key: "article",
        label: "Articles",
        table: dbTables.articleTable,
      },
      {
        key: "comment",
        label: "Comments",
        table: dbTables.commentTable,
      },
      {
        key: "memo",
        label: "Memos",
        table: dbTables.memoTable,
      },
      {
        key: "userReport",
        label: "User Reports",
        table: dbTables.userReports,
      },
      {
        key: "articleReport",
        label: "Article Reports",
        table: dbTables.articleReports,
      },
      {
        key: "transaction",
        label: "Transactions",
        table: dbTables.transactionTable,
      },
    ];

    for (const iterator of tables) {
      stats.push({
        key: iterator.key,
        label: iterator.label,
        data: await getStat(iterator.table, statisticDate),
      });
    }

    const [topUsers, topLoginUsers] = await Promise.all([
      AdminService.getRecords({
        tableName: dbTables.balanceTable,
        page: 1,
        pageSize: 10,
        subTables: [
          {
            tableName: dbTables.userTable,
            column: "id",
            refColumn: "userId",
            columns: ["email", "walletAddress", "username"],
          },
          {
            tableName: dbTables.profileTable,
            column: "id",
            refColumn: "userId",
            columns: ["profilePicture", "firstName", "lastName"],
          },
        ],
        sortWith: {
          key: "balance",
          type: "DESC",
        },
      }),
      logModel.getTop(),
    ]);

    for (const iterator of topUsers.items) {
      iterator.displayname = Helper.Format.formatHiddenName(iterator);
    }

    res.status(200).json({
      overview: [
        { value: userCount[0].count, label: "Total users" },
        { label: "Total articles", value: totalArticle[0].count },
        { label: "Total comments", value: totalComment[0].count },
        { label: "Total memos", value: totalMemo[0].count },
        { label: "Total user reports", value: totalUserReport[0].count },
        { label: "Total article reports", value: totalArticleReport[0].count },
      ],
      stats,
      topUsers: topUsers.items,
      topLoginUsers,
    });
  } catch (error) {
    next(error);
  }
};
