import type { zEnv } from "@Shared/Util/Env";

export type ServerLanguages = typeof zEnv.SERVER_LANGUAGES;

type IMessageResponseSchema = Record<ServerLanguages, string>;

export type IErrorLanguages = {
	codeIntern: string;
	message: IMessageResponseSchema;
};

export type IErrorDictionary = {
	[category: string]: {
		[errorKey: string]: IErrorLanguages;
	};
};
