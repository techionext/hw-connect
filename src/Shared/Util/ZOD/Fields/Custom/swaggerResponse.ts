import { objectField, stringField } from "../zod";

export const swaggerResponseField = objectField({
	codeIntern: stringField(),
	message: stringField(),
});
