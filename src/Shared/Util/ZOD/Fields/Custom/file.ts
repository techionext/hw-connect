import { zod } from "@Config/Swagger/ZodOpenApi";
import { objectField, stringField } from "../zod";

export const fileField = objectField({
	buffer: zod.instanceof(Buffer),
	originalname: stringField(),
});
