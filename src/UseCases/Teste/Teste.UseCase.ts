import { prisma } from "@Config/Prisma/prisma";
import { generateFbp, generateTextSHA256, normalizeState } from "@Shared/features/_helper/functions";
import { zEnv } from "@Shared/Util/Env";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import { handleGenerateUuid } from "@Shared/Util/Helpers/Generators/GenerateUuid";
import { ZODVerifyParse } from "@Shared/Util/ZOD/Parse";
import type { IOrderResponse } from "@UseCases/Conection/Connection.Types";
import axios, { isAxiosError } from "axios";
import dayjs from "dayjs";
import type { Request, Response } from "express";
import { injectable } from "tsyringe";
import { TesteRequestSchema } from './Teste.Schema.Request';

@injectable()
export class TesteUseCase {
	constructor() {}

	async execute(request: Request, _response: Response) {
		const {
			query: { pixelid, token, transaction_id, payout_amount, ...rest },
		} = ZODVerifyParse({
			schema: TesteRequestSchema,
			request,
		});

		// const datas = await prisma.user.findMany({
		// 	where: {
		// 		type: "PURCHASE"
		// 	}
		// })

		// for(const data of datas) {
		// 	try {
		// 		const params = JSON.parse(data.data);
		// 		console.log(params);

		// 		await axios.get(`http://localhost:3333/connection`, {
		// 			params
		// 		})
				
		// 	} catch (error) {
		// 		if (isAxiosError(error)) {
		// 			console.log(error.response?.data);
		// 		} else {
		// 			console.log(error);
		// 		}
		// 	}
		// }

		return { message: "Teste successful" };
	}
}

//utmfy yzR0sRTYzMCppMvdKikkSVbA3E45NL9j4PSF
