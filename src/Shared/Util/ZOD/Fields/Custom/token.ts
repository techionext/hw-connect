import { $Enums } from "@prisma/client";
import { nativeEnumField, objectField, stringField } from "../zod";

export const tokenField = objectField({
	user: objectField({
		id: stringField(),
		email: stringField(),
		role: nativeEnumField($Enums.platformRole),
	}),
});
