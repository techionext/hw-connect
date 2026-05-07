import { envZod } from "./schema";

export const zEnv = {
	PORT: envZod.data.PORT,

	NODE_ENV: envZod.data.NODE_ENV,

	ZOD_ERROR_TYPE: envZod.data.ZOD_ERROR_TYPE,

	SERVER_LANGUAGES: envZod.data.SERVER_LANGUAGES,

	SPARKCRM_API_KEY: envZod.data.SPARKCRM_API_KEY,
};
