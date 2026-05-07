import { zEnv } from "@Shared/Util/Env";
import { AppError } from "@Shared/Util/Errors/AppError";

import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";

import { GenerateJwtToken } from "@Shared/Util/Helpers/Generators/GenerateJwtToken";
import type { tokenField } from "@Shared/Util/ZOD/Fields/Custom/token";
import type { RequestHandler } from "express";

import jwt from "jsonwebtoken";
import type z from "zod";

export const MiddlewareVerifyToken: RequestHandler = async (req, _res, next) => {
	const queryToken = `Bearer ${req.query.token}`;
	const authToken = req.headers.authorization ?? queryToken;
	const SECRET = zEnv.JWT_SECRET_TOKEN;

	if (!authToken) throw new AppError(ErrorDictionary.AUTH.required, 401);

	const [Bearer, token] = authToken.split(" ");
	if (Bearer && Bearer !== "Bearer") throw new AppError(ErrorDictionary.AUTH.invalid_token_format, 401);

	let resultToken = token;

	jwt.verify(resultToken, SECRET, { ignoreExpiration: true }, (err, decoded) => {
		if (err) throw new AppError(ErrorDictionary.AUTH.invalid_token_format, 401);

		const decodedToken = decoded as z.infer<typeof tokenField>;
		resultToken = GenerateJwtToken({ ...decodedToken });
	});

	return jwt.verify(resultToken, SECRET, (err, decoded) => {
		if (err?.message === "jwt expired") throw new AppError(ErrorDictionary.AUTH.expired_session, 401);
		if (err) throw new AppError(ErrorDictionary.AUTH.invalid_token_format, 401);

		const token = decoded as z.infer<typeof tokenField>;

		if (!token.user.id) throw new AppError(ErrorDictionary.AUTH.invalid_token_format, 401);

		req.body = {
			...req.body,
			token,
		};

		return next();
	});
};
