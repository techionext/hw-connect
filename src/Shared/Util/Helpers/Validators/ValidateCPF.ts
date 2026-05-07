export const ValidateCPF = (cpfInput: string) => {
	const cpf = cpfInput.replace(/\D/g, ""); // Remove caracteres não numéricos

	// Verifica se o CPF tem 11 dígitos ou se é uma sequência de números repetidos
	if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
		return false;
	}

	let soma = 0;
	let resto = 0;

	// Verifica o primeiro dígito verificador
	for (let i = 1; i <= 9; i++) {
		soma += Number.parseInt(cpf.charAt(i - 1), 10) * (11 - i);
	}
	resto = (soma * 10) % 11;
	if (resto === 10 || resto === 11) {
		resto = 0;
	}
	if (resto !== Number.parseInt(cpf.charAt(9), 10)) {
		return false;
	}

	// Verifica o segundo dígito verificador
	soma = 0;
	for (let i = 1; i <= 10; i++) {
		soma += Number.parseInt(cpf.charAt(i - 1), 10) * (12 - i);
	}
	resto = (soma * 10) % 11;
	if (resto === 10 || resto === 11) {
		resto = 0;
	}
	if (resto !== Number.parseInt(cpf.charAt(10), 10)) {
		return false;
	}

	return true;
};
