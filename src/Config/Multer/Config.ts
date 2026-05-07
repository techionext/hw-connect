import { AWS_S3 } from "@Config/AWS/S3";
import { handleCreateHashImg } from "@Shared/features/handleCreateHashImg";
import { zEnv } from "@Shared/Util/Env";
import multer from "multer";
import MulterS3 from "multer-s3";

export const s3Storage = MulterS3({
	s3: AWS_S3,
	bucket: zEnv.AWS.S3.NAME_BUCKET,
	contentType: MulterS3.AUTO_CONTENT_TYPE,
	acl: "public-read",

	key: (req, file, cb) => {
		const key = handleCreateHashImg(file.originalname);
		cb(null, key);
	},
});

export const localStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},

	filename: (req, file, cb) => {
		cb(null, handleCreateHashImg(file.originalname));
	},
});
