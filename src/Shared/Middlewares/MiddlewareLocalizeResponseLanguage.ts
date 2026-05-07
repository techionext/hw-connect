import type { RequestHandler, Response } from "express";

export const MiddlewareLocalizeResponseLanguage: RequestHandler = (req, res: Response, next) => {
	const originalJson = res.json;

	// biome-ignore lint/suspicious/noExplicitAny: false positive
	res.json = function (body: any): Response {
		let processedBody = body;

		if (
			processedBody &&
			typeof processedBody === "object" &&
			processedBody.codeIntern &&
			processedBody.message &&
			typeof processedBody.message === "object" &&
			req.language
		) {
			const lng = req.language;
			const localizedMessage = processedBody.message[lng];

			processedBody = {
				...processedBody,
				message: localizedMessage,
			};
		}

		return originalJson.call(this, processedBody);
	};

	return next();
};
