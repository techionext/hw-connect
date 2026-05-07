import pino from "pino";
import pretty from "pino-pretty";

const pinoStyles = pretty({
	colorize: true,
	levelFirst: true,
	translateTime: "dd-mm-yyyy HH:MM:ss",
});

const valuesLevel = {
	dev: "debug",
	prod: "info",
};

const logger = pino(
	{
		level: (process.env.NODE_ENV === "DEV" ? valuesLevel.dev : valuesLevel.prod) as "debug" | "info",
	},
	pinoStyles,
);

export { logger };
