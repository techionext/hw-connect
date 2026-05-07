import type { Request, Response } from "express";

import { container } from "tsyringe";
import { ConnectionUseCase } from "./Connection.UseCase";

class ConnectionController {
	constructor(private ConnectionUseCase: ConnectionUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const data = await this.ConnectionUseCase.execute(request, response);

		return response.status(200).json(data);
	}
}

export const ConnectionControllerIndex = new ConnectionController(container.resolve(ConnectionUseCase));
