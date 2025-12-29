import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { generateUnsubscribeToken } from "@/lib/unsubscribe-token";

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

    // 1. SALVAR NO SUPABASE
    console.log("Salvando no Supabase...");

    const { data: subscriber, error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          name: name,
          email: email,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Erro ao salvar no Supabase:", dbError);

      // Se for erro de duplicação (email já existe), retorna erro específico
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "Este email já está cadastrado na newsletter." },
          { status: 400 },
        );
      }

      throw dbError;
    }

    console.log("Salvo no Supabase com sucesso! ID:", subscriber.id);

    // 2. ENVIAR EMAIL PARA ADMIN
    console.log("Enviando email para admin...");

    const adminEmailData = await resend.emails.send({
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

    console.log("Email admin enviado com sucesso!");
    console.log("Resposta do Resend (Admin):", adminEmailData);

    // 3. ENVIAR EMAIL DE BOAS-VINDAS PARA O INSCRITO
    console.log("Enviando email de boas-vindas para o inscrito...");

    // Gera token único para descadastramento
    const unsubscribeToken = generateUnsubscribeToken(email);
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/unsubscribe?token=${unsubscribeToken}`;

    const welcomeEmailData = await resend.emails.send({
      from: "PrintCast Newsletter <newsletter@ecgprintcast.com.br>",
      to: [email],
      subject: "Bem-vindo à Newsletter do PrintCast!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c4f6f;">Olá, ${name}! 👋</h2>

          <p style="font-size: 16px; line-height: 1.6;">
            Seja muito bem-vindo(a) à Newsletter do <strong>PrintCast</strong>,
            o podcast queridinho da indústria gráfica!
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            A partir de agora você receberá em primeira mão:
          </p>

          <ul style="font-size: 16px; line-height: 1.8;">
            <li>📺 Notificações sobre novos episódios (toda quinta às 19h)</li>
            <li>📰 Notícias importantes da indústria gráfica</li>
            <li>💡 Conteúdos exclusivos e insights do setor</li>
          </ul>

          <p style="font-size: 16px; line-height: 1.6;">
            Acompanhe também nossas redes sociais para não perder nada!
          </p>

          <div style="margin: 30px 0;">
            <a href="https://www.youtube.com/@ECGPrintCast" style="margin: 0 10px; text-decoration: none; color: #2c4f6f;">YouTube</a>
            <a href="https://open.spotify.com/show/4vtLgRAvS7AsFfPowGgwdG" style="margin: 0 10px; text-decoration: none; color: #2c4f6f;">Spotify</a>
            <a href="https://www.instagram.com/print.cast/" style="margin: 0 10px; text-decoration: none; color: #2c4f6f;">Instagram</a>
            <a href="https://www.facebook.com/ecgprintcast" style="margin: 0 10px; text-decoration: none; color: #2c4f6f;">Facebook</a>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;" />

          <p style="color: #666; font-size: 12px;">
            Você está recebendo este email porque se inscreveu na newsletter do PrintCast.
            <br />
            Não quer mais receber nossos emails?
            <a href="${unsubscribeUrl}" style="color: #2c4f6f; text-decoration: underline;">Clique aqui para descadastrar</a>
          </p>
        </div>
      `,
    });

    console.log("Email de boas-vindas enviado com sucesso!");
    console.log("Resposta do Resend (Welcome):", welcomeEmailData);
    console.log("=== FIM DEBUG ===");

    return NextResponse.json(
      {
        message: "Inscrição realizada com sucesso!",
        subscriber: subscriber,
      },
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
