import { motion } from "motion/react";
import { Instagram, Trophy, Users, Shield, Zap } from "lucide-react";

export default function CommunitySection() {
    const leaderboard = [
        { rank: 1, name: "ShadowKage", instagram: "@shadow.kage99", level: 250, coins: "45.2K", avatar: "https://i.ibb.co/6cD731hz/Chat-GPT-Image-1-de-mar-de-2026-13-23-58.png", isPro: true },
        { rank: 2, name: "Ronin_77", instagram: "@ronin_arts0", level: 245, coins: "41.8K", avatar: "https://i.ibb.co/HT2cTXfW/Chat-GPT-Image-1-de-mar-de-2026-13-24-02.png", isPro: true },
        { rank: 3, name: "CyberMonk", instagram: "@cm_monk.nft", level: 238, coins: "38.5K", avatar: "https://i.ibb.co/8g808TTc/Chat-GPT-Image-1-de-mar-de-2026-21-15-10.png", isPro: true },
        { rank: 142, name: "Você", instagram: "@seu.insta", level: 42, coins: "1.2K", avatar: "https://ui-avatars.com/api/?name=V+C&background=0D0D12&color=E8FF00", isPro: false, isCurrentUser: true }
    ];

    return (
        <section className="relative py-24 sm:py-32 px-4 sm:px-8 border-t border-white/5 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-yellow/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="text-center mb-16 sm:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-5xl font-black font-display uppercase mb-6"
                    >
                        Faça Parte da <span className="text-neon-yellow">Elite</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 max-w-[600px] mx-auto text-sm sm:text-lg"
                    >
                        Conecte-se com outros ninjas, acompanhe o ranking global e mostre sua disciplina para a comunidade KRONOS.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">

                    {/* Left Column: Community / Instagram */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="glass-card p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] relative overflow-hidden group">
                            {/* Decorative background element */}
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-neon-purple/20 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8">
                                    <Instagram className="w-8 h-8 text-white group-hover:text-neon-yellow transition-colors" />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-black font-display uppercase mb-4">
                                    Comunidade Oficial
                                </h3>
                                <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
                                    Comunidade na KRONOS descobrindo estrategias avançadas de hábitos, atualizações do sistema, sorteios de NFTs e acesso VIP aos bastidores.
                                </p>

                                <a
                                    href="#precos"
                                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-neon-yellow hover:neon-shadow-yellow transition-all duration-300 w-full sm:w-auto justify-center"
                                >
                                    QUERO ENTRAR
                                </a>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-card p-6 rounded-[24px]">
                                <Users className="w-6 h-6 text-neon-green mb-4" />
                                <div className="text-2xl font-black mb-1">20k+</div>
                                <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Ninjas ativos</div>
                            </div>
                            <div className="glass-card p-6 rounded-[24px]">
                                <Shield className="w-6 h-6 text-neon-yellow mb-4" />
                                <div className="text-2xl font-black mb-1">Rank S</div>
                                <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Maior patente</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Global Ranking */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-1 rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-white/5 to-transparent p-[1px]"
                    >
                        <div className="bg-bg-dark rounded-[31px] sm:rounded-[39px] p-6 sm:p-10 h-full w-full">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black font-display uppercase mb-2 flex items-center gap-3">
                                        <Trophy className="w-6 h-6 text-neon-yellow" />
                                        Ranking Global
                                    </h3>
                                    <p className="text-xs text-white/50 uppercase tracking-wider font-bold">Temporada 1 • Fase Elite</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-bold text-white/70">
                                    TOP 100
                                </div>
                            </div>

                            <div className="space-y-3">
                                {leaderboard.map((user, idx) => (
                                    <div key={idx}>
                                        {user.isCurrentUser && <div className="py-2 text-center text-[10px] text-white/40 uppercase font-bold tracking-[0.2em] relative before:absolute before:left-0 before:top-1/2 before:w-[calc(50%-20px)] before:h-[1px] before:bg-white/10 after:absolute after:right-0 after:top-1/2 after:w-[calc(50%-20px)] after:h-[1px] after:bg-white/10">Sua Posição</div>}
                                        <div
                                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10 ${user.isCurrentUser ? 'bg-neon-yellow/10 border-neon-yellow/30' : 'bg-black/20'
                                                }`}
                                        >
                                            {/* Rank Number */}
                                            <div className={`w-8 text-center font-black ${user.rank === 1 ? 'text-neon-yellow text-xl' :
                                                user.rank === 2 ? 'text-gray-300 text-lg' :
                                                    user.rank === 3 ? 'text-orange-400 text-lg' :
                                                        'text-white/40 text-sm'
                                                }`}>
                                                #{user.rank}
                                            </div>

                                            {/* Avatar */}
                                            <div className="relative">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    referrerPolicy="no-referrer"
                                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover bg-zinc-900 border border-white/10"
                                                />
                                                {user.isPro && (
                                                    <div className="absolute -bottom-1 -right-1 bg-neon-yellow text-black text-[8px] font-black px-1.5 py-0.5 rounded uppercase">PRO</div>
                                                )}
                                            </div>

                                            {/* User Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-sm sm:text-base text-white truncate flex items-center gap-2">
                                                    {user.name}
                                                    {user.isCurrentUser && <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full">Você</span>}
                                                </div>
                                                <div className="text-[10px] text-white/50 flex items-center gap-1.5 mt-0.5 font-bold tracking-wider">
                                                    <Instagram className="w-3 h-3 text-white/40" />
                                                    {user.instagram}
                                                </div>
                                                <div className="text-xs text-white/50 flex items-center gap-2 mt-1">
                                                    <Zap className="w-3 h-3 text-neon-green" />
                                                    Nível {user.level}
                                                </div>
                                            </div>

                                            {/* Score */}
                                            <div className="text-right">
                                                <div className="font-black text-sm sm:text-base text-white">{user.coins}</div>
                                                <div className="text-[10px] text-white/40 uppercase tracking-wider">Moedas</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-8 py-4 rounded-xl border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
                                Ver Ranking Completo
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
