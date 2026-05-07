import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import type { $Enums } from "@prisma/client";

import dayjs from "dayjs";
import { RepositoryUser } from "src/Repositories/User/RepositoryUser";
import { container } from "tsyringe";

type IValidateTwoFactor = {
	scope: $Enums.twoFactorScope;
	userId: string;
};

const scopeMapper: Record<$Enums.twoFactorScope, "loginValidAt" | "changePasswordValidAt"> = {
	LOGIN: "loginValidAt",
	PASSWORD_CHANGE: "changePasswordValidAt",
};

export const ValidateTwoFactor = async ({ scope, userId }: IValidateTwoFactor) => {
	const repositoryUser = container.resolve(RepositoryUser);

	const { data: dataUser } = await repositoryUser.GetOne({ id: userId, getSecuritySettings: true });
	if (!dataUser) {
		throw new AppError(ErrorDictionary.USER.not_found, 401);
	}

	if (!dataUser.securitySettings) {
		return {
			isValid: true,
		};
	}

	if (scope === "LOGIN" && !dataUser.securitySettings.needToLogin) {
		return {
			isValid: true,
		};
	}

	const validUntil = dataUser.securitySettings[scopeMapper[scope]];

	if (dayjs().isAfter(dayjs(validUntil))) {
		return {
			isValid: false,
		};
	}

	return {
		isValid: true,
	};
};
