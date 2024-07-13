import errors from "config/errors";
import { UserService } from "services";
const { body } = require("express-validator");

export const checkEmail = [
  body("email")
    .exists()
    .withMessage(errors.REQUIRE_EMAIL)
    .notEmpty()
    .withMessage(errors.REQUIRE_EMAIL)
    .isEmail()
    .withMessage(errors.INVALID_EMAIL)
    .custom(async (email: string) => {
      const checkExitEmail = (await UserService.findOneByEmail(email))[0];
      if (checkExitEmail) {
        return Promise.reject(errors.EXISTS_EMAIL);
      }
      return true;
    }),
];

export const checkExistsEmail = [
  body("email")
    .exists()
    .withMessage(errors.REQUIRE_EMAIL)
    .withMessage(errors.REQUIRE_EMAIL)
    .isEmail()
    .withMessage(errors.INVALID_EMAIL)
    .custom(async (email: string) => {
      const checkExitEmail = (await UserService.findOneByEmail(email))[0];
      if (!checkExitEmail) {
        return Promise.reject(errors.EMAIL_NOT_EXISTS);
      }
      return true;
    }),
];

export const checkRef = [
  body("ref")
    .optional()
    .custom(async (ref: number) => {
      if(!ref) return true;
      const checkRef = await UserService.getUser(ref);
      if (!checkRef) {
        return Promise.reject(errors.INVALID_REF);
      }
      return true;
    }),
];

export const checkPassword = [
  body("password")
    .exists()
    .withMessage(errors.REQUIRE_PASSWORD)
    .notEmpty()
    .withMessage(errors.REQUIRE_PASSWORD),
];
