import "dotenv/config";
import "reflect-metadata";
import "./Shared/Util/Container/index";

import { indexRoutes } from "@Routes/_index";
import { HandleJobsCron } from "@Shared/Jobs/NodeCron/NodeCron";
import { MiddlewareLocalizeResponseLanguage } from "@Shared/Middlewares/MiddlewareLocalizeResponseLanguage";
import { MiddlewareRequestLanguage } from "@Shared/Middlewares/MiddlewareRequestLanguage";
import { zEnv } from "@Shared/Util/Env";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import { ZodAppError } from "@Shared/Util/Errors/ZodAppError";
import { logger } from "@Shared/Util/Logger";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import morgan from "morgan";

const app = express();

HandleJobsCron();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use(MiddlewareRequestLanguage);
app.use(MiddlewareLocalizeResponseLanguage);

app.use(indexRoutes);

if (zEnv.NODE_ENV === "PROD") {
	process.on("uncaughtException", (error) => logger.error(error));
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(err);

	// MiddlewareVerifyFilesToDeleteInS3(req);

	const lng = req.language;

	if (err instanceof ZodAppError) {
		if (zEnv.ZOD_ERROR_TYPE === "SIMPLE") {
			return res.status(err.statusCode).json({ codeIntern: err.content.codeIntern, message: err.content.errors[0].message });
		}

		return res.status(err.statusCode).json(err.content);
	}

	if (err instanceof AppError) {
		const message = err.content.message[lng];
		const codeIntern = err.content.codeIntern;
		return res.status(err.statusCode).json({ codeIntern, message });
	}

	const message = ErrorDictionary.INTERN.unknown_error.message[lng];
	const codeIntern = ErrorDictionary.INTERN.unknown_error.codeIntern;

	res.status(500).json({ codeIntern, message });

	return next();
});

export { app };
