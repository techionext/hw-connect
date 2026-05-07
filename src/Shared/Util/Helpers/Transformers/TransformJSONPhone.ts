import type { Prisma } from "@prisma/client";

interface PhoneFormat {
	ddd: number;
	country: number;
	number: number;
}

export const TransformJSONPhone = (phone: Prisma.JsonValue) => {
	if (phone) {
		const { country, ddd, number } = JSON.parse(phone.toString()) as PhoneFormat;
		return `${country}${ddd}${number}`;
	}

	return null;
};
