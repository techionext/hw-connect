import { LeaveOnlyDigits } from "@Shared/Util/Helpers/Transformers/LeaveOnlyDigits";
import { objectField, stringField } from "../zod";

export const phoneField = objectField({
	country: stringField().transform((val) => LeaveOnlyDigits(val)),
	ddd: stringField().transform((val) => LeaveOnlyDigits(val)),
	number: stringField().transform((val) => LeaveOnlyDigits(val)),
});
