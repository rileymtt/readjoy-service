import errors from "config/errors";
const { body } = require("express-validator");

export const checkCreateMemo = [
  body("content")
    .exists()
    .withMessage(errors.REQUIRE_FIELD)
    .notEmpty()
    .withMessage(errors.REQUIRE_FIELD),
  body("recipientIds")
    .exists()
    .withMessage(errors.REQUIRE_FIELD)
    .notEmpty()
    .withMessage(errors.REQUIRE_FIELD)
    .isArray()
    .withMessage(errors.INVALID_PARAMS),
  body("points").optional(),
  body("replyMemoId").optional().isNumeric().withMessage(errors.INVALID_PARAMS),
];
