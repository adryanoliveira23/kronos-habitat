import { useState } from "react";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Zap,
  ArrowLeft,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface RegisterPageProps {
  onBack: () => void;
  onGoToLogin: () => void;
  onRegisterSuccess: () => void;
  selectedPlan?: "basic" | "powerful" | "pro";
}

export default function RegisterPage({
  onBack,
  onGoToLogin,
  onRegisterSuccess,
  selectedPlan,
}: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: name,
        email: email,
        plan: selectedPlan || "free",
        rank: 1,
        xp: 0,
        createdAt: new Date().toISOString(),
        friends: [],
      });

      onRegisterSuccess();
    } catch (err: any) {
      console.error("Registration Error:", err);
      setError("Erro ao criar conta. Tente novamente.");
      setIsRegistering(false);
    }
  };

  const getPlanInfo = () => {
    switch (selectedPlan) {
      case "pro":
        return {
          label: "Kronos Habit PRO",
          color: "text-blue-400",
          bg: "bg-blue-500/10 border-blue-500/20",
        };
      case "powerful":
        return {
          label: "Kronos Premium",
          color: "text-neon-green",
          bg: "bg-neon-green/10 border-neon-green/20",
        };
      default:
        return {
          label: "Kronos Habit",
          color: "text-neon-yellow",
          bg: "bg-neon-yellow/10 border-neon-yellow/20",
        };
    }
  };

  const planInfo = getPlanInfo();
  const planLabel = planInfo.label;
  const planColor = planInfo.color;
  const planBg = planInfo.bg;
  const planTextColor = planInfo.color;

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-neon-yellow/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-yellow rounded-full opacity-20"
          animate={{ y: [0, -80, 0], opacity: [0.1, 0.4, 0.1] }}
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

      <div className="relative z-10 w-full max-w-[440px]">
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

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative bg-white/[0.03] border border-white/10 rounded-[32px] p-8 sm:p-10 backdrop-blur-xl overflow-hidden"
        >
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-neon-yellow/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              {/* Plan badge if coming from plan selection */}
              {selectedPlan && (
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${planBg}`}
                >
                  <Zap className={`w-3 h-3 fill-current ${planTextColor}`} />
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${planTextColor}`}
                  >
                    {planLabel}
                  </span>
                </div>
              )}
              {!selectedPlan && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neon-yellow/10 border border-neon-yellow/20 rounded-full mb-4">
                  <Zap className="w-3 h-3 text-neon-yellow fill-current" />
                  <span className="text-neon-yellow text-[10px] font-black uppercase tracking-widest">
                    Criar Conta
                  </span>
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-black font-display uppercase leading-tight">
                Comece sua <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-neon-green">
                  Evolução.
                </span>
              </h1>
              <p className="text-white/40 text-sm mt-2 font-medium">
                {selectedPlan === "pro"
                  ? "Junte-se à elite. Configure seu acesso PRO."
                  : "Configure sua conta e domine seus hábitos."}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleRegister}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-wider text-center"
                >
                  {error}
                </motion.div>
              )}
              {/* Name */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome de guerreiro"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-medium placeholder-white/30 focus:outline-none focus:border-neon-yellow/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-medium placeholder-white/30 focus:outline-none focus:border-neon-yellow/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crie uma senha forte"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-12 py-4 text-white text-sm font-medium placeholder-white/30 focus:outline-none focus:border-neon-yellow/50 focus:bg-white/[0.07] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isRegistering}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 bg-neon-yellow text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(232,255,0,0.2)] hover:shadow-[0_0_30px_rgba(232,255,0,0.4)] transition-all flex items-center justify-center gap-2 mt-2 ${isRegistering ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isRegistering ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    CRIAR MINHA CONTA
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">
                ou
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Login link */}
            <p className="text-center text-white/40 text-sm">
              Já tem conta?{" "}
              <button
                onClick={onGoToLogin}
                className="text-neon-green font-black hover:underline transition-all"
              >
                Fazer login
              </button>
            </p>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/20 text-[10px] uppercase font-bold tracking-[0.3em] mt-8"
        >
          Kronos Habit • Sistema Gamificado de Elite
        </motion.p>
      </div>
    </div>
  );
}
