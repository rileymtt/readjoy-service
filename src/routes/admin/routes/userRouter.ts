import dbTables from "config/dbTables";
import { AdminController } from "controllers";
import { NextFunction, Request, Response, Router } from "express";
import { addQueryField, addTableName } from "middleware/admin.middleware";
import { isAdmin } from "middleware/check-admin-role.middleware";
import { UserRedis } from "redis/directional";
import { UserService } from "services";
const router = Router();

router.post(
  "/",
  addQueryField({
    tableName: dbTables.userTable,
    subTables: [
      {
        tableName: dbTables.profileTable,
        columns: ["lastName", "firstName", "profilePicture"],
        column: "id",
        refColumn: "id",
      },
    ],
    filterList: [
      {
        key: "status",
        label: "Status",
        type: "select",
        values: {
          0: "Blocked",
          1: "Active",
        },
      },
      {
        key: "type",
        label: "Type",
        type: "select",
        values: {
          0: "User",
          1: "BOT",
        },
      },
    ],
    searchList: [
      { Field: "email", label: "Email" },
      { Field: "username", label: "Username" },
      { Field: "walletAddress", label: "Wallet Address" },
    ],
  }),
  AdminController.getData
);

router.post(
  "/create",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fields } = req.body;

      if (fields.email) {
        await UserService.createUser(
          fields.email,
          fields.password,
          Number(fields.type)
        );
      }
      res.status(200).json({ isSuccess: true });
    } catch (error) {
      next(error);
    }
  }
);

function syncData(req: Request) {
  if (req.body.id || req.query.id) {
    UserRedis.del(req.body.id || req.query.id);
  }
}

router.post(
  `/update`,
  addTableName(dbTables.userTable),
  AdminController.updateData,
  syncData
);

router.delete(
  "/",
  addTableName(dbTables.userTable),
  AdminController.archiveData,
  syncData
);

export default { router };
