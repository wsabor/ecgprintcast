import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    console.log("=== DEBUG NEWSLETTER ===");
    console.log("Nome recebido:", name);
    console.log("Email recebido:", email);
    console.log("RESEND_API_KEY existe?", !!process.env.RESEND_API_KEY);
    console.log(
      "Email destino (NEWSLETTER_EMAIL_TO):",
      process.env.NEWSLETTER_EMAIL_TO,
    );

    // Validação básica
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 },
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    console.log("Tentando enviar email...");

    // Enviar email usando Resend
    const data = await resend.emails.send({
      from: "PrintCast Newsletter <newsletter@ecgprintcast.com.br>",
      to: [process.env.NEWSLETTER_EMAIL_TO || ""],
      subject: "Nova inscrição na Newsletter - PrintCast",
      html: `
        <h2>Nova inscrição na Newsletter do PrintCast</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR")}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          Esta é uma notificação automática de inscrição na newsletter.
        </p>
      `,
    });

    console.log("Email enviado com sucesso!");
    console.log("Resposta do Resend:", data);
    console.log("=== FIM DEBUG ===");

    return NextResponse.json(
      { message: "Inscrição realizada com sucesso!", data },
      { status: 200 },
    );
  } catch (error) {
    console.error("=== ERRO AO ENVIAR EMAIL ===");
    console.error("Erro completo:", error);
    console.error("=== FIM ERRO ===");
    return NextResponse.json(
      { error: "Erro ao processar inscrição. Tente novamente." },
      { status: 500 },
    );
  }
}
