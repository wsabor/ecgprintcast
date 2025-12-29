"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaPaperPlane, FaEye, FaLock } from "react-icons/fa";
import RichTextEditor from "@/app/components/RichTextEditor";
import { useAdminAuth } from "@/app/hooks/useAdminAuth";

export default function SendNewsletterPage() {
  const { isAuthenticated, isLoading: authLoading, login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [stats, setStats] = useState({ total: 0, successful: 0, failed: 0 });

  // Autenticação com persistência
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setAuthError("");
      setPassword("");
    } else {
      setAuthError("Senha incorreta");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmation = window.confirm(
      "Tem certeza que deseja enviar esta newsletter para TODOS os inscritos ativos?"
    );

    if (!confirmation) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          `Newsletter enviada com sucesso! ${data.stats.successful} de ${data.stats.total} emails foram enviados.`
        );
        setStats(data.stats);
        setFormData({ subject: "", message: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao enviar newsletter");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erro ao enviar newsletter. Tente novamente.");
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#2c4f6f]"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#2c4f6f] to-[#1f3d56] px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2c4f6f]">
              <FaLock className="text-3xl text-white" />
            </div>
          </div>

          <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
            Enviar Newsletter
          </h1>
          <p className="mb-6 text-center text-gray-600">
            Área restrita - Digite a senha para continuar
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2c4f6f]"
                required
              />
            </div>

            {authError && (
              <div className="rounded-lg bg-red-100 p-3 text-center text-sm text-red-800">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#2c4f6f] px-6 py-3 font-bold text-white transition-colors hover:bg-[#1f3d56]"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/admin/newsletter"
              className="text-sm text-[#2c4f6f] underline hover:text-[#1f3d56]"
            >
              ← Voltar ao Dashboard
            </Link>
            <br />
            <span className="text-[10px] text-gray-400">Sessão válida por 2 horas</span>
          </div>
        </div>
      </div>
    );
  }

  // Página principal
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/admin/newsletter"
              className="mb-2 inline-flex items-center gap-2 text-[#2c4f6f] hover:underline"
            >
              <FaArrowLeft /> Voltar ao Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">
              Enviar Newsletter
            </h1>
            <p className="text-gray-600">
              Componha e envie newsletters para todos os inscritos ativos
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Assunto *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="Ex: Novo episódio do PrintCast disponível!"
                required
                disabled={status === "loading"}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2c4f6f] disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Mensagem * (use a barra de ferramentas para formatar)
              </label>
              <RichTextEditor
                value={formData.message}
                onChange={(value) =>
                  setFormData({ ...formData, message: value })
                }
                placeholder="Digite aqui o conteúdo da newsletter... Use negrito, itálico, listas, cores e muito mais!"
                disabled={status === "loading"}
              />
              <p className="mt-2 text-xs text-gray-500">
                ✨ Use a barra de ferramentas acima para formatar seu texto com negrito, cores, listas, links e imagens.
                O email será enviado com o nome do inscrito e link de descadastramento automático.
              </p>
            </div>

            {message && (
              <div
                className={`rounded-lg p-4 ${
                  status === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <p className="font-semibold">{message}</p>
                {status === "success" && stats.total > 0 && (
                  <div className="mt-2 text-sm">
                    <p>✅ Enviados: {stats.successful}</p>
                    {stats.failed > 0 && <p>❌ Falhas: {stats.failed}</p>}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                disabled={!formData.subject || !formData.message}
                className="flex items-center gap-2 rounded-lg border-2 border-[#2c4f6f] bg-white px-6 py-3 font-semibold text-[#2c4f6f] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaEye />
                {showPreview ? "Esconder Preview" : "Ver Preview"}
              </button>

              <button
                type="submit"
                disabled={status === "loading" || !formData.subject || !formData.message}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#2c4f6f] px-6 py-3 font-bold text-white transition-colors hover:bg-[#1f3d56] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaPaperPlane />
                {status === "loading" ? "Enviando..." : "Enviar Newsletter"}
              </button>
            </div>
          </form>

          {/* Preview */}
          {showPreview && formData.subject && formData.message && (
            <div className="mt-8 border-t pt-8">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Preview do Email
              </h3>
              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
                <div
                  style={{
                    fontFamily: "Arial, sans-serif",
                    maxWidth: "600px",
                    margin: "0 auto",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #2c4f6f 0%, #1f3d56 100%)",
                      padding: "30px",
                      textAlign: "center",
                      borderRadius: "10px 10px 0 0",
                    }}
                  >
                    <h1 style={{ color: "white", margin: 0, fontSize: "28px" }}>
                      {formData.subject}
                    </h1>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "30px",
                      border: "1px solid #e5e5e5",
                    }}
                  >
                    <p style={{ color: "#2c4f6f", fontSize: "16px", marginBottom: "15px" }}>
                      Olá, <strong>[Nome do Inscrito]</strong>!
                    </p>
                    <div
                      style={{
                        color: "#333",
                        lineHeight: "1.8",
                        fontSize: "15px",
                      }}
                      dangerouslySetInnerHTML={{ __html: formData.message }}
                    />
                  </div>

                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "0 0 10px 10px",
                      border: "1px solid #e5e5e5",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ color: "#999", fontSize: "11px" }}>
                      Links das redes sociais e cancelar inscrição aqui
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
