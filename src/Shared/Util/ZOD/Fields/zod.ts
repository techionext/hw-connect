import { zod } from "@Config/Swagger/ZodOpenApi";
import dayjs from "dayjs";
import type { ZodRawShape, ZodTypeAny, z } from "zod";

// funcionam tanto em um body/json, multipart-formdata, query params

export const stringField = () => zod.string().trim();

export const booleanField = () =>
	zod.preprocess((value) => {
		if (value === "true") return true;
		if (value === "false") return false;
		return value;
	}, zod.boolean());

export const numberField = () => zod.coerce.number();

export const dateField = () => zod.coerce.date();

export const objectField = <T extends ZodRawShape>(schema: T) =>
	zod.preprocess((value) => {
		if (typeof value === "string") {
			try {
				return JSON.parse(value.replace(/([a-zA-Z0-9_]+):/g, '"$1":'));
			} catch {
				throw new Error("Formato de objeto inválido");
			}
		}
		return value;
	}, zod.object(schema));

export const startDateField = () => zod.coerce.date().transform((date) => dayjs(date).startOf("day").add(1, "day").toDate());

export const endDateField = () => zod.coerce.date().transform((date) => dayjs(date).endOf("day").add(1, "day").toDate());

export const nativeEnumField = <T extends z.EnumLike>(values: T) => zod.nativeEnum(values);

export const enumField = <U extends string, T extends Readonly<[U, ...U[]]>>(values: T) => zod.enum(values);

export const arrayField = <T extends ZodTypeAny>(schema: T) =>
	zod.preprocess((value) => {
		if (typeof value === "string") {
			return value.split(",");
		}
		return value;
	}, zod.array(schema));

export const formDataField = <T extends ZodTypeAny>(schema: T) =>
	zod
		.preprocess((value) => {
			if (typeof value === "string") {
				return JSON.parse(value);
			}
			return value;
		}, schema)
		.describe("Enviar como JSON");
