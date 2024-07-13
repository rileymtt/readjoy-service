import ErrorList from "config/errors";
import { AppError } from "exceptions/AppError";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Helper } from "helpers";
import userModel from "models/user.model";
import { UserService } from "services";
import { generateToken } from "utils/jwt";

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(400, "", errors.array());
    }
    const { email, password, ref } = req.body;
    Helper.bcrypt.hash(password, 10, async (err: any, hash: string) => {
      if (err) {
        console.error("Error hashing password: ", err);
        next(err);
      }
      UserService.createUser(email, hash, undefined, ref);
      if (ref) UserService.syncUser(ref);
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(400, "", errors.array());
    }
    const { email, password } = req.body;
    const account = (await UserService.findOneByEmail(email))[0];
    if (!account.status) {
      throw new AppError(400, "", [ErrorList.BLOCKED_ACCOUNT]);
    }

    const checkPassword = await Helper.bcrypt.compare(
      password,
      account.password
    );

    if (!checkPassword) {
      throw new AppError(401, "", [ErrorList.INVALID_PASSWORD]);
    }

    const accessToken = generateToken({
      id: account.id,
      walletAddress: account.walletAddress,
      email: account.email,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const getProfile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(401, "", errors);
    }
    const { verifyUser } = req.body;
    const data = await UserService.getUser(verifyUser.id);
    if (!data) {
      throw new AppError(400, "", [ErrorList.ACCOUNT_NOT_EXISTS]);
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.query.id);
    if (isNaN(id)) {
      throw new AppError(400, "", [ErrorList.ACCOUNT_NOT_EXISTS]);
    }
    let data = await UserService.getUser(id);
    if (!data) {
      throw new AppError(400, "", [ErrorList.ACCOUNT_NOT_EXISTS]);
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateUsername: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(401, "", errors);
    }
    const { verifyUser, username } = req.body;
    await userModel.update(verifyUser.id, { username });
    UserService.syncUser(verifyUser.id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRef: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verifyUser, ref } = req.body;
    if (!ref) {
      throw new AppError(400, "", [ErrorList.REQUIRE_FIELD]);
    }
    UserService.updateRef(verifyUser.id, ref);
    UserService.syncUser(verifyUser.id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAccount: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(400, "", errors.array());
    }

    const { email, password, verifyUser } = req.body;

    Helper.bcrypt.hash(password, 10, (err: any, hash: string) => {
      if (err) {
        console.error("Error hashing password: ", err);
        next(err);
      }
      UserService.updateAccount(verifyUser.id, email, hash);
      UserService.syncUser(verifyUser.id);
      res.status(200).json({ success: true });
    });

    UserService.syncUser(verifyUser.id);
  } catch (error) {
    next(error);
  }
};

export const disableAccount: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verifyUser } = req.body;
    UserService.disableAccount(verifyUser.id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
