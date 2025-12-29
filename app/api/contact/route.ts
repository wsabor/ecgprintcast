import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    console.log("=== DEBUG CONTATO ===");
    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Telefone:", phone);
    console.log("Mensagem:", message);

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nome, email e mensagem são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    console.log("Enviando email de contato...");

    // Enviar email usando Resend
    const data = await resend.emails.send({
      from: "PrintCast Contato <contato@ecgprintcast.com.br>",
      to: [process.env.NEWSLETTER_EMAIL_TO || "ecgprintcast@gmail.com"],
      replyTo: email, // Permite responder diretamente ao remetente
      subject: `Nova mensagem de contato - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c4f6f; border-bottom: 3px solid #2c4f6f; padding-bottom: 10px;">
            Nova Mensagem de Contato
          </h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;">
              <strong style="color: #2c4f6f;">Nome:</strong> ${name}
            </p>
            <p style="margin: 0 0 10px 0;">
              <strong style="color: #2c4f6f;">Email:</strong>
              <a href="mailto:${email}" style="color: #2c4f6f;">${email}</a>
            </p>
            ${phone ? `
              <p style="margin: 0 0 10px 0;">
                <strong style="color: #2c4f6f;">Telefone:</strong> ${phone}
              </p>
            ` : ''}
            <p style="margin: 0;">
              <strong style="color: #2c4f6f;">Data:</strong> ${new Date().toLocaleString("pt-BR")}
            </p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #2c4f6f; margin: 20px 0;">
            <h3 style="color: #2c4f6f; margin-top: 0;">Mensagem:</h3>
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;" />

          <p style="color: #666; font-size: 12px; text-align: center;">
            Esta é uma mensagem automática do formulário de contato do PrintCast.
            <br />
            Para responder, clique em "Responder" ou envie um email diretamente para <strong>${email}</strong>
          </p>
        </div>
      `,
    });

    console.log("Email enviado com sucesso!");
    console.log("Resposta do Resend:", data);
    console.log("=== FIM DEBUG ===");

    return NextResponse.json(
      { message: "Mensagem enviada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== ERRO AO ENVIAR EMAIL ===");
    console.error("Erro completo:", error);
    console.error("=== FIM ERRO ===");
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
