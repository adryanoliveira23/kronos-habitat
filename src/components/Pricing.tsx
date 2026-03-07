import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, X, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Kronos Habit",
    badgeName: "Iniciante",
    price: "31,90",
    description: "Para quem está começando a jornada.",
    features: [
      "Hábitos ilimitados",
      "Missões diárias",
      "Sistema de XP e Level",
      "Dashboard gamificado",
      "Ranking global",
    ],
    highlightClass: "bg-white/5 border-white/10",
    accentColor: "text-neon-yellow",
    btnClass: "bg-white/10 text-white hover:bg-white/20",
    hasHighlightBadge: false,
    badgeText: "",
    period: "/mês",
    checkoutLink: "https://pay.wiapy.com/69ab70b4238dee7b0180888c",
  },
  {
    name: "Kronos Premium",
    badgeName: "Lendário",
    price: "22,08",
    description: "Acesso absoluto ao sistema completo.",
    features: [
      "Tudo do plano PRO",
      "Acesso total a todos os recursos",
      "Mentoria com IA Ilimitada",
      "Personalização Avançada",
      "Selo Exclusivo de Pioneiro",
    ],
    highlightClass:
      "bg-neon-green/5 border-neon-green shadow-[0_0_40px_rgba(62,255,139,0.15)] md:scale-105 z-10",
    accentColor: "text-neon-green",
    btnClass:
      "bg-neon-green text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(62,255,139,0.3)]",
    hasHighlightBadge: true,
    badgeText: "Promoção Anual",
    badgeBg: "bg-neon-green text-black",
    period: "/mês",
    strikePrice: "59,90",
    billingNote: "Cobrado anualmente (ou R$ 195,00 à vista)",
    checkoutLink: "https://pay.wiapy.com/69ab46a5238dee7b017872f7",
  },
  {
    name: "Kronos Habit PRO",
    badgeName: "Elite",
    price: "32,90",
    description: "A verdadeira evolução acontece aqui.",
    features: [
      "IA avançada (mentor estratégico)",
      "Sistema multiplayer completo",
      "Desafios privados",
      "Análises profundas",
      "Status Elite na comunidade",
    ],
    highlightClass:
      "bg-blue-500/5 border-blue-500/50 shadow-[0_0_30px_rgba(96,165,250,0.1)] hover:border-blue-500",
    accentColor: "text-blue-400",
    btnClass:
      "bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/30",
    hasHighlightBadge: true,
    badgeText: "Popular",
    badgeBg: "bg-blue-500 text-white",
    period: "/mês",
    checkoutLink: "#",
  },
];

export default function Pricing({
  onGoToRegister,
}: {
  onGoToRegister: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="precos"
      className="py-16 sm:py-24 bg-section-2 relative overflow-hidden section-bg-glow"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-neon-green/5 to-transparent pointer-events-none -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">
            Investimento
          </h2>
          <p className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-normal uppercase">
            Escolha seu Nível
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border transition-all flex flex-col",
                plan.highlightClass,
              )}
            >
              {plan.hasHighlightBadge && (
                <div
                  className={cn(
                    "absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-full whitespace-nowrap",
                    plan.badgeBg,
                  )}
                >
                  {plan.badgeText}
                </div>
              )}

              <div className="mb-6 sm:mb-8">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4",
                    plan.badgeName === "Lendário"
                      ? "bg-neon-green/10 border-neon-green/20"
                      : plan.badgeName === "Elite"
                        ? "bg-blue-500/10 border-blue-500/20"
                        : "bg-neon-yellow/10 border-neon-yellow/20",
                  )}
                >
                  <Zap
                    className={cn("w-3 h-3 fill-current", plan.accentColor)}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      plan.accentColor,
                    )}
                  >
                    {plan.badgeName}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-sans uppercase mb-2 tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-tight leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                {plan.strikePrice && (
                  <div className="text-white/30 text-[10px] uppercase font-bold tracking-widest line-through mb-1">
                    De: R$ {plan.strikePrice} /mês
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] sm:text-xs text-white/40 font-bold">
                    R$
                  </span>
                  <span className="text-4xl sm:text-5xl font-black font-sans">
                    {plan.price}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/40 font-bold">
                    {plan.period || "/mês"}
                  </span>
                </div>
                {plan.billingNote && (
                  <div className="text-neon-green/80 text-[10px] uppercase font-bold tracking-widest mt-2 bg-neon-green/10 inline-block px-2 py-1 rounded-md">
                    {plan.billingNote}
                  </div>
                )}
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-tight"
                  >
                    <Check
                      className={cn(
                        "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 mt-0.5",
                        plan.accentColor,
                      )}
                    />
                    <span className="text-white/80 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (plan.badgeName === "Elite") {
                    setIsModalOpen(true);
                  } else if (plan.checkoutLink && plan.checkoutLink !== "#") {
                    window.location.href = plan.checkoutLink;
                  } else {
                    onGoToRegister();
                  }
                }}
                className={cn(
                  "w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                  plan.btnClass,
                )}
              >
                {plan.hasHighlightBadge ? (
                  <Zap className="h-4 w-4 fill-current" />
                ) : null}
                {plan.badgeName === "Lendário"
                  ? "Desbloquear Tudo"
                  : plan.badgeName === "Elite"
                    ? "Jogar no Modo Elite"
                    : "Iniciar Jornada"}
              </button>

              {plan.badgeName === "Lendário" && (
                <p className="mt-4 text-center text-[8px] sm:text-[9px] text-neon-green font-black uppercase tracking-widest leading-relaxed">
                  “Para quem não aceita limites no jogo da vida.”
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Promotional Modal Checkout */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-12">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[440px] glass-card bg-bg-dark/90 border border-neon-green/30 rounded-[32px] p-6 sm:p-8 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(62,255,139,0.15)]"
            >
              {/* Optional glowing orb behind content inside modal */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-neon-green/20 blur-[50px] rounded-full pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center text-neon-green border border-neon-green/20">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-neon-green font-black uppercase tracking-widest text-[10px] sm:text-xs">
                    Oferta Desbloqueada
                  </h4>
                  <p className="font-bold text-white text-sm sm:text-base">
                    Kronos Habit PRO
                  </p>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mb-8">
                <p className="text-white/40 text-xs sm:text-sm font-bold uppercase tracking-wide line-through decoration-red-500/50 decoration-2 mb-1">
                  De: R$ 32,90/mês
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-xs sm:text-sm text-neon-green font-bold mb-1 sm:mb-2">
                    3x de R$
                  </span>
                  <span className="text-5xl sm:text-6xl font-black font-sans text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    9,41
                  </span>
                </div>
                <div className="mt-2 text-xs font-bold text-white/80 uppercase tracking-wide">
                  ou R$ 25,90 / trimestre à vista
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-xs text-white/80 font-bold uppercase tracking-widest mb-4">
                  Você recebe tudo do plano, MAIS BRINDE:
                </p>
                <ul className="space-y-3">
                  {[
                    "IA Avançada (Mentor Estratégico)",
                    "Sistema de Multiplayer Integrado",
                    "Análises Profundas e Relatórios",
                    "Status PRO e Medalhas Exclusivas",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-white/70 font-bold">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() =>
                  (window.location.href =
                    "https://pay.wiapy.com/69ab6f71238dee7b018056cc")
                }
                className="w-full py-4 rounded-xl bg-neon-green text-black font-black text-xs sm:text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(62,255,139,0.3)] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                GARANTIR DESCONTO AGORA
              </button>

              <p className="text-center text-white/30 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest mt-4">
                Cancele a qualquer momento
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
