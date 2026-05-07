import { v4 as uuidV4 } from "uuid";

export const handleGenerateUuid = () => {
	const resultUuid = uuidV4();

	return resultUuid;
};
