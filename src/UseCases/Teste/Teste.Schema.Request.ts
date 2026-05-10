import { zod } from "@Config/Swagger/ZodOpenApi";
import { numberField, stringField } from "@Shared/Util/ZOD/Fields/zod";

export const TesteRequestSchema = zod.object({
	params: zod.object({}),

	query: zod
		.object({
		})
		.passthrough(),

	body: zod.object({}),
});
