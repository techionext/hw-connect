import type { Prisma } from "@prisma/client";

interface IFormatPhone {
	phone: Prisma.JsonValue;
}

export const FormatPhone = ({ phone }: IFormatPhone) => {
	if (!phone) return null;

	return phone as { country: string; ddd: string; number: string };
};
