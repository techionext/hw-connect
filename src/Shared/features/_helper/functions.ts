import * as crypto from "node:crypto";
import dayjs from "dayjs";
import countries from "i18n-iso-countries";

export function NormalizePhoneNumber(phone: string): string {
	const digits = phone.replace(/\D/g, "");

	// EUA: 10 ou 11 dígitos começando com 1
	if (digits.length === 10) {
		return `1${digits}`;
	}
	if (digits.length === 11 && digits.startsWith("1")) {
		return digits;
	}

	// Brasil: 12 ou 13 dígitos começando com 55
	if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
		return digits;
	}

	throw new Error("Número de telefone inválido");
}

export function normalizePostalCode(input: string): string {
	const cleaned = input.replace(/[\s-]/g, "").toLowerCase();

	return cleaned;
}

function normalizeText(input: string): string {
	return input.trim().toLowerCase();
}

export function generateTextSHA256(input: string): string {
	const normalized = normalizeText(input);
	const buffer = Buffer.from(normalized, "utf-8");
	return crypto.createHash("sha256").update(buffer).digest("hex");
}

export function getCountryCode(name: string): string | undefined {
	const code = countries.getAlpha2Code(name, "en");
	if (name.length === 2) return name.toLowerCase();
	return code?.toLowerCase();
}

const US_STATES: Record<string, string> = {
	alabama: "al",
	alaska: "ak",
	arizona: "az",
	arkansas: "ar",
	california: "ca",
	colorado: "co",
	connecticut: "ct",
	delaware: "de",
	florida: "fl",
	georgia: "ga",
	hawaii: "hi",
	idaho: "id",
	illinois: "il",
	indiana: "in",
	iowa: "ia",
	kansas: "ks",
	kentucky: "ky",
	louisiana: "la",
	maine: "me",
	maryland: "md",
	massachusetts: "ma",
	michigan: "mi",
	minnesota: "mn",
	mississippi: "ms",
	missouri: "mo",
	montana: "mt",
	nebraska: "ne",
	nevada: "nv",
	"new hampshire": "nh",
	"new jersey": "nj",
	"new mexico": "nm",
	"new york": "ny",
	"north carolina": "nc",
	"north dakota": "nd",
	ohio: "oh",
	oklahoma: "ok",
	oregon: "or",
	pennsylvania: "pa",
	"rhode island": "ri",
	"south carolina": "sc",
	"south dakota": "sd",
	tennessee: "tn",
	texas: "tx",
	utah: "ut",
	vermont: "vt",
	virginia: "va",
	washington: "wa",
	"west virginia": "wv",
	wisconsin: "wi",
	wyoming: "wy",
};

export function normalizeState(input: string): string {
	const ACCENTS_REGEX = /\p{M}/gu;
	const raw = input
		.trim()
		.toLowerCase()
		.normalize("NFD") // separa acento
		.replace(ACCENTS_REGEX, "") // remove acento
		.replace(/[^\w]/g, ""); // remove tudo que não for letra/dígito

	// Se for estado dos EUA
	if (US_STATES[raw]) {
		return US_STATES[raw];
	}

	return raw;
}

export function generateFbp(): string {
	const timestamp = dayjs().unix();
	const random = Math.floor(Math.random() * 1_000_000_000); // até 9 dígitos
	return `fb.1.${timestamp}.${random}`;
}

export function generateFbc(fbclid: string): string {
	const timestamp = Date.now();
	return `fb.1.${timestamp}.${fbclid}`;
}
