import type { Prisma } from "@prisma/client";
import type { IRepositoryFile } from "src/Repositories/File/IRepositoryFile";
import { handleGenerateUuid } from "./GenerateUuid";
import { UploadFile } from "./UploadFile";

interface IUploadMultipleFiles {
	files: {
		file: { buffer: Buffer; originalname: string } | undefined;
		pkLabel: keyof Omit<
			Prisma.fileUncheckedCreateInput,
			"id" | "url" | "size" | "originalName" | "mimeType" | "key" | "versionId" | "createdAt" | "updatedAt"
		>;
		pkId: string;
	}[];
	prefixUrl: string;
	RepositoryFile: IRepositoryFile;
}

export const UploadMultipleFiles = async ({ files, prefixUrl, RepositoryFile }: IUploadMultipleFiles) => {
	for (const file of files) {
		if (!file.file) {
			continue;
		}

		const { success, file: fileUploaded } = await UploadFile({
			file: file.file,
			key: handleGenerateUuid(),
			prefixUrl,
		});

		if (success) {
			await RepositoryFile.Create({
				id: handleGenerateUuid(),
				...fileUploaded,
				[file.pkLabel]: file.pkId,
			});
		}
	}
};
