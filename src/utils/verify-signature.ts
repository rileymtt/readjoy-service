const jwt = require("jsonwebtoken");
export function generateToken(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
}
