const timesJobsCron = {
	EVERY_HOUR: "0 * * * *",
	EVERY3HOURS: "0 */3 * * *",
	CadaMinutos: "*/1 * * * *",
	EVERY6HOURS: "0 */6 * * *",
	EVERY_MINUTE: "*/1 * * * *",
	EVERY_MID_NIGHT: "00 00 1 * * *",
	AS_18H_SEG_A_SEX: "00 18 * * 1-5",
	EVERY_30_SECONDS: "*/30 * * * * *",
	EVERY_30_MINUTES: "*/30 * * * *",
	CADA_3H_SEG_A_SEX: "00 */3 * * 1-5",
	CADA_3H_ENTRE_8H_E_18H_SEG_A_SEX: "00 8-18/3 * * 1-5",
};

export const HandleJobsCron = () => {};
