// import { inject, injectable } from "tsyringe";

// import { zEnv } from "@Shared/Util/Env/SchemaEnv";
// import { ZODVerifyParse } from "@Shared/Util/ZOD/zod";

// import type { ISQSService } from "../ISQSConfig";
// import type { IProductsDeleteDTO, IQueueDeleteFiles, IQueueFilesDeleteModel } from "./DTO/IQueueFilesDelete";
// import { SchemaQueueFilesDelete } from "./SchemaQueueFilesDelete";

// @injectable()
// export class QueueDeleteFiles implements IQueueDeleteFiles {
// 	private queueUrl: string;

// 	constructor(@inject("SQSService") private SQSService: ISQSService) {
// 		this.queueUrl = zEnv.AWS.QUEUE.SERVICES.FILES_DELETE;
// 	}

// 	async execute(request: IProductsDeleteDTO.Params): Promise<void> {
// 		// fazer validação se fila conseguiu se conectar, se n conseguiu então mandar para uma outra fila que vai ir com uma tag do nome da fila
// 		const { key, nameBucket } = ZODVerifyParse({ schema: SchemaQueueFilesDelete, data: request });

// 		const params: IQueueFilesDeleteModel = {
// 			key,
// 			nameBucket,
// 		};

// 		await this.SQSService.sendMessage(this.queueUrl, params);
// 	}
// }
