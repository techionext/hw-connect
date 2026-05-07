import crypto from "node:crypto";

export const handleCreateHashImg = (originalName: string) => {
	const createHash = crypto.randomBytes(16).toString("hex");
	const fileName = `${createHash}-${originalName}`;

	return fileName;
};
