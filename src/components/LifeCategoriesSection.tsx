import { motion } from "motion/react";
import { BrainCircuit, Wallet, Map, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function LifeCategoriesSection() {
  const t = useTranslations("LifeCategories");

  const categories = [
    {
      title: t("categories.body.title"),
      description: t("categories.body.description"),
      icon: Dumbbell,
      iconColor: "text-red-400",
      borderColor: "border-red-500/20 hover:border-red-500/40",
      glowColor: "bg-red-500/10",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
      tags: [
        t("categories.body.tags.0"),
        t("categories.body.tags.1"),
        t("categories.body.tags.2"),
      ],
    },
    {
      title: t("categories.finance.title"),
      description: t("categories.finance.description"),
      icon: Wallet,
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
      glowColor: "bg-emerald-500/10",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      tags: [t("categories.finance.tags.0"), t("categories.finance.tags.1")],
    },
    {
      title: t("categories.mind.title"),
      description: t("categories.mind.description"),
      icon: BrainCircuit,
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      glowColor: "bg-blue-500/10",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      tags: [t("categories.mind.tags.0"), t("categories.mind.tags.1")],
    },
    {
      title: t("categories.battlemap.title"),
      description: t("categories.battlemap.description"),
      icon: Map,
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20 hover:border-purple-500/40",
      glowColor: "bg-purple-500/10",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      tags: [t("categories.battlemap.tags.0"), t("categories.battlemap.tags.1")],
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-bg-dark border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black font-display uppercase mb-6"
          >
            <span className="text-white">
              {t.rich("title", {
                highlight: (chunks) => (
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-green to-emerald-400">
                    {chunks}
                  </span>
                ),
              })}
            </span>
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

        {/* Simple 2-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative group rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 glass-card border transition-all duration-300 cursor-default hover:bg-white/2",
                  cat.borderColor,
                )}
              >
                {/* Subtle glow on hover */}
                <div
                  className={cn(
                    "absolute -top-10 -right-10 w-32 h-32 blur-2xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none",
                    cat.glowColor,
                  )}
                />

                {/* Icon + Tags Row */}
                <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border",
                      cat.badgeColor,
                    )}
                  >
                    <Icon className={cn("w-6 h-6", cat.iconColor)} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-bold text-white/50 uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="relative z-10">
                  <h3
                    className={cn(
                      "text-lg sm:text-xl font-black font-display uppercase mb-2",
                      cat.iconColor,
                    )}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
