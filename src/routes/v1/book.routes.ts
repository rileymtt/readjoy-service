import bookController from "controllers/book.controller";
import { Router } from "express";
import { authenticateToken } from "utils/jwt";

export const BookRouter = Router();

BookRouter.get("/", authenticateToken, bookController.get);
BookRouter.get("/:id", authenticateToken, bookController.getById);
BookRouter.post("/", authenticateToken, bookController.create);
BookRouter.put("/:id", authenticateToken, bookController.update);
BookRouter.delete("/:id", authenticateToken, bookController.delete);
