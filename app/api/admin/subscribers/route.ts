import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filterStatus = searchParams.get("status"); // 'all', 'active', 'inactive'

    // Query base
    let query = supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    // Aplicar filtro de status se fornecido
    if (filterStatus === "active") {
      query = query.eq("is_active", true);
    } else if (filterStatus === "inactive") {
      query = query.eq("is_active", false);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Erro ao buscar inscritos:", error);
      throw error;
    }

    // Calcular estatísticas
    const allSubscribers = await supabase
      .from("newsletter_subscribers")
      .select("*");

    const total = allSubscribers.data?.length || 0;
    const active = allSubscribers.data?.filter((s) => s.is_active).length || 0;
    const inactive = total - active;

    // Novos inscritos nos últimos 7 dias
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recent = allSubscribers.data?.filter(
      (s) => new Date(s.created_at) > sevenDaysAgo
    ).length || 0;

    return NextResponse.json(
      {
        subscribers: data,
        stats: {
          total,
          active,
          inactive,
          recent,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json(
      { error: "Erro ao buscar inscritos" },
      { status: 500 }
    );
  }
}
