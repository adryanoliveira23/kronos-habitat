"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useTranslations } from "next-intl";
import LoadingScreen from "@/components/LoadingScreen";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegisterPage";
import PlanSelectPage from "@/components/PlanSelectPage";
import CheckoutPage from "@/components/CheckoutPage";
import SystemDashboard from "@/components/SystemDashboard";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import DashboardSection from "@/components/DashboardSection";
import LifeCategoriesSection from "@/components/LifeCategoriesSection";
import UnlockableCharactersSection from "@/components/UnlockableCharactersSection";
import BackgroundMusic from "@/components/BackgroundMusic";
import HabitSystemSection from "@/components/HabitSystemSection";
import Features from "@/components/Features";
import AISection from "@/components/AISection";
import MissionsRewardsSection from "@/components/MissionsRewardsSection";
import Multiplayer from "@/components/Multiplayer";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import CommunitySection from "@/components/CommunitySection";

type View = "landing" | "login" | "register" | "plan-select" | "checkout";

export default function Home() {
  const t = useTranslations("System");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isSystemLoading, setIsSystemLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<View>("landing");
  const [selectedPlan, setSelectedPlan] = useState<
    "basic" | "pro" | "powerful" | undefined
  >(undefined);
  const [globalVolume, setGlobalVolume] = useState(70);

  const goTo = (v: View) => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    setView(v);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  const goToRegister = () => goTo("register");
  const goToLogin = () => goTo("login");

  const scrollToPricing = () => {
    const el = document.getElementById("precos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoginSuccess = () => {
    setIsSystemLoading(true);
    // Mimic system initialization
    setTimeout(() => {
      setIsSystemLoading(false);
      setIsAuthenticated(true);
    }, 4000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView("landing");
  };

  const handleSelectPlan = (plan: "basic" | "pro" | "powerful") => {
    setSelectedPlan(plan);
    goTo("checkout");
  };

  return (
    <div className="min-h-screen bg-bg-dark selection:bg-neon-yellow selection:text-black">
      <BackgroundMusic volume={globalVolume} />
      <AnimatePresence mode="wait">
        {isLoading || isAuthChecking ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : isSystemLoading ? (
          <LoadingScreen
            label={t("loading")}
            onComplete={() => {}}
          />
        ) : isAuthenticated ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <SystemDashboard
              onLogout={handleLogout}
              volume={globalVolume}
              setVolume={setGlobalVolume}
            />
          </motion.div>
        ) : view === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginPage
              onBack={() => goTo("landing")}
              onCreateAccount={() => goTo("register")}
              onLoginSuccess={handleLoginSuccess}
            />
          </motion.div>
        ) : view === "register" ? (
          <motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RegisterPage
              onBack={() => goTo("landing")}
              onGoToLogin={goToLogin}
              onRegisterSuccess={() => goTo("plan-select")}
              selectedPlan={selectedPlan}
            />
          </motion.div>
        ) : view === "checkout" ? (
          <motion.div
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckoutPage
              onBack={() => goTo("plan-select")}
              selectedPlan={selectedPlan}
              onComplete={handleLoginSuccess}
            />
          </motion.div>
        ) : view === "plan-select" ? (
          <motion.div
            key="plan-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PlanSelectPage
              onBack={() => goTo("landing")}
              onSelectPlan={handleSelectPlan}
            />
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar onGoToLogin={goToLogin} onGoToPricing={scrollToPricing} />
            <Hero onGoToPricing={scrollToPricing} />
            <UnlockableCharactersSection />
            <ProblemSection />
            <DashboardSection />
            <LifeCategoriesSection />
            <HabitSystemSection />
            <Features />
            <AISection />
            <MissionsRewardsSection />
            <Multiplayer />
            <CommunitySection />
            <Pricing onGoToRegister={goToRegister} />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
