import type { IErrorLanguages } from "./Dictionary/schema";

export class AppError {
	public readonly content: IErrorLanguages;
	public readonly statusCode: number;

	constructor(content: IErrorLanguages, statusCode = 400) {
		this.content = content;
		this.statusCode = statusCode;
	}
}
