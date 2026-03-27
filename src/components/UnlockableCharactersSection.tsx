import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function UnlockableCharactersSection() {
  const t = useTranslations("UnlockableCharacters");

  const characters = [
    {
      id: "0001",
      name: t("characters.0001.name"),
      rank: t("characters.0001.rank"),
      image:
        "https://i.ibb.co/Mm8fkMz/Chat-GPT-Image-1-de-mar- de-2026-21-15-22.png",
      score: "4.2/10",
      color: "from-yellow-400 to-orange-500",
      badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      tag: t("characters.0001.tag"),
      subtitle: t("characters.0001.subtitle"),
    },
    {
      id: "0666",
      name: t("characters.0666.name"),
      rank: t("characters.0666.rank"),
      image:
        "https://i.ibb.co/jXgP91m/Chat-GPT-Image-1-de-mar- de-2026-21-15-18.png",
      score: "8.7/10",
      color: "from-neon-green to-emerald-600",
      badge: "bg-neon-green/10 text-neon-green border-neon-green/20",
      tag: t("characters.0666.tag"),
      subtitle: t("characters.0666.subtitle"),
    },
    {
      id: "7777",
      name: t("characters.7777.name"),
      rank: t("characters.7777.rank"),
      image:
        "https://i.ibb.co/8g808TTc/Chat-GPT-Image-1-de-mar- de-2026-21-15-10.png",
      score: "9.9/10",
      color: "from-amber-400 to-yellow-600",
      badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      tag: t("characters.7777.tag"),
      subtitle: t("characters.7777.subtitle"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 xl:py-32 relative overflow-hidden bg-black border-t border-white/5">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-neon-green text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-4"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black font-display uppercase mb-6"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-green to-neon-yellow">
                  {chunks}
                </span>
              )
            })}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-sm sm:text-lg max-w-[600px] mx-auto font-medium"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative"
            >
              {/* Floating label */}
              <div className="absolute -top-4 left-6 z-20">
                <div
                  className={cn(
                    "px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl transition-transform group-hover:-translate-y-1",
                    char.badge,
                  )}
                >
                  {char.tag} #{char.id}
                  <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                </div>
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-inherit border-b border-r transform rotate-45" />
              </div>

              {/* Card Body */}
              <div className="relative rounded-[32px] overflow-hidden bg-white/3 border border-white/10 p-4 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.05]">
                <div className="relative aspect-square rounded-[24px] overflow-hidden bg-black/40 mb-6">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Top right level */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-white/60 text-[9px] font-bold uppercase">
                      {char.rank}
                    </span>
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-black font-display uppercase text-white group-hover:text-neon-green transition-colors">
                        {char.name}
                      </h3>
                      <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">
                        {char.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="flex items-center gap-4 bg-white/3 rounded-2xl p-4 border border-white/5 relative overflow-hidden group/btn cursor-pointer overflow-hidden">
                    <div className="flex-1">
                      <div className="text-white/30 text-[9px] font-black uppercase tracking-tighter mb-1">
                        {t("rarityScore")}
                      </div>
                      <div className="text-white font-black text-lg">
                        {char.score}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="w-12 h-12 rounded-xl bg-neon-green flex items-center justify-center text-black shadow-[0_0_20px_rgba(56,242,127,0.4)] group-hover/btn:bg-neon-yellow transition-colors"
                    >
                      <ArrowRight size={20} strokeWidth={3} />
                    </motion.div>

                    {/* Button Glow shadow */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </div>

              {/* Bottom Glow */}
              <div
                className={cn(
                  "absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-full",
                  char.color.includes("green")
                    ? "bg-neon-green"
                    : "bg-neon-yellow",
                )}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to action below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="flex items-center gap-6 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-sm">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-black bg-white/10 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="user"
                  />
                </div>
              ))}
            </div>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider">
              {t.rich("studentsCount", {
                highlight: (chunks) => <span className="text-white">{chunks}</span>
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
