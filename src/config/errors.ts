export default {
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  },
  INSUFFICIENT_BALANCES: {
    code: "INSUFFICIENT_BALANCES",
    message: "Insufficient Balances",
  },
  INVALID_AMOUNT: {
    code: "INVALID_AMOUNT",
    message: "Invalid amount",
  },
  INVALID_ARTICLE_ID: {
    code: "INVALID_ARTICLE_ID",
    message: "Invalid article ID",
  },
  INVALID_USER_ID: {
    code: "INVALID_USER_ID",
    message: "Invalid user ID",
  },
  INVALID_PASSWORD: {
    message: "Password is invalid",
    code: "INVALID_PASSWORD",
  },
  INVALID_SIGNATURE: {
    code: "INVALID_SIGNATURE",
    message: "Signature is invalid",
  },
  INVALID_WALLET_ADDRESS: {
    code: "INVALID_WALLET_ADDRESS",
    message: "Invalid wallet address",
  },
  REQUIRE_WALLET_ADDRESS: {
    code: "REQUIRE_WALLET_ADDRESS",
    message: "Require wallet address",
  },
  REQUIRED_TITLE: {
    code: "REQUIRED_TITLE",
    message: "Title is require",
  },
  REQUIRE_PASSWORD: { code: "REQUIRE_PASSWORD", message: "Require password" },
  CATEGORY_NOT_SUPPORT_FOR_USER: {
    code: "CATEGORY_NOT_SUPPORT_FOR_USER",
    message: "This category it not support for user",
  },
  NOT_OWNER_ARTICLE: {
    code: "NOT_OWNER_ARTICLE",
    message: "You are not article owner",
  },
  NOT_EXISTS_ARTICLE: {
    code: "NOT_EXISTS_ARTICLE",
    message: "Article not exists",
  },
  ACCOUNT_NOT_EXISTS: {
    code: "ACCOUNT_NOT_EXISTS",
    message: "Account not exists",
  },
  REQUIRE_FIELD: { code: "REQUIRE_FIELD", message: "Require field" },
  CANNOT_BLOCK_YOURSELF: {
    code: "CANNOT_BLOCK_YOURSELF",
    message: "You can't block yourself",
  },
  NOT_EXISTS: { code: "NOT_EXISTS", message: "Not exists" },
  NOT_OWNER: { code: "NOT_OWNER", message: "You are not owner" },
  INVALID_PARAMS: { code: "INVALID_PARAMS", message: "Invalid params" },
  BLOCKED_ACCOUNT: {
    code: "BLOCKED_ACCOUNT",
    message: "Account is blocked. Please contact support.",
  },
  WALLET_ADDRESS_IS_LINKED: {
    code: "WALLET_ADDRESS_IS_LINKED",
    message: "Wallet address is linked with other account",
  },
  BAD_JSON: { code: "BAD_JSON", message: "Invalid json" },
  pinballGame: {
    PROCESSING_GAME: {
      code: "PROCESSING_GAME",
      message: "Game is processing",
    },
    FULL_SLOT_REACHED: {
      code: "FULL_SLOT_REACHED",
      message: "Full slot reached",
    },
    GAME_NOT_EXISTS: { code: "GAME_NOT_EXISTS", message: "Game not exists" },
    MAX_BALLS: {
      code: "MAX_BALLS",
      message: "Please set max balls less than 300",
    },
  },
  memo: {
    MEMO_NOT_HAVE_POINT: {
      code: "MEMO_NOT_HAVE_POINT",
      message: "Memo is not have point",
    },
    MEMO_GOT_POINT: {
      code: "MEMO_GOT_POINT",
      message: "You got point at this memo",
    },
  },

  //? email
  EXISTS_EMAIL: { code: "EXISTS_EMAIL", message: "Email already exists" },
  REQUIRE_EMAIL: { code: "REQUIRE_EMAIL", message: "Require email" },
  INVALID_EMAIL: { code: "INVALID_EMAIL", message: "Invalid email" },
  EMAIL_NOT_EXISTS: { code: "EMAIL_NOT_EXISTS", message: "Email not exists" },
  ANSWERED_QUESTION: {
    code: "ANSWERED_QUESTION",
    message: "You have answered this question",
  },
  THIS_ACTION_HAS_BEEN_TAKEN: {
    code: "THIS_ACTION_HAS_BEEN_TAKEN",
    message: "This action has already been taken",
  },
  INVALID_REF: { code: "INVALID_REF", message: "Invalid ref" },

  //? mining point
  HAS_MINING_POINT_TODAY: {
    code: "HAS_MINING_POINT_TODAY",
    message: "You have mining point today. Please try again tomorrow",
  },
  TIME_IS_NOT_OVER_YET: {
    code: "TIME_IS_NOT_OVER_YET",
    message: "Time is not over yet. Please try again later",
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Not found",
  },
};
