import { zEnv } from "@Shared/Util/Env";
import type { ServerLanguages } from "@Shared/Util/Errors/Dictionary/schema";
import type { RequestHandler } from "express";

const LanguageMap: Record<string, ServerLanguages> = {
	pt: "PT_BR",
	PT_BR: "PT_BR",
};

const GetValidLanguage = (acceptLanguage?: string): ServerLanguages => {
	if (!acceptLanguage) return zEnv.SERVER_LANGUAGES;

	const languages = acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim());

	for (const lang of languages) {
		if (LanguageMap[lang]) {
			return LanguageMap[lang];
		}
	}

	return zEnv.SERVER_LANGUAGES;
};

export const MiddlewareRequestLanguage: RequestHandler = (req, _res, next) => {
	req.language = GetValidLanguage(req.headers["accept-language"]);

	return next();
};
