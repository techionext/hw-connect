import { zEnv } from "@Shared/Util/Env";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import { ZODVerifyParse } from "@Shared/Util/ZOD/Parse";
import axios, { isAxiosError } from "axios";
import dayjs from "dayjs";
import type { Request, Response } from "express";
import fs from "fs";
import { injectable } from "tsyringe";
import { ConnectionRequestSchema } from "./Connection.Schema.Request";
import type { IOrderResponse } from "./Connection.Types";

type CanonicalOrderStatus = "waiting_payment" | "paid" | "refused" | "refunded" | "chargedback";

@injectable()
export class ConnectionUseCase {
	constructor() {}

	private mapSparkStatusToCanonical(status: string): CanonicalOrderStatus {
		const statusMap: Record<string, CanonicalOrderStatus> = {
			pending: "waiting_payment",
			pending_external_confirmation: "waiting_payment",
			processing: "waiting_payment",
			on_hold: "waiting_payment",
			abandoned: "waiting_payment",
			authorized: "paid",
			completed: "paid",
			declined: "refused",
			voided: "refused",
			canceled: "refused",
			expired: "refused",
			failed: "refused",
			error: "refused",
			refunded: "refunded",
			partially_refunded: "refunded",
			externally_refunded: "refunded",
			rdr_refunded: "refunded",
			alert_refunded: "refunded",
			disputed_alert: "chargedback",
			disputed_rdr: "chargedback",
			chargeback: "chargedback",
		};

		return statusMap[status] ?? "waiting_payment";
	}

	async GetOrderById(orderId: string) {
		try {
			const params = {
				order_number: orderId,
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
			query: { orderId, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, token, ...rest },
		} = ZODVerifyParse({
			schema: ConnectionRequestSchema,
			request,
		});

		console.log({ rest });

		const dataOrders = await this.GetOrderById(orderId);

		if (!dataOrders) throw new AppError(ErrorDictionary.INTERN.unknown_error, 400);

		const order = dataOrders.data[0].orders[0];

		if (!order) throw new AppError(ErrorDictionary.INTERN.unknown_error, 400);

		const normalizedStatus = this.mapSparkStatusToCanonical(order.status);

		const payload = {
			orderId,
			platform: "Everflow",
			paymentMethod: "credit_card",
			status: normalizedStatus,
			createdAt: order.created_at,
			approvedDate: order.transactions[0].created_at,
			refundedAt: normalizedStatus === "refunded" ? dayjs().toDate() : null,
			customer: {
				name: dataOrders.data[0].full_name,
				email: dataOrders.data[0].email,
				phone: dataOrders.data[0].phone,
				document: null,
				country: dataOrders.data[0].addresses[0].country_code || "BR",
			},
			products: order.cart.items.map((item) => ({
				id: item.id,
				name: item.name,
				planId: null,
				planName: null,
				quantity: item.quantity,
				priceInCents: Number(item.unit_price || 0) * 100,
			})),
			trackingParameters: {
				src: null,
				sck: null,
				utm_source: order.utm_source || utmSource || null,
				utm_campaign: order.utm_campaign || utmCampaign || null,
				utm_medium: order.utm_medium || utmMedium || null,
				utm_content: order.utm_content || utmContent || null,
				utm_term: order.utm_term || utmTerm || null,
			},
			commission: {
				totalPriceInCents: Number(order.cart.total || 0) * 100,
				gatewayFeeInCents: Number(order.cart.tax || 0) * 100,
				userCommissionInCents: Number(order.cart.subtotal || 0) * 100,
				currency: order.currency || "BRL",
			},
			isTest: false,
		};

		try {
			await axios.post("https://api.utmify.com.br/api-credentials/orders", payload, {
				headers: {
					"Content-Type": "application/json",
					"x-api-token": token,
				},
			});
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(error.response?.data);
			} else {
				console.log(error);
			}
		}

		return { message: "Connection successful" };
	}
}

//utmfy yzR0sRTYzMCppMvdKikkSVbA3E45NL9j4PSF
