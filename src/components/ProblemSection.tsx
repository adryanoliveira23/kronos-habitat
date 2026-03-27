import { motion } from "motion/react";
import { AlertCircle, Zap, Brain, Target } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProblemSection() {
  const t = useTranslations("ProblemSection");

  return (
    <section id="sistema" className="py-16 sm:py-24 bg-section-1 relative overflow-hidden section-bg-glow">
      {/* Background Accents */}
      <div className="absolute top-1/4 -left-20 w-48 h-48 sm:w-96 sm:h-96 bg-neon-green/10 blur-[60px] sm:blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-48 h-48 sm:w-96 sm:h-96 bg-neon-yellow/5 blur-[60px] sm:blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-green/10 border border-neon-green/20 mb-6">
              <Brain className="h-6 w-6 text-neon-green" />
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-normal leading-tight mb-6 sm:mb-8 uppercase">
              {t.rich("title", {
                br: () => <br />,
                highlight: (chunks) => (
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-orange-400 to-yellow-500 text-[0.98em]">
                    {chunks}
                  </span>
                )
              })}
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-white font-medium max-w-xl">
              <p>{t("p1")}</p>
              <p>
                {t.rich("p2", {
                  highlight: (chunks) => <span className="text-neon-green font-bold">{chunks}</span>
                })}
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-2xl glass-card border-red-500/20 group hover:border-red-500/40 transition-colors">
                <div className="text-[10px] text-red-500 uppercase font-black mb-2 tracking-widest flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> {t("realLife.label")}</div>
                <div className="text-sm font-medium text-white/80">{t("realLife.description")}</div>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl glass-card border-neon-green/20 group hover:border-neon-green/40 transition-colors">
                <div className="text-[10px] text-neon-green uppercase font-black mb-2 tracking-widest flex items-center gap-1.5"><Zap className="w-3 h-3" /> {t("theGame.label")}</div>
                <div className="text-sm font-medium text-white/80">{t("theGame.description")}</div>
              </div>
            </div>
          </motion.div>

          {/* MOCKUP RPG BATTLE PREVIEW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#0B0C10] p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col justify-center items-center min-h-[400px]">

              {/* Background ambient glow */}
              <div className="absolute inset-0 bg-linear-to-b from-red-600/10 via-transparent to-neon-green/10" />

              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <div className="text-[8px] sm:text-[10px] text-white/40 uppercase font-black tracking-widest">{t("battlePreview.label")}</div>
                <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30 animate-pulse">
                  <Target className="w-3 h-3 text-red-400" />
                  <span className="text-[8px] sm:text-[10px] text-red-400 font-black uppercase tracking-wider">{t("battlePreview.bossFight")}</span>
                </div>
              </div>

              {/* BATTLE ARENA */}
              <div className="w-full relative z-10 flex flex-col gap-12 sm:gap-16 pt-10 pb-6 pointer-events-none">

                {/* ENEMY SECTION */}
                <div className="flex flex-col items-end gap-2 text-right">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-black italic text-red-500 uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">{t("battlePreview.enemy.name")}</span>
                      <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">{t("battlePreview.enemy.subtitle")}</span>
                    </div>
                  </div>

                  <div className="w-full sm:w-80 h-4 bg-black/50 border-2 border-white/10 rounded-full mt-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-full bg-linear-to-l from-red-600 to-red-400 w-full shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                  </div>
                  <span className="text-[10px] font-black text-red-400 mr-2">100%</span>
                </div>

                {/* VS INDICATOR */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    {/* Glow behind VS */}
                    <div className="absolute inset-0 bg-red-500 blur-xl opacity-30 animate-pulse rounded-full" />
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black border-2 border-red-500/50 rounded-full flex flex-col items-center justify-center transform -rotate-12 shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-md">
                      <div className="text-xl sm:text-2xl font-black italic text-transparent bg-clip-text bg-linear-to-br from-white to-red-500 drop-shadow-md">VS</div>
                    </div>
                  </div>
                </div>

                {/* PLAYER SECTION */}
                <div className="flex flex-col items-start gap-2 text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-black italic text-neon-green uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(56,242,127,0.5)]">{t("battlePreview.player.name")}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-neon-green/20 text-neon-green border border-neon-green/30 px-2 py-0.5 rounded text-[8px] uppercase font-black">{t("battlePreview.player.status")}</span>
                        <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">{t("battlePreview.player.subtitle")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-80 h-4 bg-black/50 border-2 border-white/10 rounded-full mt-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-linear-to-r from-neon-green to-emerald-400 w-full shadow-[0_0_20px_rgba(56,242,127,0.8)]" />
                  </div>
                  <span className="text-[10px] font-black text-neon-green ml-2">100%</span>
                </div>

              </div>

              {/* Decorative scanlines overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 pointer-events-none mix-blend-overlay" />
            </div>

            {/* Decorative Elements around container */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] sm:w-[120%] sm:h-[120%] border border-white/5 rounded-full" />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] sm:w-[140%] sm:h-[140%] border border-white/5 rounded-full opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
