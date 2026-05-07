export const removeCaracteresEspeciais = (str: string) => {
	const result = str.replace(/[^a-zA-Z0-9\s]/g, ""); // remove especiais
	return result.replace(/\s/g, ""); // remover vazio
};

export const HandleOnlyNumbers = (value: string | undefined): string => {
	const result = value?.replace(/[^0-9]/g, "") || "";

	return result;
};
