import { ProfileController, UserController } from "controllers";
import { Router } from "express";
import { authenticateToken, checkAuthenticate } from "utils/jwt";
import { UserValidations } from "validations";

const userRouter = Router();

userRouter.get(`/delete`, authenticateToken, UserController.disableAccount);
userRouter.get("/profile", authenticateToken, UserController.getProfile);
userRouter.post("/profile", authenticateToken, ProfileController.updateProfile);
userRouter.post(
  "/profile/avatar",
  authenticateToken,
  ProfileController.updateAvatar
);
userRouter.post(
  "/profile/cover",
  authenticateToken,
  ProfileController.updateCoverPicture
);
userRouter.get("/p", checkAuthenticate, UserController.getUserProfile);
userRouter.post(
  "/register",
  UserValidations.checkEmail,
  UserValidations.checkPassword,
  UserValidations.checkRef,
  UserController.register
);
userRouter.post(
  "/login",
  UserValidations.checkExistsEmail,
  UserValidations.checkPassword,
  UserController.login
);
userRouter.post("/username", authenticateToken, UserController.updateUsername);
userRouter.post("/update-ref", authenticateToken, UserController.updateRef);
userRouter.post(
  "/update-account",
  authenticateToken,
  UserValidations.checkEmail,
  UserValidations.checkPassword,
  UserController.updateAccount
);

export default userRouter;
