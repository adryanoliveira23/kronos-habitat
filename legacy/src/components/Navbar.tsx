import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar({ onGoToLogin, onGoToRegister }: { onGoToLogin: () => void; onGoToRegister: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 py-6">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-sans text-xl font-black tracking-tighter shrink-0">
          <div className="w-6 h-6 bg-neon-yellow rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
          <span className="text-white">KRONOS</span>
          <span className="text-neon-yellow">HABIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            All Pages
            <ChevronDown className="w-4 h-4 opacity-50" />
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Collection
            <ChevronDown className="w-4 h-4 opacity-50" />
          </a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
            Blog
            <div className="w-1 h-1 bg-neon-green rounded-full shadow-[0_0_5px_rgba(56,242,127,0.8)]" />
          </a>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button onClick={onGoToRegister} className="hidden sm:block bg-neon-yellow text-black px-5 py-3 rounded-[12px] font-bold text-sm neon-shadow-yellow hover:scale-105 transition-transform">
            Ativar Sistema
          </button>
          <button onClick={onGoToLogin} className="hidden sm:block text-white border border-white/20 px-5 py-3 rounded-[12px] font-bold text-sm hover:bg-white/5 transition-colors">
            Logar
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
            <a href="#" className="text-lg font-bold text-white flex items-center justify-between">
              All Pages <ChevronDown className="w-5 h-5 opacity-50" />
            </a>
            <a href="#" className="text-lg font-bold text-white flex items-center justify-between">
              Collection <ChevronDown className="w-5 h-5 opacity-50" />
            </a>
            <a href="#" className="text-lg font-bold text-white">About</a>
            <a href="#" className="text-lg font-bold text-white flex items-center gap-2">
              Blog
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_5px_rgba(56,242,127,0.8)]" />
            </a>
            <button onClick={onGoToRegister} className="w-full bg-neon-yellow text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest neon-shadow-yellow">
              Ativar Sistema
            </button>
            <button onClick={onGoToLogin} className="w-full text-white border border-white/10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-colors">
              Logar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
