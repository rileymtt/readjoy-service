import { Router } from "express";
import { BookRouter } from "./book.routes";
import { s3Routes } from "./s3.routes";
import userRouter from "./user.routes";
const V1Router = Router();

V1Router.use("/user", userRouter);
V1Router.use("/s3", s3Routes);
V1Router.use("/book", BookRouter);

export default V1Router;
