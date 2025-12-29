import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { generateUnsubscribeToken } from "@/lib/unsubscribe-token";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { subject, message } = await request.json();

    console.log("=== DEBUG ENVIO NEWSLETTER ===");
    console.log("Assunto:", subject);
    console.log("Mensagem (preview):", message.substring(0, 100) + "...");

    // Validação
    if (!subject || !message) {
      return NextResponse.json(
        { error: "Assunto e mensagem são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar todos os inscritos ativos
    const { data: subscribers, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.error("Erro ao buscar inscritos:", error);
      throw error;
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: "Nenhum inscrito ativo encontrado" },
        { status: 404 }
      );
    }

    console.log(`Enviando newsletter para ${subscribers.length} inscritos...`);

    // Preparar emails para envio em lote
    const emailPromises = subscribers.map(async (subscriber) => {
      const unsubscribeToken = generateUnsubscribeToken(subscriber.email);
      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/unsubscribe?token=${unsubscribeToken}`;

      return resend.emails.send({
        from: "PrintCast Newsletter <newsletter@ecgprintcast.com.br>",
        to: [subscriber.email],
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2c4f6f 0%, #1f3d56 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">PrintCast Newsletter</h1>
            </div>

            <div style="background-color: #ffffff; padding: 30px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5;">
              <p style="color: #2c4f6f; font-size: 16px; margin-bottom: 20px;">
                Olá, <strong>${subscriber.name}</strong>!
              </p>

              <div style="color: #333; line-height: 1.8; font-size: 15px;">
                ${message}
              </div>
            </div>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e5e5e5;">
              <p style="text-align: center; margin: 0 0 15px 0; color: #666; font-size: 14px;">
                Acompanhe nossas redes sociais:
              </p>

              <div style="text-align: center; margin-bottom: 20px;">
                <a href="https://www.youtube.com/@ECGPrintCast" style="margin: 0 8px; color: #2c4f6f; text-decoration: none; font-weight: 500;">YouTube</a>
                <a href="https://open.spotify.com/show/4vtLgRAvS7AsFfPowGgwdG" style="margin: 0 8px; color: #2c4f6f; text-decoration: none; font-weight: 500;">Spotify</a>
                <a href="https://www.instagram.com/print.cast/" style="margin: 0 8px; color: #2c4f6f; text-decoration: none; font-weight: 500;">Instagram</a>
                <a href="https://www.facebook.com/ecgprintcast" style="margin: 0 8px; color: #2c4f6f; text-decoration: none; font-weight: 500;">Facebook</a>
              </div>

              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

              <p style="color: #999; font-size: 11px; text-align: center; margin: 0;">
                Você está recebendo este email porque se inscreveu na newsletter do PrintCast.
                <br />
                <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Cancelar inscrição</a>
              </p>
            </div>
          </div>
        `,
      });
    });

    // Enviar todos os emails
    const results = await Promise.allSettled(emailPromises);

    // Contar sucessos e falhas
    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    console.log(`Newsletter enviada: ${successful} sucessos, ${failed} falhas`);
    console.log("=== FIM DEBUG ===");

    return NextResponse.json(
      {
        message: "Newsletter enviada com sucesso!",
        stats: {
          total: subscribers.length,
          successful,
          failed,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== ERRO AO ENVIAR NEWSLETTER ===");
    console.error("Erro completo:", error);
    console.error("=== FIM ERRO ===");
    return NextResponse.json(
      { error: "Erro ao enviar newsletter. Tente novamente." },
      { status: 500 }
    );
  }
}
