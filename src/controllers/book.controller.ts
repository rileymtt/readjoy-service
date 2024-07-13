import { NextFunction, Request, RequestHandler, Response } from "express";
import bookModel from "models/book.model";

export default {
  get: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { verifyUser } = req.body;
      const result = await bookModel.getAll(Number(verifyUser.id));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
  getById: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await bookModel.get(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
  create: (async (req: Request, res: Response, next: NextFunction) => {
    const book = req.body as TBook;
    const { verifyUser } = req.body;
    try {
      const result = await bookModel.create({
        author: book.author,
        title: book.title,
        userId: verifyUser.id,
        image: book.image,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
  update: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const fields = req.body;
      delete fields.verifyUser;
      const result = await bookModel.update(id, fields);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
  delete: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await bookModel.delete(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
};
