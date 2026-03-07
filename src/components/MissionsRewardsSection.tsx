import { motion } from "motion/react";
import { Medal, Award, Star, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const rewards = [
  {
    icon: Medal,
    title: "Medalhas Raras",
    desc: "Conquistas únicas por feitos extraordinários.",
    color: "text-neon-yellow",
  },
  {
    icon: Award,
    title: "Títulos de Elite",
    desc: "Sua identidade no sistema evolui com você.",
    color: "text-neon-green",
  },
  {
    icon: Star,
    title: "Insígnias de Honra",
    desc: "Mostre sua consistência para a comunidade.",
    color: "text-blue-400",
  },
  {
    icon: ShieldCheck,
    title: "Status Lendário",
    desc: "Desbloqueie privilégios e temas exclusivos.",
    color: "text-purple-400",
  },
];

export default function MissionsRewardsSection() {
  return (
    <section
      id="conquistas"
      className="py-16 sm:py-24 bg-section-3 relative overflow-hidden section-bg-glow"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-neon-yellow/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon-green/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">
            Recompensas & Glória
          </h2>
          <p className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-normal uppercase">
            O Cofre de Conquistas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] glass-card border-white/5 hover:border-neon-green/30 transition-all group text-center"
            >
              <div
                className={cn(
                  "h-12 w-12 sm:h-16 sm:w-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform",
                  reward.color,
                )}
              >
                <reward.icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-base sm:text-lg font-black font-sans uppercase mb-2">
                {reward.title}
              </h3>
              <p className="text-[8px] sm:text-[10px] text-white/40 font-bold uppercase leading-relaxed">
                {reward.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] glass-card border-neon-yellow/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Star className="h-24 w-24 sm:h-32 sm:w-32 text-neon-yellow" />
            </div>
            <div className="relative z-10">
              <div className="text-[10px] font-black text-neon-yellow uppercase tracking-widest mb-4">
                Sistema de Missões
              </div>
              <h4 className="text-2xl sm:text-3xl font-black font-sans uppercase mb-6">
                Jornadas de <br />
                Alto Impacto
              </h4>
              <div className="space-y-3 sm:space-y-4 mb-8">
                {[
                  { type: "Diária", reward: "XP + Medalha Bronze" },
                  { type: "Semanal", reward: "XP + Título Temporário" },
                  { type: "Especial", reward: "XP + Medalha Rara + Tema" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10"
                  >
                    <span className="text-[10px] sm:text-xs font-bold uppercase">
                      {m.type}
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-black text-neon-yellow uppercase">
                      {m.reward}
                    </span>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-neon-yellow hover:gap-4 transition-all">
                Ver Todas as Missões <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] glass-card border-neon-green/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award className="h-24 w-24 sm:h-32 sm:w-32 text-neon-green" />
            </div>
            <div className="relative z-10">
              <div className="text-[10px] font-black text-neon-green uppercase tracking-widest mb-4">
                Evolução de Level
              </div>
              <h4 className="text-2xl sm:text-3xl font-black font-sans uppercase mb-6">
                Desbloqueio <br />
                Progressivo
              </h4>
              <div className="space-y-5 sm:space-y-6">
                <div className="relative">
                  <div className="flex justify-between text-[8px] sm:text-[10px] font-black uppercase mb-2">
                    <span>Próximo Level: 43</span>
                    <span className="text-neon-green">85%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-neon-green shadow-[0_0_10px_rgba(62,255,139,0.5)]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[7px] sm:text-[8px] font-black text-white/40 uppercase mb-1">
                      Recompensa LVL 43
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase">
                      Tema Cyber-Red
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[7px] sm:text-[8px] font-black text-white/40 uppercase mb-1">
                      Status
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase">
                      Insignia de Prata
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
