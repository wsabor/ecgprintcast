import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateUnsubscribeToken } from "@/lib/unsubscribe-token";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token de descadastramento não fornecido" },
        { status: 400 }
      );
    }

    // Valida o token e extrai o email
    const email = validateUnsubscribeToken(token);

    if (!email) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 400 }
      );
    }

    console.log("Descadastrando email:", email);

    // Desativa o inscrito no Supabase
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .update({ is_active: false })
      .eq("email", email)
      .eq("is_active", true)
      .select();

    if (error) {
      console.error("Erro ao descadastrar:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Email não encontrado ou já estava descadastrado" },
        { status: 404 }
      );
    }

    console.log("Email descadastrado com sucesso:", email);

    return NextResponse.json(
      {
        message: "Descadastramento realizado com sucesso!",
        email: email
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar descadastramento:", error);
    return NextResponse.json(
      { error: "Erro ao processar descadastramento" },
      { status: 500 }
    );
  }
}
