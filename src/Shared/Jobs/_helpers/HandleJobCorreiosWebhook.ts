// import { logger } from "@Shared/Util/Logger";
// import { handleGenerateUuid } from "@Shared/features/handleGenerateUuid/handleGenerateUuid";
// import { RepositoryLogistics } from "Repositories/Logistics/Postgres/RepositoryLogistics";
// import { RepositoryOrders } from "Repositories/Orders/Postgres/RepositoryOrders";
// import { RepositoryWebhooks } from "Repositories/Webhooks/Postgres/RepositoryWebhooks";
// import { generateCorreiosToken } from "UseCases/Employers/_helper/generateCorreiosToken";
// import { HandleWebhooks } from "UseCases/Orders/_helper/HandleWebhooks";
// import axios, { AxiosError, type AxiosResponse } from "axios";
// import { CorreiosFrustratedEventMapper, CorreiosNormalEventMapper } from "./CorreiosEventMapper";
// import type { CorreiosResponse } from "./CorreiosResponse";
// import { CreateCorreiosWebhookBody } from "./CreateCorreiosWebhookBody";

// export const HandleJobCorreiosWebhook = async () => {
// 	const repositoryLogistics = new RepositoryLogistics();
// 	const repositoryOrders = new RepositoryOrders();
// 	const repositoryWebhooks = new RepositoryWebhooks();

// 	const { data: dataLogistics } = await repositoryLogistics.GetAllNotFinalStatus();

// 	const CHUNK_SIZE = 50; // limite máximo aceito pelos correios para cada request e 50 itens

// 	const logisticChunks = Array.from({ length: Math.ceil(dataLogistics.length / CHUNK_SIZE) }, (_, i) =>
// 		dataLogistics.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE),
// 	);

// 	const { token: tokenCorreios } = await generateCorreiosToken();

// 	for (const chunk of logisticChunks) {
// 		try {
// 			const { data }: { data: CorreiosResponse } = await axios.get(
// 				`https://api.correios.com.br/srorastro/v1/objetos?codigosObjetos=${chunk.map((item) => item.trackingCode).join(",")}&resultado=U`,
// 				{
// 					headers: {
// 						Authorization: `Bearer ${tokenCorreios}`,
// 					},
// 				},
// 			);

// 			for (const objeto of data.objetos) {
// 				if (!objeto || !objeto.eventos || !objeto.eventos.length) continue;

// 				const eventCode = `${objeto.eventos[0].codigo}-${objeto.eventos[0].tipo}`;

// 				const statusNormal = CorreiosNormalEventMapper[eventCode];
// 				const statusFrustrated = CorreiosFrustratedEventMapper[eventCode];

// 				const item = chunk.find((item) => item.trackingCode === objeto.codObjeto);

// 				if (item?.sale) {
// 					const updateCorreiosStatus = !!(item.trackingCode && statusNormal && statusNormal !== item.sale.correiosStatus);

// 					const updateFrustratedStatus = !!(item.trackingCode && statusFrustrated && statusFrustrated !== item.sale.frustratedStatus);

// 					if (updateCorreiosStatus) {
// 						await repositoryOrders.UpdateCorreiosStatus({ id: item.sale.id, status: statusNormal });

// 						if (statusNormal === "ITEM_DELIVERED_TO_RECIPIENT" && item.sale.status !== "COMPLETED") {
// 							await repositoryOrders.UpdateStatus({ id: item.sale.id, status: "CLIENT_RECEIVE_CONFIRMATION" });

// 							const { data: dataOrder } = await repositoryOrders.GetById({ id: item.sale.id, getFinances: true });

// 							if (dataOrder) {
// 								const mainOffer = dataOrder.offerSale.find((offer) => offer.offerType === "MAIN")?.offer;
// 								if (mainOffer) {
// 									HandleWebhooks({
// 										sale: dataOrder,
// 										status: "CLIENT_CONFIRMATION",
// 										mainOfferWebhooks: mainOffer.webhookOffer,
// 										event: "CLIENT_CONFIRMATION",
// 									});
// 								}
// 							}
// 						}
// 					}

// 					// if (updateFrustratedStatus) {
// 					// 	await repositoryOrders.UpdateFrustratedStatus({ id: item.sale.id, status: statusFrustrated });
// 					// 	await repositoryOrders.UpdateStatus({ id: item.sale.id, status: "FRUSTRATED" });

// 					// 	const { data: dataOrder } = await repositoryOrders.GetById({ id: item.sale.id, getShippingFee: true });

// 					// 	if (dataOrder) {
// 					// 		const isReturn = ["CLIENT_REFUSED_TO_RECEIVE", "ITEM_RETURNED_TO_SENDER"].includes(statusFrustrated);

// 					// 		if (isReturn) {
// 					// 			const shippingFees = dataOrder.shippingFee.filter((item) => item.type === "ORDER_FRUSTRATED");

// 					// 			for (const shippingFee of shippingFees) {
// 					// 				if (shippingFee) {
// 					// 					await repositoryShippingFee.Delete({
// 					// 						id: shippingFee.id,
// 					// 					});
// 					// 				}
// 					// 			}
// 					// 		}

// 					// 		if (!isReturn) {
// 					// 			const shippingFees = dataOrder.shippingFee.filter(
// 					// 				(item) => item.type === "ORDER_FRUSTRATED_WITH_RETURN",
// 					// 			);

// 					// 			for (const shippingFee of shippingFees) {
// 					// 				if (shippingFee) {
// 					// 					await repositoryShippingFee.Delete({
// 					// 						id: shippingFee.id,
// 					// 					});
// 					// 				}
// 					// 			}
// 					// 		}
// 					// 	}

// 					// 	if (
// 					// 		!["CLIENT_REFUSED_TO_RECEIVE", "ITEM_RETURNED_TO_SENDER"].includes(statusFrustrated) &&
// 					// 		!item.sale.shippingFee.some((fee) => fee.type === "ORDER_FRUSTRATED")
// 					// 	) {
// 					// 		const producer = item.sale.finance.find((f) => f.role === "AUTORAL");
// 					// 		if (!producer) throw new AppError(ErrorDictionary["pt-BR"].ORDER.owner_not_found);

// 					// 		const {
// 					// 			data: { fee },
// 					// 		} = await repositoryUsers.GetById_Email_Code({
// 					// 			id: producer.userId,
// 					// 			getFee: true,
// 					// 		});

// 					// 		for (const finance of item.sale.finance) {
// 					// 			if (finance.category === "COMMISSION" && finance.role !== "ROOT") {
// 					// 				if (fee) {
// 					// 					await repositoryOrders.CreateShippingFee({
// 					// 						id: handleGenerateUuid(),
// 					// 						category: "PENDING",
// 					// 						saleId: finance.saleId,
// 					// 						type: "ORDER_FRUSTRATED",
// 					// 						userId: finance.userId,
// 					// 						value:
// 					// 							(finance.role === "AFFILIATE"
// 					// 								? fee?.deliveryFailedWithReturnAffiliate
// 					// 								: fee?.deliveryFailedWithReturn) || 0,
// 					// 					});
// 					// 				}
// 					// 			}
// 					// 		}
// 					// 	}

// 					// 	if (
// 					// 		["CLIENT_REFUSED_TO_RECEIVE", "ITEM_RETURNED_TO_SENDER"].includes(statusFrustrated) &&
// 					// 		!item.sale.shippingFee.some((fee) => fee.type === "ORDER_FRUSTRATED_WITH_RETURN")
// 					// 	) {
// 					// 		const producer = item.sale.finance.find((f) => f.role === "AUTORAL");
// 					// 		if (!producer) throw new AppError(ErrorDictionary["pt-BR"].ORDER.owner_not_found);

// 					// 		const {
// 					// 			data: { fee },
// 					// 		} = await repositoryUsers.GetById_Email_Code({
// 					// 			id: producer.userId,
// 					// 			getFee: true,
// 					// 		});

// 					// 		for (const finance of item.sale.finance) {
// 					// 			if (finance.category === "COMMISSION" && finance.role !== "ROOT") {
// 					// 				if (fee) {
// 					// 					await repositoryOrders.CreateShippingFee({
// 					// 						id: handleGenerateUuid(),
// 					// 						category: "PENDING",
// 					// 						saleId: finance.saleId,
// 					// 						type: "ORDER_FRUSTRATED_WITH_RETURN",
// 					// 						userId: finance.userId,
// 					// 						value: (finance.role === "AFFILIATE" ? fee?.deliveryFailedAffiliate : fee?.deliveryFailed) || 0,
// 					// 					});
// 					// 				}
// 					// 			}
// 					// 		}
// 					// 	}
// 					// }

// 					// [x] quando for um dos eventos finais, sinalizar que nao precisa mais de ser atualizado pelo webhook
// 					if (statusNormal === "ITEM_DELIVERED_TO_RECIPIENT" || statusFrustrated === "ITEM_RETURNED_TO_SENDER") {
// 						await repositoryLogistics.UpdateToFinalStatus({ id: item.id });

// 						// if (
// 						// 	statusFrustrated === "ITEM_RETURNED_TO_SENDER" &&
// 						// 	!item.sale.shippingFee.some((fee) => fee.type === "ORDER_FRUSTRATED_WITH_RETURN")
// 						// ) {
// 						// 	const producer = item.sale.finance.find((f) => f.role === "AUTORAL");
// 						// 	if (!producer) throw new AppError(ErrorDictionary["pt-BR"].ORDER.owner_not_found);

// 						// 	const {
// 						// 		data: { fee },
// 						// 	} = await repositoryUsers.GetById_Email_Code({
// 						// 		id: producer.userId,
// 						// 		getFee: true,
// 						// 	});

// 						// 	for (const finance of item.sale.finance) {
// 						// 		if (finance.category === "COMMISSION" && finance.role !== "ROOT") {
// 						// 			if (fee) {
// 						// 				await repositoryOrders.CreateShippingFee({
// 						// 					id: handleGenerateUuid(),
// 						// 					category: "PENDING",
// 						// 					saleId: finance.saleId,
// 						// 					type: "ORDER_FRUSTRATED_WITH_RETURN",
// 						// 					userId: finance.userId,
// 						// 					value: (finance.role === "AFFILIATE" ? fee?.deliveryFailedAffiliate : fee?.deliveryFailed) || 0,
// 						// 				});
// 						// 			}
// 						// 		}
// 						// 	}
// 						// }
// 					}

// 					// status que estão disparando esse webhook

// 					// "CUSTOMER_SHIPMENT_IN_ROUTE_FOR_DELIVERY",
// 					// "CUSTOMER_SHIPMENT_FAILED_DELIVERY",
// 					// "CUSTOMER_SHIPMENT_RETURN_TO_SENDER",
// 					// "FRUSTRATED",
// 					// "IN_TRANSIT",
// 					// "AWAITING_PICKUP"

// 					if ((updateCorreiosStatus || updateFrustratedStatus) && item?.sale?.offerSale && item.trackingCode) {
// 						const { data: dataSale } = await repositoryOrders.GetByTrackingCode({
// 							saleId: item.sale.id,
// 							trackingCode: item.trackingCode,
// 						});

// 						if (dataSale) {
// 							for (const webhook of item.sale.offerSale.flatMap((offSale) => offSale.offer.webhookOffer.map((whkOff) => whkOff.webhook))) {
// 								const validWebhook = dataSale.finance.some((finance) => finance.userId === webhook.userId) || webhook.user.platformRole === "ROOT";

// 								if (validWebhook) {
// 									const body = CreateCorreiosWebhookBody({
// 										sale: dataSale,
// 										statusFrustrated,
// 										statusNormal,
// 										correiosDescription: objeto.eventos[0].descricao,
// 										trackingCode: item.trackingCode,
// 									});

// 									try {
// 										const response: AxiosResponse = await axios.post(webhook.url, body, {
// 											headers: {
// 												Authorization: webhook?.token ? `Bearer ${webhook.token}` : undefined,
// 												timeout: 30 * 100,
// 											},
// 										});

// 										let responseData = response.data;

// 										if (JSON.stringify(responseData).includes("!DOCTYPE html") || !responseData) {
// 											responseData = { message: "sem resposta" };
// 										}

// 										await repositoryWebhooks.CreateLog({
// 											id: handleGenerateUuid(),
// 											event: body.event,
// 											status: "SUCCESS",
// 											message: "Webhook disparado com sucesso",

// 											response: responseData,

// 											webhookId: webhook.id,
// 											triggerType: "AUTO",
// 											requestBody: body,
// 											responseCode: response.status,
// 										});
// 									} catch (error) {
// 										let errorResponse = { message: "sem resposta" };

// 										if (axios.isAxiosError(error) && error.response) {
// 											errorResponse = error.response.data ?? { message: "sem resposta" };
// 										}

// 										if (JSON.stringify(errorResponse).includes("!DOCTYPE html") || !errorResponse) errorResponse = { message: "sem resposta" };

// 										await repositoryWebhooks.CreateLog({
// 											id: handleGenerateUuid(),
// 											event: body.event,
// 											status: "FAILED",
// 											message: "Disparo do webhook falhou devido a um erro",
// 											response: errorResponse ?? { message: "sem resposta" },
// 											webhookId: webhook.id,
// 											triggerType: "AUTO",
// 											requestBody: body,
// 											responseCode: axios.isAxiosError(error) ? (error.status ?? 0) : 0,
// 										});

// 										// throw new AppError(ErrorDictionary["pt-BR"].WEBHOOK.trigger_failed);
// 									}
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 		} catch (error) {
// 			if (error instanceof AxiosError) {
// 				logger.fatal("Ocorreu um erro durante a listagem de status no correios, AxiosError:", error.response?.data);
// 			} else {
// 				logger.fatal({ message: "Ocorreu um erro durante a listagem de status no correios", error });
// 			}
// 		}
// 	}
// };
