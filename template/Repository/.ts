import { prisma } from "@Config/Prisma/prisma";
import { logger } from "@Shared/Util/Logger";
import type { Prisma } from "@prisma/client";
import type {
  IRepositoryENTITY,
  IRepositoryENTITYCreateDTO,
  IRepositoryENTITYDeleteDTO,
  IRepositoryENTITYGetManyDTO,
  IRepositoryENTITYGetOneDTO,
  IRepositoryENTITYUpdateDTO,
} from "./IRepositoryENTITY";

export class RepositoryENTITY implements IRepositoryENTITY {
	async Create(data: IRepositoryENTITYCreateDTO.Params): Promise<void> {
		await prisma.entity.create({
			data,
		});
	}

	async Update(data: IRepositoryENTITYUpdateDTO.Params): Promise<void> {
		await prisma.entity.update({
			where: { id: data.id },
			data,
		});
	}

	async Delete(data: IRepositoryENTITYDeleteDTO.Params): Promise<void> {
		await prisma.entity.delete({
			where: { id: data.id },
		});
	}

	async GetOne({ id }: IRepositoryENTITYGetOneDTO.Params): Promise<IRepositoryENTITYGetOneDTO.Result> {
		if (!id) {
			logger.warn("IRepositoryENTITYGetOneDTO null params");
			return { data: null };
		}

		const where: Prisma.entityWhereInput = {
			id,
		};

		const data = await prisma.entity.findFirst({
			where,
		});

		return { data };
	}

	async GetMany({ page, pageSize, filter }: IRepositoryENTITYGetManyDTO.Params): Promise<IRepositoryENTITYGetManyDTO.Result> {
		const where: Prisma.entityWhereInput = {};

		const [data, total] = await prisma.$transaction([
			prisma.entity.findMany({
				where,
				orderBy: {
					createdAt: "desc",
				},
				skip: (page - 1) * pageSize,
				take: pageSize,
			}),
			prisma.entity.count({ where }),
		]);

		return {
			data,
			meta: {
				total,
				totalPages: Math.ceil(total / pageSize),
				page,
				pageSize,
			},
		};
	}
}
