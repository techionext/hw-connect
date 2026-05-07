export const CalculateKPIDiff = ({ current, previous }: { current: number; previous: number }): number => {
	if (previous === 0) {
		// Se o período anterior foi 0:
		// - Se o atual também é 0, retorna 0%
		// - Se o atual é maior que 0, retorna 100% (começou a ter resultados)
		return current === 0 ? 0 : 100;
	}
	// Mantém o sinal negativo quando houve diminuição
	return Number((((current - previous) / previous) * 100).toFixed(2));
};
