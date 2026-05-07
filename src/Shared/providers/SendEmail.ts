import { transporter } from "@Config/NodeMailer/nodemailer";
import { AppError } from "@Shared/Util/Errors/AppError";
import { ErrorDictionary } from "@Shared/Util/Errors/Dictionary";
import { logger } from "@Shared/Util/Logger";
import { TemplateCardCore } from "./templatesSendEmail/components/TemplateCardCore";

interface ISendEmail {
	toEmail: string;
	subject: string;
	content: string;
}

export const HandleSendEmail = async ({ toEmail, content, subject }: ISendEmail) => {
	try {
		await transporter.sendMail({
			from: "TEMPLATE <no-replay@agenus.com.br>",
			to: toEmail,
			subject,
			html: TemplateCardCore({ content }),
		});

		return { message: "Email Enviado com sucesso" };
	} catch (error) {
		logger.error(error);
		throw new AppError(ErrorDictionary.INTERN.email_send_error);
	}
};
