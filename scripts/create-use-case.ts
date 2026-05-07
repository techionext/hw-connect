#!/usr/bin/env tsx

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface UseCaseConfig {
	name: string;
	path: string;
	className: string;
	fileName: string;
	fullPath: string;
}

class UseCaseGenerator {
	private templatePath = join(process.cwd(), "template", "UseCase");
	private targetPath = join(process.cwd(), "src", "UseCases");

	private parseUseCasePath(input: string): UseCaseConfig {
		// Remove barras no início e fim
		const cleanPath = input.replace(/^\/+|\/+$/g, "");

		// Divide o caminho em partes
		const parts = cleanPath.split("/");

		if (parts.length < 2) {
			throw new Error("O caminho deve ter pelo menos 2 partes (ex: Users/Create)");
		}

		// A última parte é o nome do use case
		const useCaseName = parts[parts.length - 1];
		const modulePath = parts.slice(0, -1).join("/");

		// Converte para PascalCase para o nome da classe (UsersCreate)
		const className = parts.map((part) => this.toPascalCase(part)).join("");

		// Nome do arquivo (PascalCase) - UsersCreate
		const fileName = className;

		return {
			name: useCaseName,
			path: modulePath,
			className,
			fileName,
			fullPath: join(this.targetPath, modulePath, useCaseName),
		};
	}

	private toPascalCase(str: string): string {
		// Se a string já está em PascalCase ou camelCase, preserva a capitalização
		if (/^[a-z]+([A-Z][a-z]*)*$/.test(str) || /^[A-Z][a-z]*([A-Z][a-z]*)*$/.test(str)) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		// Caso contrário, aplica a conversão tradicional
		return str
			.split(/[-_/]/)
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join("");
	}

	private replacePlaceholders(content: string, config: UseCaseConfig): string {
		// Pega apenas a primeira parte do caminho para o repository
		const repositoryName = config.path.split("/")[0];
		const repositoryClassName = repositoryName.slice(0, -1).charAt(0).toUpperCase() + repositoryName.slice(1, -1).toLowerCase();

		return content
			.replace(/REPLACE/g, config.className)
			.replace(/REPOSITORY/g, `Repository${repositoryClassName}`)
			.replace(/IREPOSITORY/g, `IRepository${repositoryClassName}`)
			.replace(/rEPLACE/g, config.className.charAt(0).toLowerCase() + config.className.slice(1));
	}

	private createDirectory(path: string): void {
		if (!existsSync(path)) {
			mkdirSync(path, { recursive: true });
			console.log(`✅ Diretório criado: ${path}`);
		}
	}

	private copyAndAdaptFile(templateFile: string, targetFile: string, config: UseCaseConfig): void {
		try {
			const content = readFileSync(templateFile, "utf-8");
			const adaptedContent = this.replacePlaceholders(content, config);
			writeFileSync(targetFile, adaptedContent, "utf-8");
			console.log(`✅ Arquivo criado: ${targetFile}`);
		} catch (error) {
			console.error(`❌ Erro ao criar arquivo ${targetFile}:`, error);
		}
	}

	public generate(useCasePath: string): void {
		try {
			console.log(`🚀 Iniciando criação do use case: ${useCasePath}`);

			const config = this.parseUseCasePath(useCasePath);

			// console.log(`📁 Configuração:`);
			// console.log(`   - Nome: ${config.name}`);
			// console.log(`   - Caminho: ${config.path}`);
			// console.log(`   - Classe: ${config.className}`);
			// console.log(`   - Arquivo: ${config.fileName}`);
			// console.log(`   - Caminho completo: ${config.fullPath}`);

			// Criar diretórios
			this.createDirectory(config.fullPath);
			this.createDirectory(join(config.fullPath, "Schema"));

			// Lista de arquivos para copiar
			const files = [
				{
					template: join(this.templatePath, ".UseCase.ts"),
					target: join(config.fullPath, `${config.fileName}.UseCase.ts`),
				},
				{
					template: join(this.templatePath, ".Controller.ts"),
					target: join(config.fullPath, `${config.fileName}.Controller.ts`),
				},
				{
					template: join(this.templatePath, ".Swagger.ts"),
					target: join(config.fullPath, `${config.fileName}.Swagger.ts`),
				},
				{
					template: join(this.templatePath, "Schema", ".Schema.Request.ts"),
					target: join(config.fullPath, "Schema", `${config.fileName}.Schema.Request.ts`),
				},
				{
					template: join(this.templatePath, "Schema", ".Schema.Response.ts"),
					target: join(config.fullPath, "Schema", `${config.fileName}.Schema.Response.ts`),
				},
			];

			// Copiar e adaptar arquivos
			for (const { template, target } of files) {
				this.copyAndAdaptFile(template, target, config);
			}

			// console.log(`\n🎉 Use case criado com sucesso!`);
			// console.log(`📂 Localização: ${config.fullPath}`);
			// console.log(`\n📝 Próximos passos:`);
			// console.log(`   1. Implementar a lógica no ${config.fileName}.UseCase.ts`);
			// console.log(`   2. Configurar os schemas de request/response`);
			// console.log(`   3. Adicionar a rota no sistema de rotas`);
			// console.log(`   4. Registrar o controller no container de DI`);
		} catch (error) {
			console.error(`❌ Erro ao criar use case: ${error}`);
			process.exit(1);
		}
	}
}

// Função principal
function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log("📖 Uso: npm run create-use-case <caminho>");
		console.log("📖 Exemplo: npm run create-use-case Users/Create");
		console.log("📖 Exemplo: npm run create-use-case Auth/Login");
		process.exit(1);
	}

	const useCasePath = args[0];
	const generator = new UseCaseGenerator();
	generator.generate(useCasePath);
}

// Executar se for chamado diretamente
if (require.main === module) {
	main();
}

export { UseCaseGenerator };
