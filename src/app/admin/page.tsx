"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Users,
  Settings,
  Database,
  TrendingUp,
  AlertTriangle,
  LogOut,
  ChevronRight,
  Search,
  Activity,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Adiel&Adryan2026@!") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta. Acesso negado.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 font-sans selection:bg-neon-yellow selection:text-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,242,127,0.05),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] bg-white/5 border border-white/10 mb-6 relative group">
              <div className="absolute inset-0 bg-neon-yellow/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <ShieldCheck className="w-10 h-10 text-neon-yellow relative z-10" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
              Painel <span className="text-neon-yellow">Restrito</span>
            </h1>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
              Acesso exclusivo para administradores
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-neon-yellow transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira a Chave de Acesso"
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-neon-yellow/50 focus:bg-white/8 outline-none rounded-2xl py-5 pl-14 pr-5 text-white placeholder:text-white/20 transition-all font-mono tracking-widest"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
              >
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest">
                  {error}
                </p>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-5 bg-neon-yellow text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_30px_rgba(223,255,0,0.15)] hover:shadow-[0_10px_50px_rgba(223,255,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              Liberar Acesso
            </button>
          </form>

          <p className="text-center mt-10 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
            Protocolo de Segurança Kronos &copy; 2026
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-neon-yellow selection:text-black flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#080808] flex flex-col shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 font-black text-xl tracking-tighter mb-10">
            <div className="w-8 h-8 bg-neon-yellow rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <span>
              KRONOS <span className="text-neon-yellow">ADMIN</span>
            </span>
          </div>

          <nav className="space-y-1">
            {[
              { id: "overview", label: "Visão Geral", icon: TrendingUp },
              { id: "users", label: "Usuários", icon: Users },
              { id: "payments", label: "Financeiro", icon: CreditCard },
              { id: "system", label: "Sistema", icon: Settings },
              { id: "db", label: "Banco de Dados", icon: Database },
              { id: "support", label: "Suporte", icon: MessageSquare },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                  activeTab === item.id
                    ? "bg-neon-yellow text-black shadow-[0_4px_20px_rgba(223,255,0,0.2)]"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${activeTab === item.id ? "text-black" : "text-white/20"}`}
                />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4" /> Finalizar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 bg-[radial-gradient(circle_at_0%_0%,rgba(56,242,127,0.03),transparent_40%)]">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
              {activeTab === "overview" && "Dashboard Central"}
              {activeTab === "users" && "Gestão de Usuários"}
              {activeTab === "payments" && "Relatórios Financeiros"}
              {activeTab === "system" && "Configurações Globais"}
              {activeTab === "db" && "Estrutura de Dados"}
              {activeTab === "support" && "Central de Tickets"}
            </h2>
            <div className="flex items-center gap-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
              <span>KRONOS PLATFORM</span>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <span>{activeTab.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
              <Activity className="w-4 h-4 text-neon-green" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neon-green">
                Sistema Online
              </span>
            </div>
            <div className="w-12 h-12 rounded-[14px] bg-white/5 border border-white/10 flex items-center justify-center relative group cursor-pointer">
              <div className="absolute inset-0 bg-neon-yellow/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <Search className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Usuários Ativos",
              value: "24,812",
              change: "+12%",
              color: "text-blue-500",
            },
            {
              label: "Receita Mensal",
              value: "R$ 142.0k",
              change: "+8%",
              color: "text-neon-green",
            },
            {
              label: "Tempo de Resposta",
              value: "1.2s",
              change: "-4%",
              color: "text-neon-yellow",
            },
            {
              label: "Taxa de Retenção",
              value: "92.4%",
              change: "+2%",
              color: "text-purple-500",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-white/10 transition-colors group"
            >
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-black tracking-tight">
                  {stat.value}
                </span>
                <span
                  className={`text-[10px] font-bold ${stat.color} mb-1 bg-current opacity-10 px-2 py-1 rounded-lg`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 bg-white/3 border border-white/5 rounded-[32px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Atividades Recentes
                </h3>
                <button className="text-[9px] font-black text-neon-yellow uppercase tracking-widest hover:underline">
                  Ver Histórico Completo
                </button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 hover:bg-white/[0.02] rounded-2xl transition-colors group border border-transparent hover:border-white/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4 text-white/30" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white/80">
                        Novo usuário registrado via Plano Premium
                      </p>
                      <p className="text-[10px] text-white/30 font-medium">
                        Há {i * 2} minutos • ID: #KS-89{i}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-neon-green/5 border border-neon-green/10 rounded-[32px] overflow-hidden relative group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-neon-green/10 blur-[80px] rounded-full group-hover:bg-neon-green/20 transition-all" />
              <h3 className="text-lg font-black uppercase tracking-tight mb-4 relative z-10">
                Status do Servidor
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white/40 uppercase">
                    CPU Usage
                  </span>
                  <span className="text-xs font-black text-neon-green">
                    24%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-green w-[24%]" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white/40 uppercase">
                    Memory
                  </span>
                  <span className="text-xs font-black text-neon-green">
                    42%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-green w-[42%]" />
                </div>
              </div>
            </div>

            <button className="w-full p-6 bg-red-500/10 border border-red-500/20 rounded-[32px] text-left group hover:bg-red-500 transition-all">
              <AlertTriangle className="w-6 h-6 text-red-500 mb-4 group-hover:text-white" />
              <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-white">
                Relatar Emergência
              </h3>
              <p className="text-xs font-medium text-red-500/60 group-hover:text-white/80 leading-relaxed uppercase tracking-wider">
                Acione o protocolo de manutenção imediata do sistema.
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
