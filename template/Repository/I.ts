import type { Prisma } from "@prisma/client";
import type { defaultGetParams, defaultGetResult } from "../_Helper/types";

export namespace IRepositoryENTITYCreateDTO {
	export type Params = Prisma.entityUncheckedCreateInput;
}

export namespace IRepositoryENTITYUpdateDTO {
	export type Params = Prisma.entityUncheckedUpdateInput & { id: string };
}

export namespace IRepositoryENTITYDeleteDTO {
	export type Params = { id: string };
}

export namespace IRepositoryENTITYGetOneDTO {
	export type Params = {
		id?: string;
	};
	export type Result = {
		data: Prisma.entityGetPayload<{}> | null;
	};
}

export namespace IRepositoryENTITYGetManyDTO {
	export type Params = {} & defaultGetParams;
	export type Result = {
		data: Prisma.entityGetPayload<{}>[];
	} & defaultGetResult;
}

// export namespace IRepositoryENTITYMethodDTO {
// 	export type Params = {};
// 	export type Result = {};
// }

export interface IRepositoryENTITY {
	// Method(data: IRepositoryENTITYMethodDTO.Params): Promise<IRepositoryENTITYMethodDTO.Result>;

	Create(data: IRepositoryENTITYCreateDTO.Params): Promise<void>;
	Update(data: IRepositoryENTITYUpdateDTO.Params): Promise<void>;
	Delete(data: IRepositoryENTITYDeleteDTO.Params): Promise<void>;
	GetOne(data: IRepositoryENTITYGetOneDTO.Params): Promise<IRepositoryENTITYGetOneDTO.Result>;
	GetMany(data: IRepositoryENTITYGetManyDTO.Params): Promise<IRepositoryENTITYGetManyDTO.Result>;
}
