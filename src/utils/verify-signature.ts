import appConfig from "config/app.config";
import { ethers } from "ethers";
import { NextFunction, Response, Request } from "express";

const jwt = require("jsonwebtoken");

export function generateToken(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
}

export const checkValidWalletAddress = (walletAddress: string) => {
  return ethers.utils.isAddress(walletAddress);
};

export function authenticateSignature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const signature = authHeader && authHeader.split(" ")[1];

  if (signature == null) return res.sendStatus(401);
  try {
    const address = ethers.utils.verifyMessage(
      appConfig.SignMessage,
      signature
    );
    const validAddress = ethers.utils.isAddress(address);
    if (address && validAddress) {
      req.body = address;
      next();
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    return res.sendStatus(403);
  }
}
