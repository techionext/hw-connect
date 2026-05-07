import type { IErrorDictionary } from "./schema";

export const ErrorDictionary = {
	SECURITY_SETTINGS: {
		cannot_update_authenticator_when_no_other_methods: {
			codeIntern: "SECURITY_SETTINGS_0002",
			message: {
				PT_BR: "Não é possível atualizar o método de autenticação atual. Adicione pelo menos um método de autenticação.",
				EN_US: "It is not possible to update the current authentication method. Add at least one authentication method.",
			},
		},
	},

	AUTH: {
		user_inactive: {
			codeIntern: "ATH_0016",
			message: {
				PT_BR: "Usuário inativo. Por favor, contate o suporte.",
				EN_US: "User inactive. Please contact support.",
			},
		},
		expired_session: {
			codeIntern: "ATH_0015",
			message: {
				PT_BR: "Sessão expirada. Por favor, faça login novamente.",
				EN_US: "Session expired. Please login again.",
			},
		},
		invalid_token_format: {
			codeIntern: "ATH_0014",
			message: {
				PT_BR: "Formato do token inválido. Certifique-se de que o token está correto.",
				EN_US: "Invalid token format. Please ensure the token is correct.",
			},
		},
		required: {
			codeIntern: "ATH_0013",
			message: {
				PT_BR: "Token de autenticação é obrigatório. Verifique e tente novamente.",
				EN_US: "Authentication token is required. Please check and try again.",
			},
		},
		token_not_found: {
			codeIntern: "ATH_0001",

			message: {
				PT_BR: "Token de autenticação não encontrado. Verifique e tente novamente.",
				EN_US: "Authentication token not found. Please check and try again.",
			},
		},
		token_invalid_format: {
			codeIntern: "ATH_0002",
			message: {
				PT_BR: "Formato do token inválido. Certifique-se de que o token está correto.",
				EN_US: "Invalid token format. Please ensure the token is correct.",
			},
		},
		token_expired: {
			codeIntern: "ATH_0003",
			message: {
				PT_BR: "Sessão expirada. Por favor, faça login novamente.",
				EN_US: "Session expired. Please login again.",
			},
		},
		invalid_email_or_password: {
			codeIntern: "ATH_0004",
			message: {
				PT_BR: "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.",
				EN_US: "Invalid email or password. Please check your credentials and try again.",
			},
		},
		magic_link_not_found: {
			codeIntern: "ATH_0005",
			message: {
				PT_BR: "Magic link não encontrado ou inválido.",
				EN_US: "Magic link not found or invalid.",
			},
		},
		login_success: {
			codeIntern: "ATH_0006",
			message: {
				PT_BR: "Login realizado com sucesso. Bem-vindo!",
				EN_US: "Login successful. Welcome!",
			},
		},
		oauth_error: {
			codeIntern: "ATH_0007",
			message: {
				PT_BR: "Erro ao processar o OAuth. Por favor, tente novamente.",
				EN_US: "Error processing OAuth. Please try again.",
			},
		},
		oauth_already_exists: {
			codeIntern: "ATH_0008",
			message: {
				PT_BR: "Já existe um perfil com este provedor de autenticação. Por favor, tente novamente.",
				EN_US: "There is already a profile with this authentication provider. Please try again.",
			},
		},
		provider_added_successfully: {
			codeIntern: "ATH_0009",
			message: {
				PT_BR: "Provedor de autenticação adicionado com sucesso.",
				EN_US: "Authentication provider added successfully.",
			},
		},
		oauth_deleted_successfully: {
			codeIntern: "ATH_0010",
			message: {
				PT_BR: "Provedor de autenticação removido com sucesso.",
				EN_US: "Authentication provider removed successfully.",
			},
		},
		oauth_not_found: {
			codeIntern: "ATH_0011",
			message: {
				PT_BR: "Provedor de autenticação não encontrado. Por favor, tente novamente.",
				EN_US: "Authentication provider not found. Please try again.",
			},
		},
		magic_link_created_successfully: {
			codeIntern: "ATH_0012",
			message: {
				PT_BR: "Link de autenticação mágica criado com sucesso.",
				EN_US: "Magic link created successfully.",
			},
		},
	},

	USER: {
		phone_not_found: {
			codeIntern: "USER_0012",
			message: {
				PT_BR: "Telefone não encontrado. Verifique suas credenciais e tente novamente.",
				EN_US: "Phone not found. Please check your credentials and try again.",
			},
		},
		email_not_verified: {
			codeIntern: "USER_0011",
			message: {
				PT_BR: "E-mail não verificado. Verifique suas credenciais e tente novamente.",
				EN_US: "Email not verified. Please check your credentials and try again.",
			},
		},
		cannot_send_2fa_code: {
			codeIntern: "USER_0010",
			message: {
				PT_BR: "Não é possível enviar o código de autenticação. Verifique suas credenciais e tente novamente.",
				EN_US: "Cannot send the authentication code. Please check your credentials and try again.",
			},
		},
		email_already_exists: {
			codeIntern: "USER_0001",
			message: {
				PT_BR: "E-mail já cadastrado. Verifique suas credenciais e tente novamente.",
				EN_US: "Email already registered. Please check your credentials and try again.",
			},
		},
		password_not_match: {
			codeIntern: "USER_0002",
			message: {
				PT_BR: "As senhas não conferem. Verifique suas credenciais e tente novamente.",
				EN_US: "Passwords do not match. Please check your credentials and try again.",
			},
		},
		create_success: {
			codeIntern: "USER_0003",
			message: {
				PT_BR: "Usuário criado com sucesso. Bem-vindo!",
				EN_US: "User created successfully. Welcome!",
			},
		},
		not_found: {
			codeIntern: "USER_0004",
			message: {
				PT_BR: "Usuário não encontrado. Verifique suas credenciais e tente novamente.",
				EN_US: "User not found. Please check your credentials and try again.",
			},
		},
		security_settings_not_found: {
			codeIntern: "USER_0005",
			message: {
				PT_BR: "Configurações de segurança não encontradas. Verifique suas credenciais e tente novamente.",
				EN_US: "Security settings not found. Please check your credentials and try again.",
			},
		},
		security_settings_need_at_least_one: {
			codeIntern: "USER_0006",
			message: {
				PT_BR: "É necessário adicionar pelo menos um método de autenticação.",
				EN_US: "It is necessary to add at least one authentication method.",
			},
		},
		security_settings_updated: {
			codeIntern: "USER_0007",
			message: {
				PT_BR: "Configurações de segurança atualizadas com sucesso.",
				EN_US: "Security settings updated successfully.",
			},
		},
		credentials_added_successfully: {
			codeIntern: "USER_0008",
			message: {
				PT_BR: "Credenciais adicionadas com sucesso.",
				EN_US: "Credentials added successfully.",
			},
		},
		email_already_registered: {
			codeIntern: "USER_0009",
			message: {
				PT_BR: "E-mail já cadastrado. Verifique suas credenciais e tente novamente.",
				EN_US: "Email already registered. Please check your credentials and try again.",
			},
		},
	},

	TWO_FACTOR: {
		authenticator_validated: {
			codeIntern: "TWO_FACTOR_00014",
			message: {
				PT_BR: "Autenticação com aplicativo de autenticação validada com sucesso.",
				EN_US: "Authentication with authentication application validated successfully.",
			},
		},
		authenticator_code_not_generated: {
			codeIntern: "TWO_FACTOR_00013",
			message: {
				PT_BR: "Código de autenticação não gerado. Verifique suas credenciais e tente novamente.",
				EN_US: "Authenticator code not generated. Please check your credentials and try again.",
			},
		},
		code_validated: {
			codeIntern: "TWO_FACTOR_00012",
			message: {
				PT_BR: "Código de autenticação validado com sucesso.",
				EN_US: "Authenticator code validated successfully.",
			},
		},
		not_valid_or_expired: {
			codeIntern: "TWO_FACTOR_00011",
			message: {
				PT_BR: "Código de autenticação inválido ou expirado. Verifique suas credenciais e tente novamente.",
				EN_US: "Authenticator invalid or expired. Please check your credentials and try again.",
			},
		},
		authenticator_invalid_code: {
			codeIntern: "TWO_FACTOR_00010",
			message: {
				PT_BR: "Código de autenticação inválido. Verifique suas credenciais e tente novamente.",
				EN_US: "Authenticator invalid code. Please check your credentials and try again.",
			},
		},
		security_settings_not_found: {
			codeIntern: "TWO_FACTOR_0009",
			message: {
				PT_BR: "Configurações de segurança não encontradas. Verifique suas credenciais e tente novamente.",
				EN_US: "Security settings not found. Please check your credentials and try again.",
			},
		},
		code_sent: {
			codeIntern: "TWO_FACTOR_0008",
			message: {
				PT_BR: "Código de verificação enviado com sucesso.",
				EN_US: "Code sent successfully.",
			},
		},
		error_sending_sms: {
			codeIntern: "TWO_FACTOR_0007",
			message: {
				PT_BR: "Erro ao enviar SMS. Por favor, tente novamente.",
				EN_US: "Error sending SMS. Please try again.",
			},
		},
		email_not_registered: {
			codeIntern: "TWO_FACTOR_0001",
			message: {
				PT_BR: "E-mail não cadastrado. Verifique suas credenciais e tente novamente.",
				EN_US: "Email not registered. Please check your credentials and try again.",
			},
		},
		phone_not_registered: {
			codeIntern: "TWO_FACTOR_0002",
			message: {
				PT_BR: "Telefone não cadastrado. Verifique suas credenciais e tente novamente.",
				EN_US: "Phone not registered. Please check your credentials and try again.",
			},
		},
		authenticator_not_registered: {
			codeIntern: "TWO_FACTOR_0003",
			message: {
				PT_BR: "Authenticator não cadastrado. Verifique suas credenciais e tente novamente.",
				EN_US: "Authenticator not registered. Please check your credentials and try again.",
			},
		},
		authenticator_not_validated: {
			codeIntern: "TWO_FACTOR_0004",
			message: {
				PT_BR: "Authenticator não validado. Verifique suas credenciais e tente novamente.",
				EN_US: "Authenticator not validated. Please check your credentials and try again.",
			},
		},
		authenticator_not_validated2: {
			codeIntern: "TWO_FACTOR_0005",
			message: {
				PT_BR: "O Authenticator do usuário nao esta validado, então nao e possível adicionar esse método de autenticação",
				EN_US: "The Authenticator of the user is not validated, so it is not possible to add this authentication method",
			},
		},
		scope_expired: {
			codeIntern: "TWO_FACTOR_0006",
			message: {
				PT_BR: "O escopo de autenticação expirou. Por favor, faça a validação novamente.",
				EN_US: "The authentication scope has expired. Please validate again.",
			},
		},
	},

	INTERN: {
		email_send_error: {
			codeIntern: "INT_0004",
			message: {
				PT_BR: "Erro ao enviar email. Por favor, tente novamente.",
				EN_US: "Error sending email. Please try again.",
			},
		},
		unknown_error: {
			codeIntern: "INT_0001",
			message: {
				PT_BR: "Erro desconhecido contate o suporte.",
				EN_US: "Unknown error contact support.",
			},
		},
		invalid_request: {
			codeIntern: "INT_0002",
			message: {
				PT_BR: "Dados enviados incorretos, cheque as informações e tente novamente.",
				EN_US: "Invalid data, check the information and try again.",
			},
		},
		invalid_table_to_check_codes: {
			codeIntern: "INT_0003",
			message: {
				PT_BR: "Tabela inválida para verificar códigos. Contate o suporte.",
				EN_US: "Invalid table to check codes. Contact support.",
			},
		},
	},

	UPLOAD: {
		type_invalid: {
			codeIntern: "UPL_0001",
			message: {
				PT_BR: "Tipo de arquivo enviado e invalido.",
				EN_US: "Invalid file type sent.",
			},
		},
	},
} satisfies IErrorDictionary;
