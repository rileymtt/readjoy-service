import { NextFunction, Request, RequestHandler, Response } from "express";
import { getLink, maxFileSize, s3Upload } from "helpers/s3.helper";
import uploadImageModel from "models/upload-image.model";

const getImage: RequestHandler = async (req: Request, res: Response) => {
  const fileName = req.query["file-name"];
  const data = await getLink(fileName);
  res.status(200).json({ url: data });
};

const upload: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { verifyUser } = req.body;
  return s3Upload(req, res, function (err: any) {
    if (err) {
      console.error("Error uploading files:", err);
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          massage: `File size limit exceeded. Maximum: ${maxFileSize}MB`,
          code: "",
        });
      }
      return res.status(500).json("Internal Server Error");
    }
    const uploadedImages = req.files.map((file: any) => file.location);
    uploadImageModel.multiCreate(uploadedImages, verifyUser.id);
    res.status(200).json(uploadedImages);
  });
};

export const s3Controller = {
  getImage,
  upload,
};
