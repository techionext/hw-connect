import { zEnv } from "@Shared/Util/Env";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import { ZodAppError } from "@Shared/Util/Errors/ZodAppError";
import type { Request } from "express";
import { z } from "zod";
import { localizeZodError } from "./localizeZodError";

interface IZODVerifyParse<T extends z.ZodTypeAny> {
	schema: T;
	request: Request;
}

export interface IErrorDetail {
	field: string;
	message: string;
}

export const ZODVerifyParse = <T extends z.ZodTypeAny>({ schema, request }: IZODVerifyParse<T>): z.infer<T> => {
	try {
		return schema.parse({
			params: request.params || {},
			query: request.query || {},
			body: request.body || {},
		});
	} catch (error) {
		const lng = request.language;

		if (error instanceof z.ZodError) {
			const errors = error.issues.map((issue) => {
				return {
					field: zEnv.ZOD_ERROR_TYPE === "SIMPLE" ? issue.path[issue.path.length - 1].toString() : issue.path.join("."),
					message: localizeZodError(issue, lng),
				};
			});

			const codeIntern = ErrorDictionary.INTERN.invalid_request.codeIntern;
			const message = ErrorDictionary.INTERN.invalid_request.message[lng];
			throw new ZodAppError({ message, codeIntern, errors }, 422);
		}

		throw new AppError(ErrorDictionary.INTERN.invalid_request, 422);
	}
};
