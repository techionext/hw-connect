import "dotenv/config";

import { z } from "zod";

import { logger } from "../Logger";
import { enumField, numberField, stringField } from "../ZOD/Fields/zod";

const envSchema = z.object({
	PORT: numberField().default(3001),

	NODE_ENV: enumField(["DEV", "PROD", "TEST", "LOCAL"]).default("PROD"),

	ZOD_ERROR_TYPE: enumField(["SIMPLE", "ADVANCED"]).default("SIMPLE"),

	SERVER_LANGUAGES: enumField(["PT_BR", "EN_US"]).default("PT_BR"), // aqui define novas linguagens

	SPARKCRM_API_KEY: stringField(),

	DATABASE_URL: stringField(),
});

const SchemaResult = envSchema.safeParse(process.env);
if (SchemaResult.success === false) {
	const errorMessage = SchemaResult.error.issues
		.map((issue) => {
			if (issue.message === "Required") return `\nMissing environment variable: ${issue.path[0]} | ${issue.message}`;
			if (issue.code === "invalid_enum_value")
				return `\nInvalid environment variable: ${issue.path[0]}. Possible values: ${issue.options.join(" | ")}`;
			return `\nInvalid environment variable: ${issue.path[0]} | ${issue.message}`;
		})
		.join("");

	logger.fatal(errorMessage);
	throw new Error();
}

export const envZod = SchemaResult;
