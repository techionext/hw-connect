export const ValidateCNPJ = (cnpjInput: string) => {
	const cnpj = cnpjInput.replace(/\D/g, ""); // Remove caracteres não numéricos

	// Verifica se o CNPJ tem 14 dígitos ou se é uma sequência de números repetidos
	if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
		return false;
	}

	let tamanho = 12;
	let soma = 0;
	let resto = 0;
	const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	// Verifica o primeiro dígito verificador
	for (let i = 0; i < tamanho; i++) {
		soma += Number.parseInt(cnpj.charAt(i), 10) * pesos[i + 1];
	}
	resto = soma % 11;
	resto = resto < 2 ? 0 : 11 - resto;

	if (resto !== Number.parseInt(cnpj.charAt(12), 10)) {
		return false;
	}

	// Verifica o segundo dígito verificador
	tamanho = 13;
	soma = 0;
	for (let i = 0; i < tamanho; i++) {
		soma += Number.parseInt(cnpj.charAt(i), 10) * pesos[i];
	}
	resto = soma % 11;
	resto = resto < 2 ? 0 : 11 - resto;

	if (resto !== Number.parseInt(cnpj.charAt(13), 10)) {
		return false;
	}

	return true;
};
