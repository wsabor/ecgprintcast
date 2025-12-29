"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaUserCheck, FaUserTimes, FaUserPlus, FaDownload, FaSearch, FaLock, FaSignOutAlt } from "react-icons/fa";
import { useAdminAuth } from "@/app/hooks/useAdminAuth";

interface Subscriber {
  id: number;
  name: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

interface Stats {
  total: number;
  active: number;
  inactive: number;
  recent: number;
}

export default function AdminNewsletterPage() {
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, inactive: 0, recent: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Buscar dados
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/subscribers?status=${filter}`);
        const data = await response.json();

        if (response.ok) {
          setSubscribers(data.subscribers);
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, isAuthenticated]);

  // Exportar CSV
  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Nome", "Email", "Data de Inscrição", "Status"],
      ...subscribers.map((s) => [
        s.id,
        s.name,
        s.email,
        new Date(s.created_at).toLocaleDateString("pt-BR"),
        s.is_active ? "Ativo" : "Inativo",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrar por busca
  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Área Administrativa
          </h1>
          <p className="mb-6 text-center text-gray-600">
            Dashboard de Newsletter do PrintCast
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

          <p className="mt-6 text-center text-xs text-gray-500">
            Acesso restrito a administradores
            <br />
            <span className="text-[10px] text-gray-400">Sessão válida por 2 horas</span>
          </p>
        </div>
      </div>
    );
  }

  // Dashboard principal
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              Dashboard de Newsletter
            </h1>
            <p className="text-gray-600">
              Gerencie os inscritos da newsletter do PrintCast
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
              title="Sair"
            >
              <FaSignOutAlt />
              Sair
            </button>
            <a
              href="/admin/newsletter/send"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-green-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar Newsletter
            </a>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <FaUsers className="text-4xl text-blue-500" />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Ativos</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <FaUserCheck className="text-4xl text-green-500" />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Inativos</p>
                <p className="text-3xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <FaUserTimes className="text-4xl text-red-500" />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Últimos 7 dias</p>
                <p className="text-3xl font-bold text-purple-600">{stats.recent}</p>
              </div>
              <FaUserPlus className="text-4xl text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filtros e Ações */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Busca */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#2c4f6f]"
              />
            </div>

            {/* Filtros */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-[#2c4f6f] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                  filter === "active"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Ativos
              </button>
              <button
                onClick={() => setFilter("inactive")}
                className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                  filter === "inactive"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Inativos
              </button>
            </div>

            {/* Exportar */}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 rounded-lg bg-[#2c4f6f] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#1f3d56]"
            >
              <FaDownload />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Tabela de Inscritos */}
        <div className="rounded-xl bg-white shadow-md">
          {loading ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#2c4f6f]"></div>
              <p className="text-gray-600">Carregando inscritos...</p>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              Nenhum inscrito encontrado
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Nome
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Data de Inscrição
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubscribers.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        #{subscriber.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {subscriber.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(subscriber.created_at).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            subscriber.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {subscriber.is_active ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Total de {filteredSubscribers.length} inscrito
            {filteredSubscribers.length !== 1 ? "s" : ""} exibido
            {filteredSubscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
