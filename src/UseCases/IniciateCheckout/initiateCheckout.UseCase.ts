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
import { InitiateCheckoutRequestSchema } from "./initiateCheckout.Schema.Request";

@injectable()
export class InitiateCheckoutUseCase {
	constructor() {}

	async GetOrderById(orderId: string) {
		try {
			const params = {
				sub5: orderId,
			};

			const response = await axios.get(`https://api.sparkcrm.io/checkout/orders?${new URLSearchParams(params).toString()}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${zEnv.SPARKCRM_API_KEY}`,
				},
			});

			return response.data as IOrderResponse;
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(error.response?.data);
			} else {
				console.log(error);
			}

			throw new AppError(ErrorDictionary.INTERN.unknown_error, 400);
		}
	}

	async execute(request: Request, _response: Response) {
		const {
			query: { pixelId, token, transaction_id, payout_amount, ...rest },
		} = ZODVerifyParse({
			schema: InitiateCheckoutRequestSchema,
			request,
		});

		await prisma.user.create({
			data: {
				id: handleGenerateUuid(),
				data: JSON.stringify({ pixelId, token, transaction_id, payout_amount, ...rest }),
				type: "INITIATE_CHECKOUT",
			},
		});

		const dataOrders = await this.GetOrderById(transaction_id);

		if (!dataOrders) throw new AppError(ErrorDictionary.INTERN.unknown_error, 400);

		const order = dataOrders.data[0].orders[0];

		if (!order) throw new AppError(ErrorDictionary.INTERN.unknown_error, 400);

		const address = dataOrders.data[0].addresses[0];

		const orderCreatedAt = dayjs(order?.created_at);
		const now = dayjs();
		const eventTime = orderCreatedAt.isAfter(now) ? now.unix() : orderCreatedAt.unix();

		const body = {
			data: [
				{
					event_id: handleGenerateUuid(),
					event_name: "InitiateCheckout",
					event_time: eventTime,
					action_source: "website",
					event_source_url: "",
					user_data: {
						em: generateTextSHA256(dataOrders.data[0]?.email || ""),
						ph: dataOrders.data[0]?.phone ? generateTextSHA256(dataOrders.data[0]?.phone as string) : undefined,
						fn: generateTextSHA256(dataOrders.data[0]?.first_name || ""),
						ln: generateTextSHA256(dataOrders.data[0]?.last_name || ""),

						ct: address?.city ? generateTextSHA256(normalizeState(address.city)) : undefined,
						st: address?.state_province ? generateTextSHA256(normalizeState(address.state_province)) : undefined,
						zp: address?.postal_code ? generateTextSHA256(address.postal_code) : undefined,
						country: address?.country_code ? generateTextSHA256(address.country_code) : undefined,

						external_id: dataOrders.data[0]?.customer_number ? generateTextSHA256(dataOrders.data[0]?.customer_number) : undefined,
						subscription_id: undefined,

						client_ip_address: undefined,
						client_user_agent: undefined,
						fbc: undefined,
						fbp: generateFbp(),
					},
					custom_data: {
						content_type: "product",
						currency: order.currency,
						value: payout_amount,
						contents: order.cart.items.map((product) => ({
							id: product.id,
							quantity: product.quantity,
							value: product.unit_price,
						})),
					},
				},
			],
		};

		try {
			const res = await axios.post(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, { data: body.data });
			console.log(res.data);

			return {
				success: true,
				error: null,
			};
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(error.response?.data);
			} else {
				console.log(error);
			}
		}

		return { message: "InitiateCheckout successful" };
	}
}

//utmfy yzR0sRTYzMCppMvdKikkSVbA3E45NL9j4PSF
