import { zod } from "@Config/Swagger/ZodOpenApi";
import { stringField } from "../zod";

export const addressField = zod.object({
	street: stringField(),
	number: stringField(),
	complement: stringField().optional(),
	neighborhood: stringField(),
	city: stringField(),
	state: stringField(),
	zipCode: stringField().transform((value) => value.replace(/\D/g, "")),
	country: stringField(),
});
