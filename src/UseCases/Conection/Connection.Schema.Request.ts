import { zod } from "@Config/Swagger/ZodOpenApi";
import { stringField } from "@Shared/Util/ZOD/Fields/zod";

export const ConnectionRequestSchema = zod.object({
	params: zod.object({}),

	query: zod.object({
		orderId: stringField(),
		utmSource: stringField().optional().nullable(),
		utmMedium: stringField().optional().nullable(),
		utmCampaign: stringField().optional().nullable(),
		utmContent: stringField().optional().nullable(),
		utmTerm: stringField().optional().nullable(),
		token: stringField(),
	}),

	body: zod.object({}),
});
