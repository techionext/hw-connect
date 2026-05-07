import type { IErrorDetail } from "../ZOD/Parse";

export class ZodAppError {
	public readonly content: {
		codeIntern: string;
		message: string;
		errors: IErrorDetail[];
	};

	public readonly statusCode: number;

	constructor(content: { codeIntern: string; message: string; errors: IErrorDetail[] }, statusCode = 422) {
		this.content = content;
		this.statusCode = statusCode;
	}
}
