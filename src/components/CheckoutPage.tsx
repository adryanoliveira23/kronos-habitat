import { motion } from "motion/react";
import {
  ArrowLeft,
  Rocket,
  Zap,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface CheckoutPageProps {
  onBack: () => void;
  selectedPlan: "basic" | "powerful" | "pro" | undefined;
  onComplete: () => void;
}

export default function CheckoutPage({
  onBack,
  selectedPlan,
  onComplete,
}: CheckoutPageProps) {
  const planData = {
    basic: {
      name: "Kronos Habit",
      price: "31,90",
      link: "https://pay.wiapy.com/69ab70b4238dee7b0180888c",
      color: "text-neon-yellow",
      bg: "bg-neon-yellow/10 border-neon-yellow/20",
    },
    powerful: {
      name: "Kronos Premium",
      price: "22,08",
      link: "https://pay.wiapy.com/69ab46a5238dee7b017872f7",
      color: "text-neon-green",
      bg: "bg-neon-green/10 border-neon-green/20",
    },
    pro: {
      name: "Kronos Habit PRO",
      price: "32,90",
      link: "https://pay.wiapy.com/69ab6f71238dee7b018056cc",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
  };

  const currentPlan = selectedPlan ? planData[selectedPlan] : planData.basic;

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[480px]">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 font-bold text-sm uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </motion.button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative bg-white/3 border border-white/10 rounded-[32px] p-8 sm:p-10 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-neon-green/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${currentPlan.bg}`}
              >
                <Zap className={`w-3 h-3 fill-current ${currentPlan.color}`} />
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${currentPlan.color}`}
                >
                  Checkout Seguro
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display uppercase leading-tight mb-2">
                Quase lá, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-green to-neon-yellow">
                  Guerreiro.
                </span>
              </h1>
              <p className="text-white/40 text-sm font-medium">
                Sua conta foi criada. Agora, ative seu acesso ao{" "}
                {currentPlan.name}.
              </p>
            </div>

            {/* Plan Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                  Plano Selecionado
                </span>
                <span
                  className={`text-sm font-black uppercase ${currentPlan.color}`}
                >
                  {currentPlan.name}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                  Total
                </span>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-xs text-white/40 font-bold">R$</span>
                    <span className="text-3xl font-black text-white">
                      {currentPlan.price}
                    </span>
                    <span className="text-xs text-white/40 font-bold">
                      /mês
                    </span>
                  </div>
                  <p className="text-[10px] text-white/20 font-bold uppercase mt-1">
                    Ativação imediata após o pagamento
                  </p>
                </div>
              </div>
            </div>

            {/* Features/Trust */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white/60">
                <ShieldCheck className="w-5 h-5 text-neon-green" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Pagamento 100% Seguro
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Clock className="w-5 h-5 text-neon-green" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Acesso Vitalício (Enquanto Assinado)
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Rocket className="w-5 h-5 text-neon-green" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Liberação Instantânea
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <a
                href={currentPlan.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-neon-green text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(56,242,127,0.3)] hover:shadow-[0_0_30px_rgba(56,242,127,0.5)] transition-all flex items-center justify-center gap-2"
              >
                EFETUAR PAGAMENTO
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onComplete}
                className="w-full py-4 bg-white/3 border border-white/10 text-white/60 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all"
              >
                Já realizei o pagamento / Ir para Dashboard
              </button>
            </div>
          </div>
        </motion.div>

        {/* Support info */}
        <p className="text-center text-white/20 text-[10px] uppercase font-bold tracking-[0.2em] mt-8">
          Dúvidas? Suporte prioritário via WhatsApp
        </p>
      </div>
    </div>
  );
}
