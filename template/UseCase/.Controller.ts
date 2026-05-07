import type { Request, Response } from "express";

import { container } from "tsyringe";
import { REPLACEUseCase } from "./REPLACE.UseCase";

class REPLACEController {
	constructor(private REPLACEUseCase: REPLACEUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const data = await this.REPLACEUseCase.execute(request, response);

		return response.status(200).json(data);
	}
}

export const REPLACEControllerIndex = new REPLACEController(container.resolve(REPLACEUseCase));
