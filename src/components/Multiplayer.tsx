import { motion } from "motion/react";
import { Users, Shield, Trophy, MessageSquare, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Multiplayer() {
  return (
    <section
      id="multiplayer"
      className="py-16 sm:py-24 bg-section-1 relative overflow-hidden section-bg-glow-alt"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-green/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-yellow/5 blur-[120px] rounded-full -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">
            Social & Multiplayer
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tighter uppercase">
            A Evolução é Coletiva
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Friends Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] glass-card border-neon-green/20 flex flex-col md:flex-row gap-6 sm:gap-8"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-neon-green" />
                <h3 className="text-xl sm:text-2xl font-black font-sans uppercase tracking-tight">
                  Amigos & Clãs
                </h3>
              </div>
              <p className="text-white/60 mb-8 text-xs sm:text-sm font-medium leading-relaxed">
                Adicione amigos, compare seu progresso e crie clãs para dominar
                os rankings globais. A disciplina é contagiosa.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    name: "Alex_Shadow",
                    lvl: 45,
                    xp: "12k",
                    status: "Online",
                    avatarId: 15,
                  },
                  {
                    name: "Sarah_Vortex",
                    lvl: 38,
                    xp: "9k",
                    status: "Em Missão",
                    avatarId: 32,
                  },
                  {
                    name: "Marcus_Prime",
                    lvl: 52,
                    xp: "18k",
                    status: "Offline",
                    avatarId: 12,
                  },
                ].map((friend, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/100?img=${friend.avatarId}`}
                          alt={friend.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-black font-sans text-[10px] sm:text-xs uppercase">
                          {friend.name}
                        </div>
                        <div className="text-[8px] sm:text-[9px] text-white/40 uppercase tracking-widest font-bold">
                          LVL {friend.lvl} • {friend.xp} XP
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "text-[8px] sm:text-[9px] font-black uppercase px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border",
                        friend.status === "Online"
                          ? "text-neon-green border-neon-green/30 bg-neon-green/10"
                          : "text-white/40 border-white/10",
                      )}
                    >
                      {friend.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-64 flex flex-col gap-4">
              <div className="p-6 rounded-2xl sm:rounded-3xl bg-neon-green/10 border border-neon-green/20 flex-1 flex flex-col items-center justify-center text-center">
                <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-neon-green mb-4" />
                <div className="text-[9px] sm:text-[10px] font-black uppercase mb-1 tracking-widest">
                  Ranking Semanal
                </div>
                <div className="text-2xl sm:text-3xl font-black font-sans text-neon-green">
                  #12
                </div>
                <div className="text-[9px] sm:text-[10px] text-white/40 mt-2 font-bold uppercase">
                  Top 5% Global
                </div>
              </div>
              <button className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                <Plus className="h-4 w-4" /> Adicionar Amigo
              </button>
            </div>
          </motion.div>

          {/* Challenges Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] glass-card border-neon-green/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-neon-green" />
              <h3 className="text-xl sm:text-2xl font-black font-sans uppercase tracking-tight">
                Desafios
              </h3>
            </div>
            <p className="text-white/60 mb-8 text-xs sm:text-sm font-medium leading-relaxed">
              Crie desafios privados com regras customizadas e veja quem tem a
              maior consistência.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="p-4 rounded-xl sm:rounded-2xl bg-neon-green/10 border border-neon-green/30">
                <div className="text-[8px] sm:text-[9px] font-black text-neon-green uppercase mb-1 tracking-widest">
                  Ativo
                </div>
                <div className="font-black font-sans uppercase text-xs sm:text-sm">
                  Madrugada de Ferro
                </div>
                <div className="text-[9px] sm:text-[10px] text-white/60 font-bold uppercase">
                  Acordar às 05:00 • 7 Dias
                </div>
                <div className="mt-4 flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-black bg-zinc-800 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 22}`}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 opacity-50">
                <div className="text-[8px] sm:text-[9px] font-black text-white/40 uppercase mb-1 tracking-widest">
                  Próximo
                </div>
                <div className="font-black font-sans uppercase text-xs sm:text-sm">
                  Leitura Profunda
                </div>
                <div className="text-[9px] sm:text-[10px] text-white/60 font-bold uppercase">
                  30 min/dia • 30 Dias
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
