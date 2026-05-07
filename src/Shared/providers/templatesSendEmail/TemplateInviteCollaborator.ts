import { zEnv } from "@Shared/Util/Env";
import { ButtonTemplate } from "./components/Buttons";
import { TemplateCardCore } from "./components/TemplateCardCore";

interface IInviteCollaborator {
	inviteId: string;
	hasAccount: boolean;
	inviterName: string; // Nome do usuário que está convidando
}

export const TemplateInviteCollaborator = ({ inviteId, hasAccount, inviterName }: IInviteCollaborator) => {
	const content = `
		<div class="content" style="font-family: Arial, Helvetica, sans-serif; color:#333333; line-height:1.6;">
			<h1 style="margin-bottom:20px; font-size:24px; color:#0150fe;">Convite para Colaboração</h1>
			
			<p style="margin-bottom:16px;">Olá,</p>
			
			<p style="margin-bottom:12px;">
				O usuário <strong>${inviterName}</strong> convidou você para ser colaborador na <strong>TEMPLATE</strong>! 🎉
			</p>
			
			<p style="margin-bottom:12px;">
				Ao aceitar este convite, você terá acesso a todas as funcionalidades e recursos que nossa plataforma oferece 
				para trabalhar de maneira mais eficiente e colaborativa.
			</p>
			
			<p style="margin-bottom:20px;">
				Clique no botão abaixo para aceitar o convite e começar a colaborar:
			</p>
			
			<div style="text-align:center; margin:30px 0;">
				${ButtonTemplate({ text: "Aceitar Convite", link: `${zEnv.FRONT_END_BASE_URL}/collaborator-invite?inviteId=${inviteId}&hasAccount=${hasAccount}` })}
			</div>
			
			<p style="margin-bottom:12px;">
				Se você não estava esperando por este convite ou se acha que houve um erro, 
				por favor, entre em contato com nossa equipe de suporte.
			</p>
			
			<p style="font-size:13px; color:#666666; margin-top:30px;">
				Aguardamos sua participação e desejamos muito sucesso em sua nova jornada com a <strong>TEMPLATE</strong>! 💚
			</p>
		</div>
	`;

	return TemplateCardCore({ content });
};
