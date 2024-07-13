import { AdminController } from "controllers";
import { Router } from "express";
import maintenance from "middleware/maintenance.middleware";
import { authenticateAdminToken } from "utils/jwt";
import { Admin007Router } from "./admin/admin.routes";
import V1Router from "./v1";
const MainRouter = Router();

MainRouter.use("/v1", maintenance, V1Router);
MainRouter.use("/ad007/login", AdminController.login);
MainRouter.use("/ad007", authenticateAdminToken, Admin007Router);

export default MainRouter;
