"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Link de descadastramento inválido");
      return;
    }

    // Processa o descadastramento
    const unsubscribe = async () => {
      try {
        const response = await fetch("/api/newsletter/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setEmail(data.email);
          setMessage("Você foi descadastrado da newsletter com sucesso!");
        } else {
          setStatus("error");
          setMessage(data.error || "Erro ao processar descadastramento");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Erro ao processar descadastramento. Tente novamente.");
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#e8f4f0] to-[#d5ebe5] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {status === "loading" && (
          <div className="text-center">
            <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#2c4f6f]"></div>
            <p className="text-gray-600">Processando descadastramento...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <svg
                className="h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="mb-3 text-2xl font-bold text-gray-800">
              Descadastramento Concluído
            </h1>

            <p className="mb-2 text-gray-600">{message}</p>

            {email && (
              <p className="mb-6 text-sm text-gray-500">
                Email: <span className="font-semibold">{email}</span>
              </p>
            )}

            <p className="mb-6 text-sm text-gray-600">
              Sentiremos sua falta! Você não receberá mais emails da newsletter
              do PrintCast.
            </p>

            <div className="space-y-3">
              <Link
                href="/"
                className="block rounded-lg bg-[#2c4f6f] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1f3d56]"
              >
                Voltar para o site
              </Link>

              <p className="text-xs text-gray-500">
                Mudou de ideia?{" "}
                <Link href="/#newsletter" className="text-[#2c4f6f] underline">
                  Cadastre-se novamente
                </Link>
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <svg
                className="h-16 w-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="mb-3 text-2xl font-bold text-gray-800">
              Erro no Descadastramento
            </h1>

            <p className="mb-6 text-gray-600">{message}</p>

            <div className="space-y-3">
              <Link
                href="/"
                className="block rounded-lg bg-[#2c4f6f] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1f3d56]"
              >
                Voltar para o site
              </Link>

              <p className="text-xs text-gray-500">
                Precisa de ajuda?{" "}
                <Link href="/#contato" className="text-[#2c4f6f] underline">
                  Entre em contato
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#e8f4f0] to-[#d5ebe5] px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#2c4f6f]"></div>
              <p className="text-gray-600">Carregando...</p>
            </div>
          </div>
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
