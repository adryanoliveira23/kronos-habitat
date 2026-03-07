import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-section-3 relative overflow-hidden section-bg-glow">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-green/5 blur-[80px] rounded-full -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-green/10 border border-neon-green/20">
              <Zap className="h-5 w-5 text-neon-green" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase font-sans">
              Kronos<span className="text-neon-yellow">Habit</span>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-neon-green transition-colors">Termos</a>
            <a href="#" className="hover:text-neon-green transition-colors">Privacidade</a>
            <a href="#" className="hover:text-neon-green transition-colors">Suporte</a>
            <a href="#" className="hover:text-neon-green transition-colors">API</a>
          </div>
          
          <div className="text-[10px] font-black uppercase tracking-widest text-white/20 px-4">
            © 2026 Kronos Habit System. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
