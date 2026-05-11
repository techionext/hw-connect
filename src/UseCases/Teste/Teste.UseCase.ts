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

		const datas = await prisma.user.findMany({
			where: {
				type: "PURCHASE"
			}
		})

		console.log(datas.length);

		const ids = ["8178e54beea64ead9031da8d5cc4b897",
			"cf94394bcfcd4857b58f983ccb187c1f",
			"7b386b0c1b934c6a91193853f380182e",
			"7f13442cb6134db199bdcce214c70a34",
			"a72f3f3f7ff64a6fbc60ce1d07d734cc",
			"621d1a46c0524d7ab688167196135e28",
			"c32850d9789d43a2ac884415b69abaf0",	
			"7565bedec10540db9b7def703c801075",
			"4948f11820d74a95b05bd204cc01ad14",
			"750e22e9615e4dbd83b0c74b8b52d88c"]

		for(const id of ids) {
			try {
				await axios.get(`https://hw-connect-production.up.railway.app/connection`, {
					params: {
						transaction_id: id,
						token: "OHxhArViMquyuZpFCy0TEH8p0OEfObORjRdI",
						payout_amount: 245,
					}
				})
			} catch (error) {
				if (isAxiosError(error)) {
					console.log(error.response?.data);
				} else {
					console.log(error);
				}
			}
		}

		return { message: "Teste successful" };
	}
}

//utmfy yzR0sRTYzMCppMvdKikkSVbA3E45NL9j4PSF
