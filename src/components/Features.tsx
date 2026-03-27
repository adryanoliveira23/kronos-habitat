import { motion } from "motion/react";
import { Swords, TrendingUp, Cpu } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("Features");

  const features = [
    {
      icon: Swords,
      title: t("dailyMissions.title"),
      description: t("dailyMissions.description"),
      items: [
        t("dailyMissions.items.0"),
        t("dailyMissions.items.1"),
        t("dailyMissions.items.2")
      ]
    },
    {
      icon: TrendingUp,
      title: t("xpSystem.title"),
      description: t("xpSystem.description"),
      items: [
        t("xpSystem.items.0"),
        t("xpSystem.items.1"),
        t("xpSystem.items.2")
      ]
    },
    {
      icon: Cpu,
      title: t("ai.title"),
      description: t("ai.description"),
      items: [
        t("ai.items.0"),
        t("ai.items.1"),
        t("ai.items.2")
      ]
    }
  ];

  return (
    <section id="pilares" className="py-24 bg-section-1 relative overflow-hidden section-bg-glow">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-neon-green/5 to-transparent pointer-events-none -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">{t("subtitle")}</h2>
          <p className="text-4xl md:text-5xl font-black font-sans tracking-tighter uppercase">{t("title")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[40px] glass-card hover:border-neon-green/40 transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-7 w-7 text-neon-green" />
              </div>
              <h3 className="text-2xl font-black font-sans mb-4 uppercase">{feature.title}</h3>
              <p className="text-white/60 mb-6 leading-relaxed text-sm">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-white/80 uppercase tracking-tight">
                    <div className="h-1.5 w-1.5 bg-neon-green rotate-45" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
