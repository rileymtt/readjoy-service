import { s3Controller } from "controllers/s3.controller";
import { Router } from "express";
import { authenticateToken } from "utils/jwt";

export const s3Routes = Router();

s3Routes.get("/get-link", s3Controller.getImage);
s3Routes.post("/upload", authenticateToken, s3Controller.upload);
