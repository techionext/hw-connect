import "dotenv/config";

import { zEnv } from "@Shared/Util/Env";
import { app } from "./app";
import { logger } from "./Shared/Util/Logger";

app.listen(zEnv.PORT, () => {
	const baseUrl = () => {
		return `http://localhost:${zEnv.PORT}`;
	};

	logger.info(`Servidor inciado: ${baseUrl()}`);
	logger.info(`Documentação em: ${baseUrl()}/docs`);
});
