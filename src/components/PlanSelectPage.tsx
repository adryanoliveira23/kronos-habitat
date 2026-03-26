import { motion } from "motion/react";
import { ArrowLeft, Zap, Check, ArrowRight } from "lucide-react";

interface PlanSelectPageProps {
  onBack: () => void;
  onSelectPlan: (plan: "basic" | "powerful" | "pro") => void;
}

export default function PlanSelectPage({
  onBack,
  onSelectPlan,
}: PlanSelectPageProps) {
  const plans = [
    {
      id: "basic" as const,
      name: "Kronos Habit",
      price: "31,90",
      color: "border-neon-yellow/30 hover:border-neon-yellow",
      accentColor: "text-neon-yellow",
      glowColor: "shadow-[0_0_30px_rgba(232,255,0,0.08)]",
      btnClass: "bg-white/10 text-white hover:bg-neon-yellow hover:text-black",
      features: [
        "Hábitos ilimitados",
        "Missões diárias",
        "Sistema de XP e Level",
        "Dashboard gamificado",
        "Ranking global",
      ],
      tag: null,
      badgeName: "Iniciante",
      period: "/mês",
      image: "/pet-1.png",
    },
    {
      id: "powerful" as const,
      name: "Kronos Premium",
      price: "22,08",
      color:
        "border-neon-green shadow-[0_0_40px_rgba(62,255,139,0.15)] scale-105 z-10",
      accentColor: "text-neon-green",
      btnClass: "bg-neon-green text-black hover:bg-neon-green/90",
      features: [
        "Tudo do plano PRO",
        "Acesso total a todos os recursos",
        "Mentoria com IA Ilimitada",
        "Personalização Avançada",
        "Selo Exclusivo de Pioneiro",
      ],
      tag: "Promoção Anual",
      badgeName: "Lendário",
      period: "/mês",
      strikePrice: "59,90",
      billingNote: "Cobrado anualmente (ou R$ 195,00 à vista)",
      image: "/pet-2.png",
    },
    {
      id: "pro" as const,
      name: "Kronos Habit PRO",
      price: "32,90",
      color:
        "border-blue-400/50 shadow-[0_0_30px_rgba(96,165,250,0.1)] hover:border-blue-400",
      accentColor: "text-blue-400",
      glowColor: "",
      btnClass:
        "bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/30",
      features: [
        "IA avançada (Mentor estratégico)",
        "Sistema multiplayer completo",
        "Desafios privados",
        "Análises profundas",
        "Status Elite na comunidade",
      ],
      tag: "Popular",
      badgeName: "Elite",
      period: "/mês",
      image: "/pet-3.png",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center relative overflow-hidden px-4 py-16">
      {/* Background */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-green rounded-full opacity-20"
          animate={{ y: [0, -60, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-[1000px]">
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

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-sans text-xl font-black tracking-tighter mb-10"
        >
          <div className="w-7 h-7 bg-neon-yellow rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-black rounded-full" />
          </div>
          <span className="text-white">KRONOS</span>
          <span className="text-neon-yellow">HABIT</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 text-center"
        >
          <p className="text-neon-green text-[10px] font-black uppercase tracking-[0.4em] mb-3">
            Escolha seu nível
          </p>
          <h1 className="text-3xl sm:text-5xl font-black font-display uppercase leading-tight">
            Qual é o seu <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-green to-neon-yellow">
              comprometimento?
            </span>
          </h1>
          <p className="text-white/40 text-sm mt-4 font-medium max-w-[500px] mx-auto">
            Selecione o plano que melhor representa sua ambição. Você pode fazer
            upgrade a qualquer momento.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`relative bg-white/3 border rounded-[28px] p-7 transition-all duration-300 group cursor-pointer flex flex-col ${plan.color}`}
              onClick={() => onSelectPlan(plan.id)}
            >
              {/* Popular tag */}
              {plan.tag && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full whitespace-nowrap ${plan.id === "powerful" ? "bg-neon-green text-black" : "bg-blue-500 text-white"}`}
                >
                  {plan.tag}
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${plan.id === "powerful" ? "bg-neon-green/10 border-neon-green/20" : plan.id === "pro" ? "bg-blue-500/10 border-blue-500/20" : "bg-neon-yellow/10 border-neon-yellow/20"} mb-4`}
                >
                  <Zap className={`w-3 h-3 fill-current ${plan.accentColor}`} />
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${plan.accentColor}`}
                  >
                    {plan.badgeName}
                  </span>
                </div>
                <h2 className="text-xl font-black uppercase">{plan.name}</h2>
                {plan.strikePrice && (
                  <div className="text-white/30 text-[10px] uppercase font-bold tracking-widest line-through mb-1">
                    De: R$ {plan.strikePrice} /mês
                  </div>
                )}
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[11px] text-white/40 font-bold">
                    R$
                  </span>
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-[11px] text-white/40 font-bold">
                    {plan.period || "/mês"}
                  </span>
                </div>
                {((plan as any).billingNote || plan.id === "powerful") && (
                  <div className="text-neon-green/80 text-[9px] uppercase font-bold tracking-widest mt-2 bg-neon-green/10 inline-block px-2 py-1 rounded-sm">
                    {(plan as any).billingNote || "Melhor Custo-Benefício"}
                  </div>
                )}
              </div>

              {/* Pet Image */}
              <div className="mb-6 flex justify-center">
                <img
                  src={(plan as any).image}
                  alt={plan.name}
                  className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(56,242,127,0.3)]"
                />
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[11px] font-bold uppercase tracking-tight text-white/70"
                  >
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${plan.accentColor}`}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlan(plan.id);
                }}
                className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${plan.btnClass}`}
              >
                Escolher plano
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/20 text-[10px] uppercase font-bold tracking-[0.3em] mt-10"
        >
          Cancele quando quiser • Kronos Habit
        </motion.p>
      </div>
    </div>
  );
}
