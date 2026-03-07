import { motion } from "motion/react";
import { Swords, TrendingUp, Cpu } from "lucide-react";

const features = [
  {
    icon: Swords,
    title: "Missões Diárias",
    description: "Suas tarefas não são mais obrigações chatas. Elas são missões que rendem XP, ouro e progresso real na sua jornada.",
    items: ["Tarefas viram missões", "Check-in diário gamificado", "XP por conclusão imediata"]
  },
  {
    icon: TrendingUp,
    title: "Sistema de XP e Level",
    description: "Cada ação positiva gera XP. Suba de nível para desbloquear novos recursos e mostrar sua dominância no sistema.",
    items: ["Levels desbloqueiam medalhas", "Temas e customização", "Status social na comunidade"]
  },
  {
    icon: Cpu,
    title: "Inteligência Artificial",
    description: "Um motor de IA analisa seus padrões e ajusta o sistema para garantir que você nunca fique estagnado ou sobrecarregado.",
    items: ["Ajuste dinâmico de metas", "Sugestões de melhoria", "Detecção de queda de desempenho"]
  }
];

export default function Features() {
  return (
    <section id="pilares" className="py-24 bg-section-1 relative overflow-hidden section-bg-glow">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-neon-green/5 to-transparent pointer-events-none -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">Como Funciona</h2>
          <p className="text-4xl md:text-5xl font-black font-sans tracking-tighter uppercase">Os 3 Pilares da Evolução</p>
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
