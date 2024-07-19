import bookController from "controllers/book.controller";
import newReleaseBooks from "data/new-release-books";
import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "utils/jwt";

export const BookRouter = Router();

BookRouter.get(
  "/popular",
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(newReleaseBooks);
  }
);
BookRouter.get("/", authenticateToken, bookController.get);
BookRouter.get("/:id", authenticateToken, bookController.getById);
BookRouter.post("/", authenticateToken, bookController.create);
BookRouter.put("/:id", authenticateToken, bookController.update);
BookRouter.delete("/:id", authenticateToken, bookController.delete);
