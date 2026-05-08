import { zod } from "@Config/Swagger/ZodOpenApi";
import { numberField, stringField } from "@Shared/Util/ZOD/Fields/zod";

export const InitiateCheckoutRequestSchema = zod.object({
	params: zod.object({}),

	query: zod
		.object({
			pixelId: stringField(),
			token: stringField(),
			transaction_id: stringField(),
			payout_amount: numberField(),
		})
		.passthrough(),

	body: zod.object({}),
});
