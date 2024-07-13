import dbTables from "config/dbTables";
import { AdminController } from "controllers";
import { Router } from "express";
import { addTableName } from "middleware/admin.middleware";
import { isSuperAdmin } from "middleware/check-admin-role.middleware";
const router = Router();

router.post(
  "/",
  isSuperAdmin,
  addTableName(dbTables.adminTable),
  AdminController.getData
);

router.post("/create", isSuperAdmin, AdminController.register);
router.post(
  "/update",
  isSuperAdmin,
  addTableName(dbTables.adminTable),
  AdminController.updateData
);
router.delete(
  "/",
  isSuperAdmin,
  addTableName(dbTables.adminTable),
  AdminController.deleteData
);
export default { router };
