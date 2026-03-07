import { useEffect } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
  label?: string;
}

export default function LoadingScreen({ onComplete, label = "Iniciando Sistema..." }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-neon-green/20 blur-[80px] sm:blur-[120px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs sm:max-w-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neon-yellow rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(223,255,0,0.3)]">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rotate-45" />
          </div>
          <span className="text-3xl sm:text-4xl font-black font-sans tracking-tighter text-white">
            KRONOS<span className="text-neon-green">.</span>
          </span>
        </motion.div>

        <div className="w-full sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-neon-green shadow-[0_0_15px_rgba(56,242,127,0.8)]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-4 text-[8px] sm:text-[10px] uppercase font-black tracking-[0.3em] text-neon-green text-center"
        >
          {label}
        </motion.p>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
    </motion.div>
  );
}
