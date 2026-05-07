import i18next from "i18next";
import enUSTranslations from "./locales/EN_US/zod.json";
import ptBRTranslations from "./locales/PT_BR/zod.json";

i18next.init({
	fallbackLng: "PT_BR", // Idioma padrão
	interpolation: {
		escapeValue: false,
	},
	resources: {
		PT_BR: { zod: ptBRTranslations },
		EN_US: { zod: enUSTranslations },
	},
});

export const i18n = i18next;
