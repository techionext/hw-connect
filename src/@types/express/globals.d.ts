import type { ServerLanguages } from "@Shared/Util/Errors/Dictionary/schema";

declare global {
	namespace Express {
		interface Request {
			language: ServerLanguages;
			body: {
				token: IGenerateJwtToken;
			};
		}
	}
}
