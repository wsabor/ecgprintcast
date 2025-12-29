"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Mensagem enviada com sucesso! Responderemos em breve.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao enviar mensagem");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return (
    <section id="contato" className="bg-[#bde4db] px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-800 md:text-5xl">
          Contato
        </h2>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Coluna da esquerda - Texto */}
          <div className="space-y-6">
            <p className="text-base font-semibold leading-relaxed text-gray-800 md:text-2xl">
              Queridinho, estamos aqui para ouvir você!
            </p>

            <p className="text-xl font-medium leading-relaxed text-gray-700">
              Se você tem alguma dúvida, sugestão ou deseja compartilhar suas
              ideias conosco, preencha o formulário. Teremos o prazer em
              responder o mais rápido possível. Sua opinião é valiosa e queremos
              garantir que sua experiência conosco seja a melhor possível.
              Aguardamos seu contato e a oportunidade de atendê-lo da melhor
              maneira possível.
            </p>

            <p className="text-xl font-medium text-gray-700">
              Obrigado por entrar em contato!
            </p>

            <p className="text-2xl font-semibold text-gray-800">
              Equipe do PrintCast
            </p>
          </div>

          {/* Coluna da direita - Formulário */}
          <div className="rounded-xl bg-white p-6 shadow-xl md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nome *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Telefone (opcional)"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <textarea
                  placeholder="Mensagem *"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  disabled={status === "loading"}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                ></textarea>
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
                className="w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 font-bold uppercase text-white shadow-lg transition-all duration-300 hover:from-red-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
