import { zod } from "@Config/Swagger/ZodOpenApi";
import { tokenField } from "@Shared/Util/ZOD/Fields/Custom/token";

export const REPLACERequestSchema = zod.object({
	params: zod.object({}),

	query: zod.object({}),

	body: zod.object({
		token: tokenField,
	}),
});
