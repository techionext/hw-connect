import { logger } from "@Shared/Util/Logger";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
	log: ["error"],
});

prisma
	.$connect()
	.then(() => logger.info("Success connected Database"))
	.catch(() => logger.fatal("Database failed"));
