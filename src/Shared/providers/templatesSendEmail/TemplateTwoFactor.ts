import type { $Enums } from "@prisma/client";

type ITemplateTwoFactor = {
	code: string;
	scope: $Enums.twoFactorScope;
	expireInMinutes: number;
};

const getActionText: Record<$Enums.twoFactorScope, string> = {
	LOGIN: "acessar sua conta",
	PASSWORD_CHANGE: "alterar sua senha",
};

export const TemplateTwoFactor = ({ code, scope, expireInMinutes }: ITemplateTwoFactor) => {
	const minuteText = expireInMinutes === 1 ? "minuto" : "minutos";

	return `

    <div class="container">
      <h2 style="margin-bottom: 16px; color:#60c442;">Seu Código de Verificação</h1>
      <p style="margin-bottom: 16px;">Use o código abaixo para ${getActionText[scope]}:</p>

      <div class="code-box">
        ${code}
      </div>

      <p style="margin-bottom: 16px;">O código expira em ${expireInMinutes} ${minuteText} por motivos de segurança.</p>

      <div class="footer">
        <p style="margin-bottom: 16px;">Se você não solicitou este código, apenas ignore este e-mail.</p>
      </div>
    </div>
`;
};
