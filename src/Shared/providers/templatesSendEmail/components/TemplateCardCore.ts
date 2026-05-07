interface ITemplateCardCore {
	content: string;
}

export const TemplateCardCore = ({ content }: ITemplateCardCore): string => `
 <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>TEMPLATE - Notificação</title>
  </head>

  <body style="font-family: Arial, Helvetica, sans-serif; background-color:#f8f9fa; margin:0; padding:0; color:#333333;">
    <div style="width:100%; background-color:#f8f9fa; padding:20px 0;">
      <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden;">
        
        <div style="background-color:#0150fe; padding:32px 24px; text-align:center;">
          <div style="margin:0 auto 16px; background:#ffffff; width:80px; height:80px; border-radius:16px; padding:16px;">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#0150fe"/>
              <path d="M14 24L20 30L34 16" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 style="color:#ffffff; font-size:28px; font-weight:700; margin:0 0 8px;">TEMPLATE</h1>
          <p style="color:#edecf8; font-size:16px; margin:0;">Soluções de Pagamento Inteligentes</p>
        </div>

        <div style="padding:40px 32px; background-color:#ffffff; min-height:200px;">
          ${content}
        </div>

        <div style="background-color:#2c3e50; padding:32px 24px; text-align:center;">
          <div style="margin:0 auto 20px; background:#0150fe; width:60px; height:60px; border-radius:12px; padding:12px;">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="6" fill="white"/>
              <path d="M10.5 18L15 22.5L25.5 12" stroke="#0150fe" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <p style="color:#ffffff; font-size:16px; margin:0 0 16px; font-weight:500;">Transformando a forma como você faz pagamentos</p>

          <div style="margin:24px 0;">

          <div style="margin:24px 0;">
            <a href="#">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="20" height="20" style="margin:10px;" alt="LinkedIn">
            </a>

            <a href="#">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="20" height="20" style="margin:10px;" alt="Twitter">
            </a>

            <a href="#" >
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="20" height="20" style="margin:10px;" alt="Instagram">
            </a>
          </div>

          <div style="color:rgba(255,255,255,0.7); font-size:12px; margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.2);">
            <p style="margin:0;">Este é um e-mail automático da TEMPLATE. Por favor, não responda a esta mensagem.</p>
            <p style="margin:0;">© 2024 TEMPLATE. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
