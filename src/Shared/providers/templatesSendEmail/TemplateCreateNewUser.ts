import { zEnv } from "@Shared/Util/Env";
import { ButtonTemplate } from "./components/Buttons";

interface ICreateNewUser {
	magicLinkId: string;
	name: string;
}

export const TemplateCreateNewUser = ({ name, magicLinkId }: ICreateNewUser) => `
<div class="email-content">
  <div class="content-wrapper">
    <div class="container">
      <div class="content">
        <h1 style="margin-bottom: 20px; color:#0150fe;">Seja bem-vindo(a) à TEMPLATE!</h1>
        <p style="margin-bottom: 20px;">Olá, <strong>${name}</strong>,</p>
        <p style="margin-bottom: 10px;">Sua conta foi criada com sucesso🎉🎉 e agora você está pronto(a) para
           explorar todos os recursos disponíveis.
        </p>

        <p style="margin-bottom: 16px;">Para acessar sua conta, basta <strong>clicar no botão abaixo</strong>:</p>

          ${ButtonTemplate({ text: "Acessar Minha Conta", link: `${zEnv.FRONT_END_BASE_URL}/magic-link/${magicLinkId}` })}

        <p style="padding-bottom: 12px; margin-top: 12px;"><strong>Este Magic Link é seguro </strong> e permite que você acesse sua
          conta sem precisar de
          senha. Simples e rápido!</strong>
        </p>
        <p>Aguardamos sua participação e desejamos muito sucesso em sua nova jornada com a
          <strong>TEMPLATE</strong>!
        </p>
      </div>
    </div>
  </div>
</div> 
`;
