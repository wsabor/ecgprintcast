"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Inscrição realizada com sucesso! Obrigado!");
        setFormData({ name: "", email: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao processar inscrição");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erro ao processar inscrição. Tente novamente.");
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white p-8 shadow-xl md:p-6">
      <h3 className="mb-6 text-center text-lg leading-relaxed font-semibold text-gray-800">
        Cadastre-se em nossa newsletter para ser avisado sobre os novos
        episódios do PrintCast em primeira mão e receber notícias e informações
        importantes sobre a indústria gráfica
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={status === "loading"}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none disabled:bg-gray-100"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            disabled={status === "loading"}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none disabled:bg-gray-100"
          />
        </div>

        {message && (
          <div
            className={`rounded-lg p-3 text-center text-sm ${
              status === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all duration-300 hover:from-red-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : "Quero ser avisado"}
        </button>
      </form>
    </div>
  );
}
