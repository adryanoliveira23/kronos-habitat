import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import petImg from "@/lib/pet.png";
import personagemImg from "@/lib/personagem.png";
import { useTranslations } from "next-intl";

export default function Hero({ onGoToPricing }: { onGoToPricing: () => void }) {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen xl:min-h-[110vh] hero-bg-gradient overflow-hidden pt-32 sm:pt-40 lg:pt-32 xl:pt-48 pb-12 sm:pb-20 xl:pb-32 px-4 sm:px-8">
      {/* Background Layers */}
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      {/* Neon Glow Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-neon-green/5 via-transparent to-transparent pointer-events-none" />

      {/* Radial Glow behind character - adjusted for mobile */}
      <div className="absolute top-[35%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[600px] md:h-[600px] radial-glow opacity-30 blur-[50px] md:blur-[80px] rounded-full pointer-events-none" />

      {/* Floating Particles (CSS Animation) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full opacity-40"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1200px] z-10">
        {/* Title & Subtext */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[64px] font-black font-display tracking-normal leading-[1.1] mb-6 uppercase"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/70">
              {t("titlePrefix")}
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-green to-neon-yellow">
              {t("titleSuffix")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-[500px] mx-auto text-white/80 text-sm sm:text-lg mb-8 px-4 font-medium"
          >
            {t("description")}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onGoToPricing}
            className="bg-neon-yellow text-black px-7 py-3.5 rounded-[14px] font-black text-sm uppercase tracking-wider neon-shadow-green hover:scale-105 transition-transform"
          >
            {t("activate")}
          </motion.button>
        </div>

        {/* 3-Zone Grid Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-6 xl:gap-12 mt-6 lg:mt-10">
          {/* Left Zone: NFT Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-8 sm:gap-10 max-w-[240px] mx-auto lg:mx-0 order-1 lg:order-1"
          >
            <div className="glass-card p-4 rounded-[32px] text-left">
              <div className="aspect-square rounded-[24px] bg-zinc-900/50 mb-4 overflow-hidden border border-white/5">
                <img
                  src={petImg.src}
                  alt="Pet"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-center px-1">
                <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <div className="text-[7px] text-white/40 uppercase font-black tracking-wider">
                    {t("rarityScore")}
                  </div>
                  <div className="text-xs font-black text-white">8.7/10</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-neon-yellow flex items-center justify-center text-black neon-shadow-yellow hover:scale-110 transition-transform cursor-pointer">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="text-left pl-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 bg-neon-green rotate-45 shadow-[0_0_10px_rgba(0,255,102,0.5)]" />
                <span className="font-black font-sans text-sm uppercase tracking-tight text-white">
                  {t("conquerPet")}
                </span>
              </div>
              <p className="text-[10px] text-white/50 leading-relaxed uppercase font-bold max-w-[200px] tracking-wide">
                {t("petDescription")}
              </p>
            </div>
          </motion.div>

          {/* Center Zone: Main Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:mt-[-40px] order-3 lg:order-2"
          >
            <img
              src={personagemImg.src}
              alt="Kronos Ninja Character"
              className="w-full max-w-[320px] sm:max-w-[400px] xl:max-w-[480px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20"
              referrerPolicy="no-referrer"
            />
            {/* Ground Shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-8 sm:h-10 bg-black/70 blur-2xl rounded-full z-10" />
          </motion.div>

          {/* Right Zone: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 sm:p-8 xl:p-10 rounded-[32px] sm:rounded-[40px] flex flex-col gap-6 sm:gap-8 xl:gap-10 text-left lg:ml-6 xl:ml-12 border-white/5 max-w-[340px] mx-auto lg:mx-0 order-2 lg:order-3"
          >
            <div className="group cursor-default">
              <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-5xl font-black font-sans mb-1 xl:mb-2 text-white group-hover:text-neon-green transition-colors">
                12.000+
              </div>
              <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] leading-relaxed">
                {t("coins")}
              </div>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-5xl font-black font-sans mb-1 xl:mb-2 uppercase text-white group-hover:text-neon-green transition-colors">
                {t("level")}
              </div>
              <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] rounded-md px-1 py-0.5 leading-relaxed">
                {t("levelDescription")}
              </div>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-5xl font-black font-sans mb-1 xl:mb-2 text-white group-hover:text-neon-green transition-colors">
                {t("ranking")}
              </div>
              <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] leading-relaxed">
                {t("rankingDescription")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
