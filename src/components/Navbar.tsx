import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({
  onGoToLogin,
  onGoToPricing,
}: {
  onGoToLogin: () => void;
  onGoToPricing: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navbar");

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 py-6">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-display text-xl font-black tracking-tighter shrink-0">
          <div className="w-6 h-6 bg-neon-yellow rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
          <span className="text-white">KRONOS</span>
          <span className="text-neon-yellow">HABIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
          <a
            href="#"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            {t("home")}
            <ChevronDown className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            {t("plans")}
            <ChevronDown className="w-4 h-4 opacity-50" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {t("howItWorks")}
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            {t("blog")}
            <div className="w-1 h-1 bg-neon-green rounded-full shadow-[0_0_5px_rgba(56,242,127,0.8)]" />
          </a>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            onClick={onGoToPricing}
            className="hidden sm:block bg-neon-yellow text-black px-5 py-3 rounded-[12px] font-bold text-sm neon-shadow-yellow hover:scale-105 transition-transform"
          >
            {t("activate")}
          </button>
          <button
            onClick={onGoToLogin}
            className="hidden sm:block text-white border border-white/20 px-5 py-3 rounded-[12px] font-bold text-sm hover:bg-white/5 transition-colors"
          >
            {t("login")}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 p-6 rounded-3xl glass-card border-white/10 lg:hidden z-50 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center px-2">
               <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Idioma</span>
               <LanguageSwitcher />
            </div>
            <a
              href="#"
              className="text-lg font-bold text-white flex items-center justify-between"
            >
              {t("home")} <ChevronDown className="w-5 h-5 opacity-50" />
            </a>
            <a
              href="#"
              className="text-lg font-bold text-white flex items-center justify-between"
            >
              {t("plans")} <ChevronDown className="w-5 h-5 opacity-50" />
            </a>
            <a href="#" className="text-lg font-bold text-white">
              {t("howItWorks")}
            </a>
            <a
              href="#"
              className="text-lg font-bold text-white flex items-center gap-2"
            >
              {t("blog")}
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_5px_rgba(56,242,127,0.8)]" />
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onGoToPricing();
              }}
              className="w-full bg-neon-yellow text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest neon-shadow-yellow"
            >
              {t("activate")}
            </button>
            <button
              onClick={onGoToLogin}
              className="w-full text-white border border-white/10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
              {t("login")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
