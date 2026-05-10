import type { Request, Response } from "express";

import { container } from "tsyringe";
import { TesteUseCase } from './Teste.UseCase';


class TesteController {
	constructor(private TesteUseCase: TesteUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const data = await this.TesteUseCase.execute(request, response);

		return response.status(200).json(data);
	}
}

export const TesteControllerIndex = new TesteController(container.resolve(TesteUseCase));
