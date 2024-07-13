import { AppError } from "exceptions/AppError";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Helper } from "helpers";
import profileModel from "models/profile.model";
import { ProfileService, UserService } from "services";

export const updateProfile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error(errors);
      error.status = 400;
      throw error;
    }
    const { verifyUser, fields } = req.body;
    const result = await profileModel.update(verifyUser.id, fields);
    UserService.syncUser(verifyUser.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateAvatar: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      next(errors);
      throw new AppError(401, "", errors);
    }
    const { verifyUser, imageUrl } = req.body;
    await ProfileService.updateAvatar(verifyUser.id, imageUrl);
    UserService.syncUser(verifyUser.id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCoverPicture: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = Helper.validation.validationResult(req);
    if (!errors.isEmpty()) {
      next(errors);
      throw new AppError(401, "", errors);
    }
    const { verifyUser, imageUrl } = req.body;
    await ProfileService.updateCoverPicture(verifyUser.id, imageUrl);
    UserService.syncUser(verifyUser.id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
