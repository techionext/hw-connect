import { localStorage } from "@Config/Multer/Config";
import { zEnv } from "@Shared/Util/Env";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import type { RequestHandler } from "express";
import multer from "multer";

enum MimeType {
	ALL = "all",
	JPEG = "image/jpeg",
	PNG = "image/png",
	GIF = "image/gif",
	BMP = "image/bmp",
	WEBP = "image/webp",
	SVG = "image/svg+xml",
	TIFF = "image/tiff",
	MP3 = "audio/mpeg",
	WAV = "audio/wav",
	OGG_AUDIO = "audio/ogg",
	WEBM_AUDIO = "audio/webm",
	MP4 = "video/mp4",
	WEBM_VIDEO = "video/webm",
	OGG_VIDEO = "video/ogg",
	PDF = "application/pdf",
	DOC = "application/msword",
	DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	XLS = "application/vnd.ms-excel",
	XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	PPT = "application/vnd.ms-powerpoint",
	PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	ZIP = "application/zip",
	RAR = "application/x-rar-compressed",
	TAR = "application/x-tar",
	GZIP = "application/gzip",
	SEVEN_ZIP = "application/x-7z-compressed",
	TEXT = "text/plain",
	CSV = "text/csv",
	HTML = "text/html",
	JSON = "application/json",
	XML = "application/xml",
}

type MimeTypeOption = keyof typeof MimeType;

interface INewMulterMiddleware {
	fields: { name: string; type: "array" | "single" }[];
	typeImage: "fields" | "array" | "single";
	sizeLimit: number;
	allowedMimes: MimeTypeOption[];
}

export const MiddlewareUploadFiles = ({ sizeLimit, typeImage, fields, allowedMimes }: INewMulterMiddleware): RequestHandler => {
	const storage = zEnv.LOCAL_TO_UPLOAD_FILES === "LOCAL" ? localStorage : multer.memoryStorage(); // Usar memoryStorage para S3

	const upload = multer({
		storage,
		limits: { fileSize: sizeLimit },
		fileFilter: (req, file, cb) => {
			const validMimes = allowedMimes.map((mime) => MimeType[mime] as string);

			if (validMimes.includes(file.mimetype) || validMimes.includes("all")) {
				cb(null, true);
			} else {
				throw new AppError(ErrorDictionary.UPLOAD.type_invalid);
			}
		},
	});

	return (req, res, next) => {
		// biome-ignore lint/suspicious/noExplicitAny: false positive
		let uploadMiddleware: any;

		switch (typeImage) {
			case "single":
				uploadMiddleware = upload.single(fields[0].name);
				break;

			case "array":
				uploadMiddleware = upload.array(fields[0].name);
				break;

			case "fields":
				uploadMiddleware = upload.fields(fields.map(({ name }) => ({ name })));
				break;

			default:
				throw new AppError(ErrorDictionary.INTERN.invalid_request, 500);
		}

		uploadMiddleware(req, res, (err: Error) => {
			if (err) {
				return next(err);
			}

			switch (typeImage) {
				case "single":
					if (req.file) {
						req.body[fields[0].name] = { buffer: req.file.buffer, originalname: req.file.originalname };
					}
					req.file = undefined;
					break;

				case "array":
					if (req.files && Array.isArray(req.files)) {
						req.body[fields[0].name] = req.files.map((file) => ({ buffer: file.buffer, originalname: file.originalname }));
					}
					req.files = undefined;
					break;

				case "fields":
					for (const field of fields) {
						if (field.type === "array") {
							req.body[field.name] = (req.files as Record<string, Express.Multer.File[]>)[field.name]?.map((file) => ({
								buffer: file.buffer,
								originalname: file.originalname,
							}));
						}

						if (field.type === "single") {
							const files = (req.files as Record<string, Express.Multer.File[]>)[field.name];
							req.body[field.name] = files?.length ? { buffer: files[0].buffer, originalname: files[0].originalname } : undefined;
						}
					}
					req.files = undefined;
					break;
			}

			return next();
		});
	};
};
