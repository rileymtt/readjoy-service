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
  console.log("Upload", verifyUser);

  return s3Upload(req, res, function (err: any) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          errors: [
            {
              code: "LIMIT_FILE_SIZE",
              message: `File size limit exceeded. Maximum: ${maxFileSize}MB`,
            },
          ],
        });
      }
      return res.status(500);
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
