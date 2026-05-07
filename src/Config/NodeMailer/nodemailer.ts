import { AWS_SES } from "@Config/AWS/SES";
import { logger } from "@Shared/Util/Logger";
import "dotenv/config";
import nodemailer from "nodemailer";

// Configuração do transporter NodeMailer com AWS SES
export const transporter = nodemailer.createTransport({ SES: AWS_SES });

// Verificação de conexão apenas quando necessário
transporter.verify((error, success) => {
	if (error) {
		logger.fatal(`Error connection SES: ${error.message || error}`);
		return;
	}

	logger.info("Success connected SES");
	return success;
});
