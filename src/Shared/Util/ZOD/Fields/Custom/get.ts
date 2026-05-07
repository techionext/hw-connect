import { zod } from "@Config/Swagger/ZodOpenApi";
import { numberField, stringField } from "../zod";

export const getField = zod.object({
	page: numberField().int().min(1).default(1),
	pageSize: numberField().int().min(1).default(10),
	filter: stringField().optional(),
});
