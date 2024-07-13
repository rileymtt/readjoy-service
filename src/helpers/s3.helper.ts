import { GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const S3_BUCKET = process.env.S3_BUCKET;
const path = require("path");
const uuid = require("uuid"); // to generate a random string
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

export const maxFileSize = 5;

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const randomFileName = () => {
  const timestamp = Date.now().toString(); // get the current timestamp as a string
  const randomStr = uuid.v4(); // generate a random string using uuid
  const imageName = `${timestamp}-${randomStr}`; // combine the timestamp and random string with a file extension
  return imageName;
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req: any, file: any, cb: any) {
      const extension = path.extname(file.originalname);
      const name = path.basename(randomFileName(), extension);
      const timestamp = Date.now().toString();
      const key = `${name}_${timestamp}${extension}`;
      cb(null, key);
    },
  }),
  limits: { fileSize: 1024 * 1024 * maxFileSize }, // Set the file size limit to 2 MB
});

// Set up multer middleware
export const s3Upload = upload.array("images", 10); // 10 is the max number of files;

export const getLink = async (fileName: any) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
  };
  const command = new GetObjectCommand(params);
  const data = await s3
    .send(command)
    .then(async () => {
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return signedUrl;
    })
    .catch((error: any) => {
      console.error(error);
      return false;
    });
  return data;
};

const listParams = {
  Bucket: S3_BUCKET,
};

export async function listImages() {
  try {
    const command = new ListObjectsCommand(listParams);
    const response = await s3.send(command);

    // Process the list of objects (images)
    const imageObjects = response.Contents;
    const images: string[] = [];
    imageObjects.forEach((object: any) => {
      images.push(
        `https://realbewhy-storage.s3.us-east-1.amazonaws.com/${object.Key}`
      );
    });
    return images;
  } catch (error) {
    console.error("Error listing images:", error);
  }
}
