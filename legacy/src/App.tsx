import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PlanSelectPage from "./components/PlanSelectPage";
import SystemDashboard from "./components/SystemDashboard";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import DashboardSection from "./components/DashboardSection";
import LifeCategoriesSection from './components/LifeCategoriesSection';
import UnlockableCharactersSection from './components/UnlockableCharactersSection';
import BackgroundMusic from './components/BackgroundMusic';
import HabitSystemSection from "./components/HabitSystemSection";
import Features from "./components/Features";
import AISection from "./components/AISection";
import MissionsRewardsSection from "./components/MissionsRewardsSection";
import Multiplayer from "./components/Multiplayer";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import CommunitySection from "./components/CommunitySection";

type View = "landing" | "login" | "register" | "plan-select";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSystemLoading, setIsSystemLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<View>("landing");
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro" | undefined>(undefined);
  const [globalVolume, setGlobalVolume] = useState(70);

  const goTo = (v: View) => {
    window.scrollTo(0, 0);
    setView(v);
  };

  const goToRegister = () => goTo("register");
  const goToLogin = () => goTo("login");

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

  const handleSelectPlan = (plan: "basic" | "pro") => {
    setSelectedPlan(plan);
    goTo("register");
  };

  return (
    <div className="min-h-screen bg-bg-dark selection:bg-neon-yellow selection:text-black">
      <BackgroundMusic volume={globalVolume} />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : isSystemLoading ? (
          <LoadingScreen label="INICIANDO SISTEMA INTERNO" onComplete={() => { }} />
        ) : isAuthenticated ? (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
            <SystemDashboard
              onLogout={handleLogout}
              volume={globalVolume}
              setVolume={setGlobalVolume}
            />
          </motion.div>
        ) : view === "login" ? (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginPage
              onBack={() => goTo("landing")}
              onCreateAccount={() => goTo("plan-select")}
              onLoginSuccess={handleLoginSuccess}
            />
          </motion.div>
        ) : view === "register" ? (
          <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RegisterPage
              onBack={() => goTo(selectedPlan ? "plan-select" : "landing")}
              onGoToLogin={goToLogin}
              selectedPlan={selectedPlan}
            />
          </motion.div>
        ) : view === "plan-select" ? (
          <motion.div key="plan-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PlanSelectPage
              onBack={() => goTo("login")}
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
            <Navbar onGoToLogin={goToLogin} onGoToRegister={goToRegister} />
            <Hero onGoToRegister={goToRegister} />
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




