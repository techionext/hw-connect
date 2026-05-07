import { zEnv } from "@Shared/Util/Env";
import { ButtonTemplate } from "./components/Buttons";

interface IForgotPassword {
	id: string;
	name: string;
}

export const TemplateForgotPassword = ({ id, name }: IForgotPassword) => `
<div class="content" style="font-family: Arial, Helvetica, sans-serif; color:#333333; line-height:1.6;">
  <h1 style="margin-bottom:20px; font-size:24px; color:#0150fe;">Recuperação de Senha</h1>
  
  <p style="margin-bottom:16px;">Olá, <strong>${name}</strong>,</p>
  
  <p style="margin-bottom:12px;">
    Recebemos uma solicitação para redefinir a senha da sua conta no <strong>TEMPLATE</strong>. 🔑  
  </p>
  
  <p style="margin-bottom:12px;">
    Para garantir a segurança da sua conta, este link ficará disponível apenas pelos próximos 
    <strong>30 minutos</strong>.
  </p>
  
  <p style="margin-bottom:20px;">
    Caso não tenha feito esta solicitação, você pode simplesmente ignorar este e-mail.  
    Sua senha permanecerá a mesma.
  </p>
  
  <div style="text-align:center; margin:30px 0;">
      ${ButtonTemplate({ text: "Recuperar Senha", link: `${zEnv.FRONT_END_BASE_URL}/forgot-password/${id}` })}
  </div>
  
  <p style="font-size:13px; color:#666666; margin-top:30px;">
    Se precisar de ajuda, entre em contato com nossa equipe de suporte.  
    Estamos prontos para te atender. 💚
  </p>
</div>
 
`;
