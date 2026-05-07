import type { tokenField } from "@Shared/Util/ZOD/Fields/Custom/token";
import "dotenv/config";
import jwt from "jsonwebtoken";
import type z from "zod";
import { zEnv } from "../../Env";

export const GenerateJwtToken = ({ user }: z.infer<typeof tokenField>) =>
	jwt.sign(
		{ user },
		zEnv.JWT_SECRET_TOKEN,
		{ expiresIn: 60 * 60 * 24 }, // 24h
	);
