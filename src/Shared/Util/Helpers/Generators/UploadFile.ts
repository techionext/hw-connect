import { AWS_S3 } from "@Config/AWS/S3";
import { zEnv } from "@Shared/Util/Env";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import { logger } from "@Shared/Util/Logger";
import { PutObjectCommand } from "@aws-sdk/client-s3";

interface IUploadFile {
	file: { buffer: Buffer; originalname: string };
	prefixUrl: string;
	key: string;
}

const sanitizeKey = (key: string) => {
	const lastPart = key.split("/");

	if (lastPart.length > 1) {
		return lastPart[lastPart.length - 1];
	}

	return key;
};

export const UploadFile = async ({ file, key, prefixUrl }: IUploadFile) => {
	try {
		const { fileTypeFromBuffer } = await import("file-type");
		const fileType = await fileTypeFromBuffer(file.buffer);

		if (!fileType) {
			throw new AppError(ErrorDictionary.UPLOAD.type_invalid);
		}

		const s3Key = `${prefixUrl}/${sanitizeKey(key)}`;

		const command = new PutObjectCommand({
			Bucket: zEnv.AWS.S3.NAME_BUCKET,
			Key: s3Key,
			Body: file.buffer,
			ContentType: fileType.mime,
			ACL: "public-read",
		});

		const result = await AWS_S3.send(command);
		const imageUrl = `https://${zEnv.AWS.S3.NAME_BUCKET}.s3.${zEnv.AWS.S3.DEFAULT_REGION}.amazonaws.com/${s3Key}`;
		const versionId = result.VersionId;

		return {
			success: true as true,
			file: {
				url: imageUrl,
				size: result.Size || file.buffer.length,
				originalName: file.originalname,
				mimeType: fileType.mime,
				key: s3Key,
				versionId,
			},
		};
	} catch (error) {
		logger.error(error);

		return {
			success: false as false,
			file: null,
		};
	}
};
