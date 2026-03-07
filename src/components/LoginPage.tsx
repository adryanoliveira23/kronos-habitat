import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Zap, ArrowLeft, Mail, Lock } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginPageProps {
  onBack: () => void;
  onCreateAccount: () => void;
  onLoginSuccess: () => void;
}

export default function LoginPage({
  onBack,
  onCreateAccount,
  onLoginSuccess,
}: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error("Login Error:", err);
      setError("Credenciais inválidas ou erro no sistema. Tente novamente.");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-yellow/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-green rounded-full opacity-30"
          animate={{ y: [0, -80, 0], opacity: [0.1, 0.5, 0.1] }}
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
          {/* Inner glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-neon-green/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neon-green/10 border border-neon-green/20 rounded-full mb-4">
                <Zap className="w-3 h-3 text-neon-green fill-current" />
                <span className="text-neon-green text-[10px] font-black uppercase tracking-widest">
                  Sistema Online
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display uppercase leading-tight">
                Acesse seu <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-yellow">
                  Cockpit.
                </span>
              </h1>
              <p className="text-white/40 text-sm mt-2 font-medium">
                Entre para desblocar sua evolução.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleLogin}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-wider text-center"
                >
                  {error}
                </motion.div>
              )}
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
                  placeholder="Sua senha"
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

              {/* Forgot Password */}
              <div className="flex justify-end px-2">
                <button
                  type="button"
                  className="text-[10px] text-white/30 hover:text-neon-yellow font-bold uppercase tracking-widest transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoggingIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 bg-neon-yellow text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(232,255,0,0.2)] hover:shadow-[0_0_30px_rgba(232,255,0,0.4)] transition-all flex items-center justify-center gap-2 mt-2 ${isLoggingIn ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoggingIn ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    ENTRAR NO SISTEMA
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

            {/* Register */}
            <p className="text-center text-white/40 text-sm">
              Não tem conta?{" "}
              <button
                onClick={onCreateAccount}
                className="text-neon-yellow font-black hover:underline transition-all"
              >
                Criar conta
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
