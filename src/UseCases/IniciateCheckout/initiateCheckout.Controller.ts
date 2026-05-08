import type { Request, Response } from "express";

import { container } from "tsyringe";
import { InitiateCheckoutUseCase } from "./initiateCheckout.UseCase";

class InitiateCheckoutController {
	constructor(private InitiateCheckoutUseCase: InitiateCheckoutUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const data = await this.InitiateCheckoutUseCase.execute(request, response);

		return response.status(200).json(data);
	}
}

export const InitiateCheckoutControllerIndex = new InitiateCheckoutController(container.resolve(InitiateCheckoutUseCase));
