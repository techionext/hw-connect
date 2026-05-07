import { authenticator } from "otplib";
import QRCode from "qrcode";

export const generateTwoFactorSecret = async ({ email }: { email: string }) => {
	const secret = authenticator.generateSecret();

	const otpauth = authenticator.keyuri(
		email,
		"TEMPLATE", // Nome que aparece no app do Google Authenticator
		secret,
	);

	const qrCode = await QRCode.toDataURL(otpauth);

	return { secret, qrCode };
};
