import { createHash } from "node:crypto";

export const handleCreateHash = (stringToHash: string) => {
	const hash = createHash("sha256").update(stringToHash).digest("hex");
	return hash;
};
