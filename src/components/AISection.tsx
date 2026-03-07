import { motion } from "motion/react";
import { Bot, MessageSquare, Zap, Brain } from "lucide-react";

export default function AISection() {
  return (
    <section id="ia" className="py-24 bg-section-2 relative overflow-hidden section-bg-glow-alt">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-neon-green/10 blur-[80px] sm:blur-[100px] rounded-full" />
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-neon-yellow/5 blur-[80px] sm:blur-[100px] rounded-full" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative p-8 rounded-[40px] glass-card border-neon-green/20">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-full bg-neon-green flex items-center justify-center">
                     <Bot className="h-6 w-6 text-black" />
                  </div>
                  <div>
                     <div className="text-[10px] font-black text-neon-green uppercase tracking-widest">KRONOS AI</div>
                     <div className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Mentor do Sistema</div>
                  </div>
               </div>
               
               <motion.div 
                  className="space-y-4"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 1.2
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 }
                    }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium max-w-[80%] relative"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" />
                      <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Processando</span>
                    </div>
                    Analisando seu desempenho da última semana...
                  </motion.div>

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 }
                    }}
                    className="p-4 rounded-2xl bg-neon-green/10 border border-neon-green/20 text-xs font-bold max-w-[80%] ml-auto text-neon-green relative"
                  >
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green/20 rounded-full blur-sm animate-pulse" />
                    "Você está falhando sempre no mesmo horário. Ajustei sua rotina para reduzir a carga cognitiva às 15:00."
                  </motion.div>

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 }
                    }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium max-w-[80%]"
                  >
                    Novo plano diário gerado. Dificuldade: Equilibrada.
                  </motion.div>
               </motion.div>
               
               <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                     <Zap className="h-4 w-4 text-neon-green" />
                     <span className="text-[10px] font-bold text-white/40 uppercase">Ajuste em Tempo Real</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Brain className="h-4 w-4 text-neon-green" />
                     <span className="text-[10px] font-bold text-white/40 uppercase">Análise Preditiva</span>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">Inteligência Artificial</h2>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-normal leading-tight mb-8 uppercase">
              O Mentor que nunca dorme.
            </h3>
            <p className="text-lg text-white/60 mb-8 font-medium">
              A IA do Kronos não é um chatbot motivacional genérico. É um motor estratégico que analisa cada micro-decisão sua para otimizar seu caminho.
            </p>
            
            <div className="space-y-6">
               {[
                 "Criação de plano diário e semanal automático",
                 "Ajuste de dificuldade conforme desempenho real",
                 "Alertas estratégicos baseados em padrões de falha",
                 "Detecção antecipada de risco de abandono"
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="h-6 w-6 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                       <div className="h-2 w-2 bg-neon-green rotate-45" />
                    </div>
                    <span className="text-white/80 font-bold text-sm uppercase tracking-tight">{text}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
