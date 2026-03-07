import { motion } from "motion/react";
import { LayoutDashboard, Zap, TrendingUp, Trophy, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardSection() {
  return (
    <section
      id="dashboard"
      className="py-16 sm:py-24 bg-section-2 relative overflow-hidden section-bg-glow"
    >
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-neon-green/10 blur-[100px] sm:blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-neon-yellow/5 blur-[100px] sm:blur-[150px] rounded-full -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">
              Interface de Elite
            </h2>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-normal leading-tight mb-6 sm:mb-8 uppercase">
              Seu Centro de <br />
              <span className="text-neon-yellow">Comando Pessoal</span>
            </h3>
            <p className="text-base sm:text-lg text-white mb-8 font-medium">
              O Dashboard do Kronos não é apenas uma lista de tarefas. É um
              cockpit de performance que monitora cada aspecto da sua evolução
              em tempo real.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Barra de Progresso",
                  desc: "Visualização clara da sua jornada diária.",
                },
                {
                  icon: Zap,
                  title: "XP & Level",
                  desc: "Gamificação profunda com feedback imediato.",
                },
                {
                  icon: Target,
                  title: "Streak System",
                  desc: "Mantenha o fogo sagrado da consistência.",
                },
                {
                  icon: Trophy,
                  title: "Global Ranking",
                  desc: "Sua posição entre os melhores do mundo.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-4 rounded-2xl glass-card border-white/5"
                >
                  <item.icon className="h-5 w-5 text-neon-green" />
                  <div className="font-black font-sans text-[10px] sm:text-xs uppercase tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/40 font-bold uppercase">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative p-5 sm:p-6 rounded-[32px] sm:rounded-[40px] glass-card border-neon-green/20 shadow-[0_0_50px_rgba(62,255,139,0.1)]">
              {/* Mockup Dashboard UI */}
              <div className="space-y-5 sm:space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[8px] sm:text-[10px] font-black text-white/40 uppercase mb-1">
                      Status do Sistema
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-sans uppercase">
                      Nível 42{" "}
                      <span className="text-neon-green text-xs sm:text-sm ml-2">
                        Mestre
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] sm:text-[10px] font-black text-neon-yellow uppercase mb-1">
                      Streak
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-sans uppercase">
                      15 Dias
                    </div>
                  </div>
                </div>

                <div className="h-3 sm:h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-neon-green to-emerald-500 shadow-[0_0_15px_rgba(62,255,139,0.5)]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-center">
                    <div className="text-[8px] sm:text-[9px] font-black text-white/40 uppercase mb-1">
                      XP Total
                    </div>
                    <div className="text-base sm:text-lg font-black font-sans">
                      12.4k
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-center">
                    <div className="text-[8px] sm:text-[9px] font-black text-white/40 uppercase mb-1">
                      Ranking
                    </div>
                    <div className="text-base sm:text-lg font-black font-sans text-neon-yellow">
                      #08
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-center">
                    <div className="text-[8px] sm:text-[9px] font-black text-white/40 uppercase mb-1">
                      Missões
                    </div>
                    <div className="text-base sm:text-lg font-black font-sans">
                      142
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-[8px] sm:text-[10px] font-black text-white/40 uppercase mb-4">
                    Missões Ativas
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-neon-green/5 border border-neon-green/20">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-neon-green rotate-45" />
                        <div className="text-[10px] sm:text-xs font-bold uppercase">
                          Treino de Força
                        </div>
                      </div>
                      <div className="text-[8px] sm:text-[10px] font-black text-neon-green uppercase">
                        +500 XP
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/20 rotate-45" />
                        <div className="text-[10px] sm:text-xs font-bold uppercase">
                          Leitura Profunda
                        </div>
                      </div>
                      <div className="text-[8px] sm:text-[10px] font-black text-white/40 uppercase">
                        +200 XP
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
