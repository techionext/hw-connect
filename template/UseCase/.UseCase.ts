import { ZODVerifyParse } from "@Shared/Util/ZOD/Parse";
import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { REPLACERequestSchema } from "./Schema/REPLACE.Schema.Request";

@injectable()
export class REPLACEUseCase {
	constructor(@inject("REPOSITORY") private REPOSITORY: IREPOSITORY) {}

	async execute(request: Request, response: Response) {
		const {
			body: {},
		} = ZODVerifyParse({
			schema: REPLACERequestSchema,
			request,
		});

		const returnResponse = {};
		return returnResponse;
	}
}
