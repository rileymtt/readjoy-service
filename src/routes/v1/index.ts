import { quotes } from "data/quotes";
import { NextFunction, Request, Response, Router } from "express";
import { BookRouter } from "./book.routes";
import { s3Routes } from "./s3.routes";
import userRouter from "./user.routes";
import newReleaseBooks from "data/new-release-books";
const V1Router = Router();

V1Router.use("/user", userRouter);
V1Router.use("/s3", s3Routes);
V1Router.use("/book", BookRouter);
V1Router.get("/quote", (req: Request, res: Response, next: NextFunction) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  res.status(200).json(quote);
});
export default V1Router;
