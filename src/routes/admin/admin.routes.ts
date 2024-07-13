import { AdminController } from "controllers";
import { Router } from "express";
import adminRouter from "./routes/adminRouter";
import userRouter from "./routes/userRouter";

export const Admin007Router = Router();

Admin007Router.use("/users", userRouter.router);
Admin007Router.use("/administrators", adminRouter.router);
Admin007Router.put("/change-password", AdminController.updatePassword);
