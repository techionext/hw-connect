import type { Prisma } from "@prisma/client";
import type { IRepositoryFile } from "src/Repositories/File/IRepositoryFile";
import { handleGenerateUuid } from "./GenerateUuid";
import { UploadFile } from "./UploadFile";

interface IUpdateMultipleFiles {
	files: {
		old: { id: string; url: string; key: string } | null;
		new:
			| {
					buffer: Buffer;
					originalname: string;
			  }
			| undefined;
		pkLabel: keyof Omit<
			Prisma.fileUncheckedCreateInput,
			"id" | "url" | "size" | "originalName" | "mimeType" | "key" | "versionId" | "createdAt" | "updatedAt"
		>;
		pkId: string;
	}[];
	prefixUrl: string;
	RepositoryFile: IRepositoryFile;
}

export const UpdateMultipleFiles = async ({ RepositoryFile, files, prefixUrl }: IUpdateMultipleFiles) => {
	for (const file of files) {
		if (!file.new) {
			continue;
		}

		const imageId = file.old?.key || handleGenerateUuid();

		const { success, file: fileUploaded } = await UploadFile({
			file: file.new,
			key: imageId,
			prefixUrl,
		});

		if (success) {
			if (!file.old?.key) {
				await RepositoryFile.Create({
					id: imageId,
					...fileUploaded,
					[file.pkLabel]: file.pkId,
				});
			}

			if (file.old?.key) {
				await RepositoryFile.Update({
					id: file.old.id,
					...fileUploaded,
					[file.pkLabel]: file.pkId,
				});
			}
		}
	}
};
