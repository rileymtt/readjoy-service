import { ERoles } from "config/enums";
import errors from "config/errors";
import { AppError } from "exceptions/AppError";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Helper } from "helpers";
import administratorModel from "models/administrator.model";
import { AdminService } from "services";
import { generateToken } from "utils/jwt";

export const getAdminProfile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verifyUser } = req.body;
    const result = await administratorModel.findOne(verifyUser.id);
    result.role = ERoles[result.type];
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = Helper.validation.validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400, "", errors);
  }

  const { email, password, type } = req.body.fields;

  Helper.bcrypt.hash(password, 10, async (err: any, hash: string) => {
    if (err) {
      console.error("Error hashing password: ", err);
      next(err);
    }
    const result = await administratorModel.create(email, hash, type);
    res.status(200).json(result);
  });
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(400, "", errors);
    }
    const { email, password } = req.body;
    const account = await administratorModel.findOneByEmail(email);
    if (!account) {
      throw new AppError(401, "");
    }
    const checkPassword = await Helper.bcrypt.compare(
      password,
      account.password
    );
    if (!checkPassword) {
      throw new AppError(401, "");
    }
    const accessToken = generateToken({
      id: account.id,
      email: account.email,
      role: account.type,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const getData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.getRecords(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.insertRecord(req.body);
    res.status(200).json(result);
    next();
  } catch (error) {
    next(error);
  }
};

export const updateData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.updateRecord(req.body);
    res.status(200).json(result);
    next();
  } catch (error) {
    next(error);
  }
};

export const archiveData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.archiveRecord({
      ...req.body,
      id: req.query.id,
    });
    res.status(200).json(result);
    next();
  } catch (error) {
    next(error);
  }
};

export const deleteData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.deleteRecord({
      ...req.body,
      id: req.query.id,
    });
    res.status(200).json(result);
    next();
  } catch (error) {
    next(error);
  }
};

export const updatePassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { verifyUser } = req.body;

    const account = await administratorModel.findOne(verifyUser.id);

    if (!account) {
      throw new AppError(401, "");
    }

    const checkPassword = await Helper.bcrypt.compare(
      oldPassword,
      account.password
    );

    if (!checkPassword || !newPassword || !oldPassword) {
      throw new AppError(400, "", [errors.INVALID_PASSWORD]);
    }

    Helper.bcrypt.hash(newPassword, 10, async (err: any, hash: string) => {
      if (err) {
        console.error("Error hashing password: ", err);
        next(err);
      }
      await administratorModel.update(verifyUser.id, { password: hash });
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
};
