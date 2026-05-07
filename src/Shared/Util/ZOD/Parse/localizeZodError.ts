import { i18n } from "@Config/i18n";
import { zEnv } from "@Shared/Util/Env";
import type { ServerLanguages } from "@Shared/Util/Errors/Dictionary/schema";
import type { z } from "zod";

export const localizeZodError = (issue: z.ZodIssue, lng: ServerLanguages): string => {
	const path = zEnv.ZOD_ERROR_TYPE === "SIMPLE" ? issue.path[issue.path.length - 1].toString() : issue.path.join(".");
	const params: Record<string, unknown> = { field: path, lng };

	if ("received" in issue) {
		params.received = issue.received;
	}
	if ("expected" in issue) {
		params.expected = issue.expected;
	}
	if ("options" in issue) {
		params.options = issue.options?.join(", ");
	}
	if ("keys" in issue) {
		params.keys = issue.keys?.join(", ");
	}
	if ("validation" in issue) {
		params.validation = issue.validation;
	}
	if ("regex" in issue) {
		params.regex = issue.regex?.toString().replace(/^\/|\/$/g, "");
	}
	if ("minimum" in issue) {
		params.minimum = issue.minimum;
	}
	if ("maximum" in issue) {
		params.maximum = issue.maximum;
	}
	if ("multipleOf" in issue) {
		params.multipleOf = issue.multipleOf;
	}

	if (issue.code === "invalid_type") {
		if (typeof issue.expected === "string") {
			const expectedKey = `zod:expected.${issue.expected}`;
			params.expected = i18n.t(expectedKey, { defaultValue: issue.expected });
		}

		if (typeof issue.received === "string") {
			const receivedKey = `zod:received.${issue.received}`;
			params.received = i18n.t(receivedKey, { defaultValue: issue.received });
		}
	}

	switch (issue.code) {
		case "invalid_type":
			if (issue.received === "undefined") {
				return i18n.t("zod:invalid_type_received_undefined", params);
			}
			return i18n.t("zod:invalid_type", params);

		case "invalid_literal":
			return i18n.t("zod:invalid_literal", params);

		case "invalid_string":
			switch (issue.validation) {
				case "email":
					return i18n.t("zod:invalid_email", params);
				case "url":
					return i18n.t("zod:invalid_url", params);
				case "uuid":
					return i18n.t("zod:invalid_uuid", params);
				case "cuid":
					return i18n.t("zod:invalid_cuid", params);
				case "regex":
					return i18n.t("zod:invalid_regex", params);
				default:
					return i18n.t("zod:invalid_string", params);
			}

		case "too_small":
			switch (issue.type) {
				case "string":
					return i18n.t("zod:too_small_string", params);
				case "number":
					return i18n.t("zod:too_small_number", params);
				case "array":
					return i18n.t("zod:too_small_array", params);
				default:
					return i18n.t("zod:too_small_number", params);
			}

		case "too_big":
			switch (issue.type) {
				case "string":
					return i18n.t("zod:too_big_string", params);
				case "number":
					return i18n.t("zod:too_big_number", params);
				case "array":
					return i18n.t("zod:too_big_array", params);
				default:
					return i18n.t("zod:too_big_number", params);
			}

		case "not_multiple_of":
			return i18n.t("zod:not_multiple_of", params);

		case "invalid_date":
			return i18n.t("zod:invalid_date", params);

		case "invalid_enum_value":
			return i18n.t("zod:invalid_enum_value", params);

		case "invalid_union":
			return i18n.t("zod:invalid_union", params);

		case "invalid_union_discriminator":
			return i18n.t("zod:invalid_union_discriminator", params);

		case "unrecognized_keys":
			return i18n.t("zod:unrecognized_keys", params);

		case "custom":
			return i18n.t("zod:custom", params);

		default:
			return i18n.t("zod:invalid_type", params);
	}
};
