import { zod } from "@Config/Swagger/ZodOpenApi";
import { numberField, stringField } from "@Shared/Util/ZOD/Fields/zod";

export const ConnectionRequestSchema = zod.object({
	params: zod.object({}),

	query: zod
		.object({
			transaction_id: stringField(),
			utmSource: stringField().optional().nullable(),
			utmMedium: stringField().optional().nullable(),
			utmCampaign: stringField().optional().nullable(),
			utmContent: stringField().optional().nullable(),
			utmTerm: stringField().optional().nullable(),
			token: stringField(),
			payout_amount: numberField(),
		})
		.passthrough(),

	body: zod.object({}),
});
