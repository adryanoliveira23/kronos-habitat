import { motion } from "motion/react";
import { Clock, BarChart3, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HabitSystemSection() {
  const t = useTranslations("HabitSystem");

  const featureItems = [
    {
      title: t("features.smartFrequency.title"),
      desc: t("features.smartFrequency.desc"),
    },
    {
      icon: Clock,
      title: t("features.strategicScheduling.title"),
      desc: t("features.strategicScheduling.desc"),
    },
    {
      icon: BarChart3,
      title: t("features.dynamicDifficulty.title"),
      desc: t("features.dynamicDifficulty.desc"),
    },
  ];

  return (
    <section
      id="habitos"
      className="py-16 sm:py-24 bg-section-3 relative overflow-hidden section-bg-glow-alt"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 blur-[120px] rounded-full -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] glass-card border-neon-green/20">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-black font-sans uppercase tracking-tight">
                  {t("mockup.title")}
                </h4>
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-neon-yellow flex items-center justify-center text-black shadow-[0_0_15px_rgba(239,255,62,0.3)]">
                  <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div>
                      <div className="text-[8px] sm:text-[10px] font-black text-neon-green uppercase tracking-widest mb-1">
                        {t("mockup.newHabit")}
                      </div>
                      <div className="text-base sm:text-lg font-black font-sans uppercase tracking-tight">
                        {t("mockup.meditation")}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-[7px] sm:text-[8px] font-black text-white/40 uppercase mb-1">
                        {t("mockup.frequencyLabel")}
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-bold uppercase">
                        {t("mockup.daily")}
                      </div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-[7px] sm:text-[8px] font-black text-white/40 uppercase mb-1">
                        {t("mockup.timeLabel")}
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-bold uppercase">
                        {t("mockup.timeValue")}
                      </div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-[7px] sm:text-[8px] font-black text-white/40 uppercase mb-1">
                        {t("mockup.difficultyLabel")}
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-bold uppercase text-neon-yellow">
                        {t("mockup.legendary")}
                      </div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-neon-green/10 border border-neon-green/20">
                      <div className="text-[7px] sm:text-[8px] font-black text-neon-green uppercase mb-1">
                        {t("mockup.xpRewardLabel")}
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-bold uppercase text-neon-green">
                        +1,200 XP
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 opacity-40">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-zinc-800" />
                  <div className="flex-1 h-2 sm:h-3 bg-zinc-800 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">
              {t("subtitle")}
            </h2>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-normal leading-tight mb-6 sm:mb-8 uppercase">
              {t.rich("title", {
                br: () => <br />,
                highlight: (chunks) => <span className="text-neon-yellow">{chunks}</span>
              })}
            </h3>
            <p className="text-base sm:text-lg text-white/60 mb-8 font-medium">
              {t("description")}
            </p>

            <div className="space-y-5 sm:space-y-6">
              {featureItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 h-6 w-6 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center shrink-0">
                    <div className="h-1.5 w-1.5 bg-neon-green rotate-45" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black font-sans uppercase tracking-tight mb-1">
                      {item.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/40 font-bold uppercase">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
