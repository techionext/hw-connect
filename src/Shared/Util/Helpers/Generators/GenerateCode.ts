import { prisma } from "@Config/Prisma/prisma";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import type { Prisma } from "@prisma/client";

export function generateRandomNumbers(length: number) {
	return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

interface generateCodeBatch {
	prefix: string;
	length: number;
	codesPerGen: number;
}

export function generateCodeBatch({ prefix, length, codesPerGen }: generateCodeBatch) {
	return Array.from({ length: codesPerGen }, () => prefix + generateRandomNumbers(length));
}

interface checkCodes {
	table: Prisma.ModelName;
	codes: string[];
}

type FindManyForCodeCheckArgs = {
	where: { code: { in: string[] } };
	select: { code: true };
};

type FindManyForCodeCheckReturn = Promise<{ code: string }[]>;

type DelegateWithCodeFieldAndFindMany = {
	fields: { code?: unknown; [key: string]: unknown };
	findMany: (args: FindManyForCodeCheckArgs) => FindManyForCodeCheckReturn;
};

async function checkCodes({ table, codes }: checkCodes): FindManyForCodeCheckReturn {
	const whereObj: FindManyForCodeCheckArgs = {
		where: {
			code: {
				in: codes,
			},
		},
		select: {
			code: true,
		},
	};

	const modelDelegate = prisma[table] as unknown as DelegateWithCodeFieldAndFindMany;

	if (modelDelegate?.fields && "code" in modelDelegate.fields) {
		return modelDelegate.findMany(whereObj);
	}

	throw new AppError(ErrorDictionary.INTERN.invalid_table_to_check_codes);
}

export interface IHandleGenerateCode {
	table: Prisma.ModelName;
	prefix: string;
	codesPerGen?: number;
	maxRetriesPerLength?: number;
	suffixInitialLength?: number;
}
/**
 * Gera um código único e não utilizado para uma determinada tabela.
 *
 * @param {SupportedLanguages} options.lang - Idioma para mensagens de erro.
 * @param {Prisma.ModelName} options.table - Nome da tabela para verificar a existência do código.
 * @param {string} options.prefix - Prefixo do código a ser gerado.
 * @param {number} [options.codesPerGen=30] - Total de códigos a ser gerado por tentativa.
 * @param {number} [options.maxRetriesPerLength=10] - Número máximo de tentativas para gerar um código.
 * @param {number} [options.suffixInitialLength=7] - Comprimento inicial do sufixo do código.
 * @returns {string} - Retorna o código único e não utilizado gerado.
 */
export async function handleGenerateCode({
	table,
	prefix,
	codesPerGen = 30,
	maxRetriesPerLength = 10,
	suffixInitialLength = 7,
}: IHandleGenerateCode): Promise<string> {
	let currentLength = suffixInitialLength;

	while (true) {
		for (let attempt = 0; attempt < maxRetriesPerLength; attempt++) {
			const newCodes = generateCodeBatch({ prefix, length: currentLength, codesPerGen });

			const existingCodes = (await checkCodes({ table, codes: newCodes })).map(({ code }) => code);

			const availableCodes = newCodes.filter((code) => !existingCodes.includes(code));

			if (availableCodes.length > 0) {
				return availableCodes[0]; // Retorna o primeiro código disponível encontrado
			}
		}

		currentLength++; // Aumenta o comprimento máximo se nenhum código disponível for encontrado
	}
}
