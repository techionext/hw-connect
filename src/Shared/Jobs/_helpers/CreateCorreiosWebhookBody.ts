// import { TransformJSONPhone } from "@Shared/Util/Helpers/Transformers/TransformJSONPhone";
// import type { IOrdersGetByTrackingCodeDTO } from "Repositories/Orders/RepositoryOrders.DTO";
// import type { $Enums } from "@prisma/client";

// interface CreateCorreiosWebhookBody {
// 	sale: NonNullable<IOrdersGetByTrackingCodeDTO.Result["data"]>;
// 	statusFrustrated: $Enums.frustratedStatus;
// 	statusNormal: $Enums.correiosStatus;
// 	correiosDescription: string;
// 	trackingCode?: string;
// }

// // export const mapperEventFrustrated: Record<$Enums.frustratedStatus, $Enums.webhookEvents> = {
// // 	CLIENT_REFUSED_TO_RECEIVE: "CUSTOMER_SHIPMENT_FAILED_DELIVERY",
// // 	AWAITING_PICKUP: "AWAITING_PICKUP",
// // 	PICKUP_DEADLINE_EXPIRED: "FRUSTRATED",
// // 	OUT_OF_POSTAL_FLOW: "FRUSTRATED",
// // 	CUSTOMER_WANTS_TO_RETURN: "FRUSTRATED",
// // 	ITEM_RETURNED_TO_SENDER: "CUSTOMER_SHIPMENT_RETURN_TO_SENDER",
// // 	RECIPIENT_ABSENT: "FRUSTRATED",
// // 	INCORRECT_ADDRESS: "FRUSTRATED",
// // 	MAIL_CARRIER_NOT_ASSISTED: "FRUSTRATED",
// // };

// // export const mapperEventCorreios: Record<$Enums.correiosStatus, $Enums.webhookEvents> = {
// // 	AWAITING_PICKUP: "AWAITING_PICKUP",
// // 	ITEM_RETURNED_TO_SENDER: "CUSTOMER_SHIPMENT_RETURN_TO_SENDER",
// // 	ITEM_POSTED: "IN_TRANSIT",
// // 	FORWARDED: "IN_TRANSIT",
// // 	RECEIVED_AT_PROCESSING_UNIT_OR_DISTRIBUTION_CENTER: "IN_TRANSIT",
// // 	DELIVERY_NOT_COMPLETED_UNSUCCESSFUL_ATTEMPT: "CUSTOMER_SHIPMENT_FAILED_DELIVERY",
// // 	ITEM_IN_TRANSIT_PLEASE_WAIT: "IN_TRANSIT",
// // 	ITEM_DELIVERED_TO_RECIPIENT: "CUSTOMER_SHIPMENT_IN_ROUTE_FOR_DELIVERY",
// // };

// export const CreateCorreiosWebhookBody = ({ sale, statusFrustrated, statusNormal, trackingCode, correiosDescription }: CreateCorreiosWebhookBody) => {
// 	const event = statusFrustrated || statusNormal;

// 	const mainOffer = sale.offerSale.find((offer) => offer.offerType === "MAIN");

// 	const affiliate = sale.finance.find((finance) => finance.role === "AFFILIATE");

// 	return {
// 		in_development: true,
// 		event: event,
// 		correios_description: correiosDescription,
// 		sale: {
// 			id: sale.id,
// 			code: sale.code,
// 			status: sale.status,
// 			tracking_code: trackingCode,
// 			correios_status: sale.correiosStatus,
// 			correios_frustrated_status: sale.frustratedStatus,
// 			created_at: sale.createdAt,
// 			paid_at: sale.paidAt,
// 			payment_method: sale.paymentMethod,
// 			is_payment_on_delivery: sale.paymentOnDelivery,
// 			installments: sale.installments,
// 			value: sale.value,
// 			value_with_fee: sale.value - sale.rootFee,

// 			...(affiliate && {
// 				affiliate: {
// 					name: affiliate.user.name,
// 					email: affiliate.user.email,
// 				},
// 			}),

// 			offer_main: mainOffer
// 				? {
// 						id: mainOffer.offer.id,
// 						code: mainOffer.offer.code,
// 						title: mainOffer.offer.title,
// 						price: mainOffer.offerPrice,
// 						price_with_fee: mainOffer.offerPriceAfterDiscount,
// 						type: mainOffer.offerType,
// 						product: mainOffer.offer.product,
// 					}
// 				: null,

// 			offers: sale.offerSale.map((offSale) => {
// 				return {
// 					id: offSale.offer.id,
// 					code: offSale.offer.code,
// 					title: offSale.offer.title,
// 					price: offSale.offerPrice,
// 					price_with_fee: offSale.offerPriceAfterDiscount,
// 					type: offSale.offerType,
// 					product: offSale.offer.product,
// 				};
// 			}),
// 			customer: {
// 				code: sale.customer.code,
// 				name: sale.customer.name,
// 				email: sale.customer.email,
// 				phone: sale.customer.phone ? TransformJSONPhone(sale.customer.phone) : null,
// 				document: sale.customer.document,
// 				documentType: sale.customer.documentType,

// 				address: {
// 					street: sale.customer.street,
// 					number: sale.customer.number,
// 					complement: sale.customer.complement,
// 					district: sale.customer.district,
// 					city: sale.customer.city,
// 					state: sale.customer.state,
// 					country: sale.customer.country,
// 					zip: sale.customer.zip,
// 				},
// 			},
// 		},
// 	};
// };
