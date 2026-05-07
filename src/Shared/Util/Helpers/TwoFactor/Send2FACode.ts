import { HandleSendEmail } from "@Shared/providers/SendEmail";
import type { ISNSService } from "@Shared/providers/SNS/ISNSService";
import { TemplateTwoFactor } from "@Shared/providers/templatesSendEmail/TemplateTwoFactor";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import { FormatPhone } from "@Shared/Util/Formatters/FormatPhone";
import type { $Enums } from "@prisma/client";
import dayjs from "dayjs";
import type { IRepositoryUserGetOneDTO } from "src/Repositories/User/IRepositoryUser";
import type { IRepositoryUserTwoFactor } from "src/Repositories/User/TwoFactor/IRepositoryUserTwoFactor";
import { handleGenerateUuid } from "../Generators/GenerateUuid";

interface ISend2FACode {
	dataUser: NonNullable<
		IRepositoryUserGetOneDTO.Result<{
			email: string;
			getSecuritySettings: true;
		}>["data"]
	>;
	sendTo?: $Enums.twoFactorMethods;
	scope: $Enums.twoFactorScope;
	SNSService: ISNSService;
	RepositoryTwoFactor: IRepositoryUserTwoFactor;
}

// Função para gerar código de 6 dígitos
function generateSixDigitCode(): string {
	const code = Math.floor(100000 + Math.random() * 900000);
	return code.toString();
}

export const methodExpireMap: Record<$Enums.twoFactorScope, number> = {
	LOGIN: 60,
	PASSWORD_CHANGE: 15,
};

export const Send2FACode = async ({ sendTo, dataUser, scope, RepositoryTwoFactor, SNSService }: ISend2FACode) => {
	if (!dataUser.securitySettings) {
		throw new AppError(ErrorDictionary.USER.cannot_send_2fa_code);
	}

	const SEND_TO_METHOD = sendTo || dataUser.securitySettings.defaultMethod;

	const code = generateSixDigitCode();

	if (SEND_TO_METHOD === "EMAIL") {
		if (dataUser.emailStatus === "NOT_VERIFIED") throw new AppError(ErrorDictionary.USER.email_not_verified);

		await HandleSendEmail({
			toEmail: dataUser.email,
			subject: "TEMPLATE - Código de verificação",
			content: TemplateTwoFactor({ code, scope, expireInMinutes: methodExpireMap[scope] }),
		});
	}

	if (SEND_TO_METHOD === "PHONE") {
		const phone = FormatPhone({ phone: dataUser.phone });
		if (!phone) throw new AppError(ErrorDictionary.USER.phone_not_found);

		const result = await SNSService.SendSMS({
			phone: `${phone.country}${phone.ddd}${phone.number}`,
			message: `Seu código de verificação é: ${code} - Expira em ${methodExpireMap[scope]} minutos`,
		});

		if (!result.success) throw new AppError(ErrorDictionary.TWO_FACTOR.error_sending_sms);
	}

	await RepositoryTwoFactor.ExpireOtherCodes({
		userId: dataUser.id,
		scope: scope,
	});

	const expiresAt = dayjs().add(methodExpireMap[scope], "minutes").toDate();

	const twoFactorId = handleGenerateUuid();

	await RepositoryTwoFactor.Create({
		userId: dataUser.id,
		scope: scope,
		code: code,
		id: twoFactorId,
		expiresAt: expiresAt,
		method: SEND_TO_METHOD,
	});

	return {
		twoFactorId,
		methodSent: SEND_TO_METHOD,
		expireInMinutes: methodExpireMap[scope],
	};
};
