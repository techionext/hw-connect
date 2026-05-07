#!/usr/bin/env tsx

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Configurações dinâmicas
const TEMPLATE_DIR = join(process.cwd(), "template", "Repository");
const REPOSITORIES_DIR = join(process.cwd(), "src", "Repositories");
const CONTAINER_INDEX_PATH = join(process.cwd(), "src", "Shared", "Util", "Container", "index.ts");

interface RepositoryConfig {
	mainEntity: string;
	subEntity?: string;
	fullPath: string;
	repositoryName: string;
	interfaceName: string;
	entityName: string;
	lowercaseEntity: string;
}

// Função para capitalizar a primeira letra
// function capitalize(str: string): string {
// 	return str.charAt(0).toUpperCase() + str.slice(1);
// }

// Função para converter para lowercase
function toLowerCase(str: string): string {
	return str.toLowerCase();
}

// Função para converter para camelCase
function toCamelCase(str: string): string {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

// Função para converter para PascalCase
// function toPascalCase(str: string): string {
// 	return str
// 		.split(/[-_/]/)
// 		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
// 		.join("");
// }

// Função para parsear o caminho do repositório
function parseRepositoryPath(input: string): RepositoryConfig {
	// Remove barras no início e fim
	const cleanPath = input.replace(/^\/+|\/+$/g, "");
	const parts = cleanPath.split("/");

	if (parts.length === 1) {
		// Repositório simples: User
		const entityName = parts[0];
		return {
			mainEntity: entityName,
			fullPath: join(REPOSITORIES_DIR, entityName),
			repositoryName: `Repository${entityName}`,
			interfaceName: `IRepository${entityName}`,
			entityName: entityName,
			lowercaseEntity: toLowerCase(entityName),
		};
	}

	if (parts.length === 2) {
		// Repositório aninhado: User/Magiclink
		const mainEntity = parts[0];
		const subEntity = parts[1];

		// Verificar se o subEntity começa com o mesmo nome do mainEntity
		// Ex: Product/ProductOffer -> Offer
		let optimizedSubEntity = subEntity;
		if (subEntity.toLowerCase().startsWith(mainEntity.toLowerCase())) {
			optimizedSubEntity = subEntity.substring(mainEntity.length);
		}

		const combinedName = `${mainEntity}${optimizedSubEntity}`;

		return {
			mainEntity,
			subEntity: optimizedSubEntity,
			fullPath: join(REPOSITORIES_DIR, mainEntity, subEntity), // Mantém o nome original para a pasta
			repositoryName: `Repository${combinedName}`,
			interfaceName: `IRepository${combinedName}`,
			entityName: combinedName,
			lowercaseEntity: toCamelCase(optimizedSubEntity), // Usa camelCase para o subEntity otimizado
		};
	}

	throw new Error("Caminho deve ter 1 ou 2 partes (ex: User ou User/Magiclink)");
}

// Função para substituir dinamicamente as ocorrências
function replaceEntityReferences(content: string, config: RepositoryConfig): string {
	let newContent = content;

	// Substituir ENTITY pela entidade combinada (ex: UserMagiclink)
	newContent = newContent.replace(/ENTITY/g, config.entityName);

	// Substituir entity pelo lowercase da sub-entidade (ex: magiclink)
	newContent = newContent.replace(/entity/g, config.lowercaseEntity);

	// Corrigir o caminho do import do _Helper/types baseado na profundidade
	const helperPath = config.subEntity ? "../../_Helper/types" : "../_Helper/types";
	newContent = newContent.replace(/"\.\.\/_Helper\/types"/g, `"${helperPath}"`);

	return newContent;
}

// Função para atualizar o arquivo de container
function updateContainerIndex(config: RepositoryConfig): void {
	if (!existsSync(CONTAINER_INDEX_PATH)) {
		console.warn(`⚠️ Arquivo de container não encontrado: ${CONTAINER_INDEX_PATH}`);
		return;
	}

	let containerContent = readFileSync(CONTAINER_INDEX_PATH, "utf8");

	// Construir o caminho do import baseado na estrutura
	const importPath = config.subEntity
		? `src/Repositories/${config.mainEntity}/${config.subEntity}/${config.repositoryName}`
		: `src/Repositories/${config.mainEntity}/${config.repositoryName}`;

	// Adicionar import se não existir
	const importStatement = `import { ${config.repositoryName} } from "${importPath}";`;
	if (!containerContent.includes(importStatement)) {
		// Encontrar a seção de imports de repositórios
		const repositoriesImportIndex = containerContent.indexOf("// Repositories");
		if (repositoriesImportIndex !== -1) {
			// Encontrar o final da seção de imports de repositórios
			const nextSectionIndex = containerContent.indexOf("\n\n", repositoriesImportIndex);
			const insertPosition = nextSectionIndex !== -1 ? nextSectionIndex : containerContent.length;

			containerContent =
				containerContent.slice(0, insertPosition) +
				`\nimport { ${config.repositoryName} } from "${importPath}";` +
				containerContent.slice(insertPosition);
		} else {
			// Se não encontrar a seção, adicionar após o último import
			const lastImportIndex = containerContent.lastIndexOf("import");
			if (lastImportIndex !== -1) {
				const lastImportEndIndex = containerContent.indexOf(";", lastImportIndex) + 1;
				containerContent = `${containerContent.slice(0, lastImportEndIndex)}\n${importStatement}${containerContent.slice(lastImportEndIndex)}`;
			}
		}
	}

	// Adicionar registro no container se não existir
	const registrationStatement = `container.registerSingleton<${config.repositoryName}>("${config.repositoryName}", ${config.repositoryName});`;
	if (!containerContent.includes(registrationStatement)) {
		// Encontrar a seção de registros de repositórios
		const repositoriesRegisterIndex = containerContent.indexOf("// Repositories", containerContent.indexOf("container.register"));
		if (repositoriesRegisterIndex !== -1) {
			// Encontrar o final da seção de registros de repositórios
			const nextSectionIndex = containerContent.indexOf("\n\n", repositoriesRegisterIndex);
			const insertPosition = nextSectionIndex !== -1 ? nextSectionIndex : containerContent.length;

			containerContent = `${containerContent.slice(0, insertPosition)}\n${registrationStatement}${containerContent.slice(insertPosition)}`;
		} else {
			// Se não encontrar a seção, adicionar no final
			containerContent += `\n${registrationStatement}`;
		}
	}

	writeFileSync(CONTAINER_INDEX_PATH, containerContent, "utf8");
	console.log(`✅ Container atualizado: ${CONTAINER_INDEX_PATH}`);
}

// Função para atualizar o repositório pai
function updateParentRepository(config: RepositoryConfig): void {
	if (!config.subEntity) return; // Só atualiza se for repositório aninhado

	const parentInterfacePath = join(REPOSITORIES_DIR, config.mainEntity, `IRepository${config.mainEntity}.ts`);
	const parentRepositoryPath = join(REPOSITORIES_DIR, config.mainEntity, `Repository${config.mainEntity}.ts`);

	// Atualizar interface pai
	if (existsSync(parentInterfacePath)) {
		let interfaceContent = readFileSync(parentInterfacePath, "utf8");

		// Adicionar import se não existir
		const importStatement = `import type { ${config.interfaceName} } from "./${config.subEntity}/IRepository${config.entityName}";`;
		if (!interfaceContent.includes(importStatement)) {
			// Adicionar após o último import
			const lastImportIndex = interfaceContent.lastIndexOf("import");
			const lastImportEndIndex = interfaceContent.indexOf(";", lastImportIndex) + 1;
			// biome-ignore lint/style/useTemplate: false positive
			interfaceContent = interfaceContent.slice(0, lastImportEndIndex) + "\n" + importStatement + interfaceContent.slice(lastImportEndIndex);
		}

		// Adicionar propriedade na interface
		const propertyName = toCamelCase(config.subEntity);
		const propertyDeclaration = `\t${propertyName}: ${config.interfaceName};`;

		// Verificar se a propriedade já existe para evitar duplicação
		const propertyRegex = new RegExp(`\\s+${propertyName}:\\s+${config.interfaceName};`);
		const alternativePropertyRegex = new RegExp(`\\s+${propertyName}:\\s+[^;]+;`);

		if (!propertyRegex.test(interfaceContent) && !alternativePropertyRegex.test(interfaceContent)) {
			interfaceContent = interfaceContent.replace(/export interface IRepository.*? \{/, (match) => `${match}\n${propertyDeclaration}`);
		}

		writeFileSync(parentInterfacePath, interfaceContent, "utf8");
		console.log(`✅ Interface pai atualizada: ${parentInterfacePath}`);
	}

	// Atualizar repositório pai
	if (existsSync(parentRepositoryPath)) {
		let repositoryContent = readFileSync(parentRepositoryPath, "utf8");

		// Adicionar import do tsyringe se não existir
		if (!repositoryContent.includes("tsyringe")) {
			repositoryContent = repositoryContent.replace(
				/import \{.*?\} from "@Config\/Prisma\/prisma";/,
				(match) => `${match}\nimport { injectable, inject } from "tsyringe";`,
			);
		}

		// Adicionar import da interface do novo repositório
		const importStatement = `import type { ${config.interfaceName} } from "./${config.subEntity}/${config.interfaceName}";`;
		if (!repositoryContent.includes(importStatement)) {
			// Adicionar após o último import
			const lastImportIndex = repositoryContent.lastIndexOf("import");
			const lastImportEndIndex = repositoryContent.indexOf(";", lastImportIndex) + 1;
			// biome-ignore lint/style/useTemplate: false positive
			repositoryContent = repositoryContent.slice(0, lastImportEndIndex) + "\n" + importStatement + repositoryContent.slice(lastImportEndIndex);
		}

		// Adicionar @injectable() se não existir
		if (!repositoryContent.includes("@injectable()")) {
			repositoryContent = repositoryContent.replace(/export class Repository.*? implements IRepository.*? \{/, (match) => `@injectable()\n${match}`);
		}

		// Adicionar constructor ou atualizar existente
		const propertyName = toCamelCase(config.subEntity);
		const constructorParam = `@inject("${config.repositoryName}") public readonly ${propertyName}: ${config.interfaceName}`;

		if (repositoryContent.includes("constructor(")) {
			// Adicionar ao constructor existente - funciona para construtores em linha única ou múltiplas linhas
			repositoryContent = repositoryContent.replace(/constructor\((.*?)\)\s*\{\s*\}/s, (match, params) => {
				const cleanParams = params.trim();
				// Verificar se já existe a propriedade para evitar duplicação
				if (cleanParams.includes(propertyName)) {
					return match; // Não adicionar se já existe
				}

				// Remover vírgulas extras no final dos parâmetros existentes
				const trimmedParams = cleanParams.replace(/,\s*$/, "");
				const newParams = trimmedParams ? `${trimmedParams},\n\t\t${constructorParam}` : constructorParam;
				return `constructor(\n\t\t${newParams}\n\t) {}`;
			});
		} else {
			// Criar novo constructor
			repositoryContent = repositoryContent.replace(
				/export class Repository.*? implements IRepository.*? \{/,
				(match) => `${match}\n\tconstructor(\n\t\t${constructorParam}\n\t) {}`,
			);
		}

		writeFileSync(parentRepositoryPath, repositoryContent, "utf8");
		console.log(`✅ Repositório pai atualizado: ${parentRepositoryPath}`);
	}
}

// Função para gerar o repositório
function generateRepository(repositoryPath: string): void {
	try {
		const config = parseRepositoryPath(repositoryPath);

		// Criar pasta de destino
		if (!existsSync(config.fullPath)) {
			mkdirSync(config.fullPath, { recursive: true });
		}

		// Listar arquivos do template
		const templateFiles = readdirSync(TEMPLATE_DIR);

		for (const file of templateFiles) {
			const sourcePath = join(TEMPLATE_DIR, file);

			// Lógica para nomes de arquivo baseada no template
			let fileName: string;
			if (file === ".ts") {
				fileName = `${config.repositoryName}.ts`;
			} else if (file === ".DTO.ts") {
				fileName = `${config.repositoryName}DTO.ts`;
			} else if (file === "I.ts") {
				fileName = `${config.interfaceName}.ts`;
			} else {
				// Fallback para outros arquivos
				const extension = file.includes(".") ? file.substring(file.lastIndexOf(".")) : "";
				const baseName = file.replace(/^\./, "").replace(extension, "");
				fileName = `${config.repositoryName}${baseName}${extension}`;
			}

			const targetPath = join(config.fullPath, fileName);

			// Ler conteúdo do arquivo template
			let content = readFileSync(sourcePath, "utf8");

			// Substituir referências dinamicamente
			content = replaceEntityReferences(content, config);

			// Escrever arquivo de destino
			writeFileSync(targetPath, content, "utf8");

			// console.log(`✅ Arquivo criado: ${targetPath}`);
		}

		// Atualizar repositório pai se for aninhado
		updateParentRepository(config);

		// Atualizar o arquivo de container
		updateContainerIndex(config);

		// console.log(`\n🎉 Repositório ${config.repositoryName} gerado com sucesso!`);
		console.log(`📁 Localização: ${config.fullPath}`);
	} catch (error) {
		console.error("❌ Erro ao gerar repositório:", error instanceof Error ? error.message : "Erro desconhecido");
		process.exit(1);
	}
}

// Função principal
function main(): void {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log("📝 Uso: npx tsx scripts/generate-repository.ts <caminho-da-entidade>");
		console.log("📝 Exemplo: npx tsx scripts/generate-repository.ts User");
		console.log("📝 Exemplo: npx tsx scripts/generate-repository.ts User/Magiclink");
		console.log("📝 Exemplo: npx tsx scripts/generate-repository.ts Product/Inventory");
		process.exit(1);
	}

	const repositoryPath = args[0];

	// Validar se o template existe
	if (!existsSync(TEMPLATE_DIR)) {
		console.error(`❌ Template não encontrado: ${TEMPLATE_DIR}`);
		process.exit(1);
	}

	// Validar se a pasta de repositórios existe
	if (!existsSync(REPOSITORIES_DIR)) {
		console.error(`❌ Pasta de repositórios não encontrada: ${REPOSITORIES_DIR}`);
		process.exit(1);
	}

	console.log(`🚀 Gerando repositório para: ${repositoryPath}`);
	// console.log(`📂 Template: ${TEMPLATE_DIR}`);
	// console.log(`📂 Destino: ${REPOSITORIES_DIR}\n`);

	generateRepository(repositoryPath);
}

// Executar se chamado diretamente
if (require.main === module) {
	main();
}

export { generateRepository, replaceEntityReferences };
