import { $Enums } from "@prisma/client";
import { z } from "zod";
import type { REPLACEUseCase } from "../REPLACE.UseCase";

export type rEPLACEResponse = Awaited<ReturnType<typeof REPLACEUseCase.prototype.execute>>;

export const rEPLACEResponseSchema = z.object({
	codeIntern: z.string(),
	message: z.string(),
});
