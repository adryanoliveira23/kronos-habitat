import React, { useState, useEffect } from "react";
import {
  Sword,
  Shield,
  Zap,
  Target,
  Users,
  Trophy,
  Star,
  Flame,
  LogOut,
  ChevronRight,
  Sparkles,
  Crown,
  Swords,
  Heart,
  X,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Square,
  RotateCcw,
  CheckSquare,
  Check,
  Lock,
  Edit3,
  Trash2,
  Pencil,
  CalendarDays,
  Settings,
  Volume2,
  VolumeX,
  User,
  Plus,
  Eye,
  TrendingUp,
  Timer,
  Calendar,
  CircleDollarSign,
  Newspaper,
  Users as Friends,
  Menu as MenuIcon,
  CheckCircle2,
  Menu,
  Activity,
  BookOpen,
  MessageCircle,
  Bell,
  Award,
  Clock,
  Bot,
  Briefcase,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import petImg from "@/lib/pet.png";
import personagemImg from "@/lib/personagem.png";
import playerLeft from "@/lib/personagem-virado-pra-esquerda.png";
import vilao1 from "@/lib/vilao1.png";
import vilao2 from "@/lib/vilao2.png";
import vilao3 from "@/lib/vilao3.png";
import vilao4 from "@/lib/vilao4.png";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";

// â”€â”€â”€ Constants & Assets â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SHOP_CHARACTERS = [
  {
    id: 1,
    name: "Guerreiro Supremo",
    class: "Guerreiro",
    rarity: "LENDíRIO",
    price: 0,
    img: personagemImg.src,
    color: "from-neon-green to-emerald-600",
    glow: "rgba(56,242,127,0.5)",
  },
  {
    id: 2,
    name: "Cyborg Aprendiz",
    class: "Cyborg",
    rarity: "INICIANTE",
    price: 5000,
    img: "https://i.ibb.co/Mm8fkMz/Chat-GPT-Image-1-de-mar-de-2026-21-15-22.png",
    color: "from-yellow-400 to-orange-500",
    glow: "rgba(255,165,0,0.5)",
  },
  {
    id: 3,
    name: "Ninja Esmeralda",
    class: "Elite",
    rarity: "EPIC",
    price: 8000,
    img: "https://i.ibb.co/jXgP91m/Chat-GPT-Image-1-de-mar-de-2026-21-15-18.png",
    color: "from-neon-green to-emerald-600",
    glow: "rgba(56,242,127,0.5)",
  },
  {
    id: 4,
    name: "Comandante íureo",
    class: "Lendário",
    rarity: "ULTRA",
    price: 12000,
    img: "https://i.ibb.co/8g808TTc/Chat-GPT-Image-1-de-mar-de-2026-21-15-10.png",
    color: "from-amber-400 to-yellow-600",
    glow: "rgba(255,215,0,0.5)",
  },
];

const SHOP_PETS = [
  {
    id: 1,
    name: "Robo-Pet T01",
    class: "Básico",
    rarity: "COMUM",
    price: 0,
    img: petImg.src,
    color: "from-neon-green to-emerald-600",
    glow: "rgba(56,242,127,0.5)",
  },
  {
    id: 2,
    name: "Drone de Vigília",
    class: "Rápido",
    rarity: "RARO",
    price: 2000,
    img: "https://i.ibb.co/HT2cTXfW/Chat-GPT-Image-1-de-mar-de-2026-13-24-02.png",
    color: "from-blue-400 to-cyan-600",
    glow: "rgba(0,191,255,0.5)",
  },
  {
    id: 3,
    name: "Pantera Neon",
    class: "Fura-Fila",
    rarity: "EPIC",
    price: 6000,
    img: "https://i.ibb.co/HT2cTXfW/Chat-GPT-Image-1-de-mar-de-2026-13-24-02.png",
    color: "from-purple-500 to-indigo-600",
    glow: "rgba(138,43,226,0.5)",
  },
  {
    id: 4,
    name: "Dragão de Dados",
    class: "Místico",
    rarity: "ULTRA",
    price: 15000,
    img: "https://i.ibb.co/HT2cTXfW/Chat-GPT-Image-1-de-mar-de-2026-13-24-02.png",
    color: "from-red-500 to-orange-600",
    glow: "rgba(255,69,0,0.5)",
  },
];

// â”€â”€â”€ Custom Hooks â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (val: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// â”€â”€â”€ Optimized Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CharacterStage = ({
  selectedCharImg,
  selectedPetImg,
  isMobile = false,
  isTouch = false,
  charAnim,
  setCurrentView,
  setActiveShopTab,
  setShowNamePlate,
  showNamePlate,
  Friends,
  Newspaper,
  onCrownClick,
  onFinanceClick,
  onAiChatClick,
  onProjectsClick,
  Bot,
  Briefcase,
  CircleDollarSign,
}: {
  selectedCharImg: string;
  selectedPetImg: string;
  isMobile?: boolean;
  isTouch?: boolean;
  charAnim: boolean;
  setCurrentView: (v: ViewId) => void;
  setActiveShopTab: React.Dispatch<
    React.SetStateAction<"characters" | "pets" | null>
  >;
  setShowNamePlate: (v: boolean) => void;
  showNamePlate: boolean;
  Friends: React.ElementType;
  Newspaper: React.ElementType;
  onCrownClick: () => void;
  onFinanceClick: () => void;
  onAiChatClick: () => void;
  onProjectsClick: () => void;
  Bot: React.ElementType;
  Briefcase: React.ElementType;
  CircleDollarSign: React.ElementType;
}) => (
  <motion.div
    initial={{ y: 60, opacity: 0, scale: 0.9 }}
    animate={charAnim ? { y: 0, opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
    className={`relative z-10 flex flex-col items-center w-full ${isMobile ? "px-1" : "h-full justify-center"}`}
  >
    <div
      className={`w-full relative flex flex-col items-center justify-center`}
      style={{
        minHeight: isMobile ? "min(350px, 40dvh)" : "450px",
        paddingTop: isMobile ? "min(45%, 15dvh)" : undefined,
      }}
    >
      {/* Left Action Column (IA + News + Projects) */}
      <div
        className={`absolute left-0 top-0 flex flex-col lg:flex-row items-center gap-4 z-30 transition-all ${isMobile ? "pl-2" : "-translate-x-32 xl:-translate-x-44"}`}
      >
        <SideButton
          icon={Bot}
          color="bg-gradient-to-b from-blue-600/40 to-blue-900/40"
          onClick={onAiChatClick}
        />
        <SideButton icon={Newspaper} onClick={() => setCurrentView("news")} />
        <SideButton
          icon={Briefcase}
          color="bg-gradient-to-b from-gray-600/40 to-gray-900/40"
          onClick={onProjectsClick}
        />
      </div>

      {/* Character/Pet Group */}
      <div className="flex items-end gap-3 sm:gap-4 relative z-10 mt-6 md:mt-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{
            scaleX: 1.2,
            scaleY: 0.8,
            y: 10,
            transition: { type: "spring", stiffness: 1000, damping: 10 },
          }}
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.02, 1],
            transition: {
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            },
          }}
          className="relative mb-2 sm:mb-4 self-end cursor-pointer group w-fit h-fit"
          onClick={() => setActiveShopTab("pets")}
        >
          <img
            src={selectedPetImg}
            alt="Pet"
            className={`object-contain drop-shadow-[0_8px_20px_rgba(56,242,127,0.5)] transition-filter pointer-events-auto w-[130px] h-[130px] sm:w-52 sm:h-52 lg:w-64 lg:h-64`}
            style={
              isMobile ? { maxHeight: "18dvh", maxWidth: "18dvh" } : undefined
            }
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{
            scaleX: 1.1,
            scaleY: 0.9,
            y: 5,
            transition: { type: "spring", stiffness: 1000, damping: 10 },
          }}
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.01, 1],
            transition: {
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            },
          }}
          className="relative w-fit h-fit"
        >
          <img
            src={selectedCharImg}
            alt="Personagem"
            className={`object-contain drop-shadow-[0_20px_60px_rgba(56,242,127,0.4)] relative z-10 pointer-events-auto w-[240px] h-[240px] sm:w-96 sm:h-96 lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px]`}
            style={
              isMobile ? { maxHeight: "35dvh", maxWidth: "35dvh" } : undefined
            }
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Right Action Column (Finance + Friends) */}
      <div
        className={`absolute right-0 top-0 flex flex-col gap-4 z-30 transition-all ${isMobile ? "pr-2" : "translate-x-12 xl:translate-x-16"}`}
      >
        <SideButton
          icon={CircleDollarSign}
          color="bg-linear-to-b from-emerald-600/40 to-emerald-900/40"
          onClick={onFinanceClick}
        />
        <SideButton icon={Friends} onClick={() => setCurrentView("friends")} />
      </div>
    </div>
  </motion.div>
);
const SideButton = ({
  icon: Icon,
  color = "bg-linear-to-b from-[#2d4b7c] to-[#1a2e4d]",
  onClick,
}: {
  icon: any;
  color?: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-12 h-12 ${color} rounded-2xl border-2 border-white/30 shadow-[0_8px_16px_rgba(0,0,0,0.4)] flex items-center justify-center text-white relative overflow-hidden active:scale-95 transition-all`}
  >
    <Icon className="w-6 h-6 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
    <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/10 rounded-t-2xl pointer-events-none" />
  </button>
);

const QuestsPanel = ({
  quests,
  setQuests,
  setCurrentView,
  setIsCreateQuestModalOpen,
  onToggleQuest,
}: {
  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
  setCurrentView: (v: ViewId) => void;
  setIsCreateQuestModalOpen: (o: boolean) => void;
  onToggleQuest: (i: number) => void;
}) => (
  <>
    <div className="flex items-center justify-between mb-2 shrink-0">
      <span className="text-[10px] xl:text-[11px] 2xl:text-[13px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2">
        <Target className="w-3 h-3 xl:w-4 xl:h-4 text-neon-green" /> MISSÕES
      </span>
      <button
        onClick={() => setCurrentView("quests")}
        className="flex items-center gap-1 text-[8px] xl:text-[9px] 2xl:text-[10px] font-black text-neon-green uppercase tracking-widest hover:text-white transition-colors"
      >
        Ver Mais <ChevronRight className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
      </button>
    </div>
    <button
      onClick={() => setIsCreateQuestModalOpen(true)}
      className="w-full mb-6 flex items-center justify-center gap-3 p-4 bg-neon-green/30 border border-neon-green/40 rounded-2xl hover:bg-neon-green/40 transition-all active:scale-95 flex-shrink-0 shadow-[0_8px_25px_rgba(56,242,127,0.2)]"
    >
      <Plus className="w-5 h-5 text-neon-green group-hover:scale-110 transition-transform" />
      <span className="text-[12px] sm:text-[14px] font-black text-neon-green uppercase tracking-widest">
        + NOVA MISSÃO
      </span>
    </button>
    <div className="flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-neon-green/20 hover:scrollbar-thumb-neon-green/40">
      {quests.map((q, i) => (
        <QuestCard
          key={i}
          quest={q}
          index={i}
          onToggle={() => {
            const newQuests = [...quests];
            const target = newQuests[i];
            const wasDone = target.done;
            target.done = !wasDone;
            setQuests(newQuests);
            if (!wasDone) {
              // @ts-ignore
              onToggleQuest(i);
            }
          }}
          onDelete={() => setQuests(quests.filter((_, idx) => idx !== i))}
        />
      ))}
    </div>
  </>
);

const HabitsPanel = ({
  habits,
  setHabits,
  setCurrentView,
  setIsCreateHabitModalOpen,
  setIsReadyHabitsModalOpen,
  setSelectedHabitForTasks,
  setIsHabitTasksModalOpen,
}: {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  setCurrentView: (v: ViewId) => void;
  setIsCreateHabitModalOpen: (o: boolean) => void;
  setIsReadyHabitsModalOpen: (o: boolean) => void;
  setSelectedHabitForTasks: (h: Habit | null) => void;
  setIsHabitTasksModalOpen: (o: boolean) => void;
}) => (
  <>
    <div className="flex items-center justify-between mb-3 shrink-0">
      <p className="text-[10px] xl:text-[11px] 2xl:text-[13px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2">
        <Flame className="w-3 h-3 xl:w-4 xl:h-4 text-orange-400" /> HíBITOS
      </p>
      <button
        onClick={() => setCurrentView("habits")}
        className="flex items-center gap-1 text-[8px] xl:text-[9px] 2xl:text-[10px] font-black text-orange-400 uppercase tracking-widest hover:text-white transition-colors"
      >
        Ver Mais <ChevronRight className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
      </button>
    </div>
    <div className="grid grid-cols-2 gap-3 mb-6 flex-shrink-0">
      <button
        onClick={() => setIsCreateHabitModalOpen(true)}
        className="flex-1 flex items-center justify-center gap-2.5 p-4 bg-orange-500/30 border border-orange-400/50 rounded-2xl hover:bg-orange-500/40 transition-all active:scale-95 flex-shrink-0 shadow-[0_8px_20px_rgba(251,146,60,0.2)]"
      >
        <Plus className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
        <span className="text-[12px] sm:text-[14px] font-black text-orange-400 uppercase tracking-widest">
          + NOVO
        </span>
      </button>
      <button
        onClick={() => setIsReadyHabitsModalOpen(true)}
        className="flex-1 flex items-center justify-center gap-2.5 p-4 bg-neon-yellow/30 border border-neon-yellow/50 rounded-2xl hover:bg-neon-yellow/40 transition-all active:scale-95 flex-shrink-0 shadow-[0_8px_20px_rgba(253,224,71,0.2)]"
      >
        <Eye className="w-5 h-5 text-neon-yellow group-hover:scale-110 transition-transform" />
        <span className="text-[12px] sm:text-[14px] font-black text-neon-yellow uppercase tracking-widest">
          PRONTOS
        </span>
      </button>
    </div>
    <div className="flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-orange-400/20 hover:scrollbar-thumb-orange-400/40">
      {habits.map((h, i) => (
        <div
          key={h.id}
          className="p-3 2xl:p-4 bg-white/5 border border-white/10 rounded-xl group/habit"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] xl:text-[11px] 2xl:text-[12px] font-black uppercase text-white/80">
              {h.title}
            </span>
            <div className="flex items-center gap-2">
              {h.tasks && h.tasks.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHabitForTasks(h);
                    setIsHabitTasksModalOpen(true);
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <Eye className="w-3 h-3 2xl:w-4 2xl:h-4 text-neon-yellow" />
                </button>
              )}
              <div className="flex items-center gap-1">
                <Flame className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 text-orange-400" />
                <span className="text-[10px] 2xl:text-[11px] font-black text-orange-400">
                  {h.streak}d
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHabits(habits.filter((habit) => habit.id !== h.id));
                }}
                className="text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover/habit:opacity-100"
              >
                <Trash2 className="w-3 h-3 2xl:w-4 2xl:h-4" />
              </button>
            </div>
          </div>
          <div className="h-1 2xl:h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(h.streak / h.max) * 100}%` }}
              className={`h-full bg-linear-to-r ${h.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  </>
);

const TrainingPanel = ({
  weeklyTrainings,
  setCurrentView,
  handleEditTraining,
  handleDeleteTraining,
}: {
  weeklyTrainings: any[];
  setCurrentView: (v: any) => void;
  handleEditTraining: (i: number) => void;
  handleDeleteTraining: (i: number) => void;
}) => {
  const completedCount = weeklyTrainings.filter((t) => t.done).length;
  const daysOrder = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 shrink-0 px-1">
        <p className="text-[11px] xl:text-[12px] 2xl:text-[14px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2">
          <Swords className="w-4 h-4 text-neon-green" /> CRONOGRAMA DE COMBATE
        </p>
        <button
          onClick={() => setCurrentView("training")}
          className="flex items-center gap-1 text-[9px] font-black text-neon-green uppercase tracking-widest hover:text-white transition-colors"
        >
          Expandir <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <button
        onClick={() => setCurrentView("training")}
        className="w-full mb-4 flex items-center justify-center gap-2 p-4 bg-neon-green/10 border border-neon-green/30 rounded-[1.5rem] hover:bg-neon-green/20 transition-all group shrink-0 shadow-[0_4px_15px_rgba(56,242,127,0.1)]"
      >
        <Plus className="w-4 h-4 text-neon-green group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-black text-neon-green uppercase tracking-widest">
          + CRIAR NOVO TREINO
        </span>
      </button>

      <div className="p-4 bg-neon-green/5 border border-neon-green/20 rounded-2xl mb-4 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] font-black text-neon-green uppercase tracking-widest">
            Evoluí§í£o Semanal
          </p>
          <span className="text-[10px] font-black text-neon-green">
            {completedCount}/{weeklyTrainings.length}
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width:
                weeklyTrainings.length > 0
                  ? `${(completedCount / weeklyTrainings.length) * 100}%`
                  : "0%",
            }}
            transition={{ duration: 1 }}
            className="h-full bg-linear-to-r from-neon-green to-neon-yellow rounded-full shadow-[0_0_12px_rgba(56,242,127,0.5)]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-6 scrollbar-thin scrollbar-thumb-neon-green/10 hover:scrollbar-thumb-neon-green/30">
        {daysOrder.map((dayCode) => {
          const dayTrainings = weeklyTrainings.filter((t) => t.day === dayCode);
          if (dayTrainings.length === 0) return null;

          return (
            <div key={dayCode} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] font-mono">
                  {dayCode}
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              {dayTrainings.map((t) => {
                const realIndex = weeklyTrainings.findIndex((wt) => wt === t);
                const totalSeries = t.exercises.reduce(
                  (acc: number, ex: any) => acc + (ex.series || 0),
                  0,
                );
                return (
                  <div
                    key={realIndex}
                    className={`p-4 rounded-2xl border transition-all group/card ${t.done ? "bg-neon-green/5 border-neon-green/30" : "bg-white/3 border-white/5 hover:border-white/10"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className={`text-xs font-black uppercase truncate ${t.done ? "text-neon-green" : "text-white/90"}`}
                          >
                            {t.name}
                          </p>
                          {t.done && (
                            <CheckCircle2 className="w-3 h-3 text-neon-green" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[9px] text-white/30 font-bold">
                            <Clock className="w-2.5 h-2.5" /> {t.duration}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[8px] font-black text-white/40 uppercase">
                              {t.exercises.length} EXERCíCIOS
                            </span>
                            <span className="text-[8px] font-black text-neon-green/60 uppercase">
                              {totalSeries} Sí‰RIES TOTAIS
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-10 sm:group-hover/card:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditTraining(realIndex)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-neon-yellow"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTraining(realIndex)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {weeklyTrainings.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Swords className="w-8 h-8 text-white/10" />
            </div>
            <p className="text-xs font-bold text-white/20 uppercase tracking-widest">
              Nenhum protocolo ativo
            </p>
            <p className="text-[10px] text-white/10 mt-2 italic">
              Dica: Planeje seu cronograma semanal para maximizar ganhos de XP.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const RankingPanel = ({
  setCurrentView,
  rankingData,
  playerStats,
}: {
  setCurrentView: (v: ViewId) => void;
  rankingData: RankingUser[];
  playerStats: PlayerStats;
}) => {
  const myRank =
    rankingData.findIndex((r) => r.id === auth.currentUser?.uid) + 1;
  const myXp = playerStats.xp;

  return (
    <>
      <div className="flex items-center justify-between mb-3 shrink-0">
        <p className="text-[10px] xl:text-[11px] 2xl:text-[13px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2">
          <Trophy className="w-3 h-3 xl:w-4 xl:h-4 text-neon-yellow" /> RANK
        </p>
        <button
          onClick={() => setCurrentView("ranking")}
          className="flex items-center gap-1 text-[8px] xl:text-[9px] 2xl:text-[10px] font-black text-neon-yellow uppercase tracking-widest hover:text-white transition-colors"
        >
          Ver Mais <ChevronRight className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
        </button>
      </div>
      <div className="text-center p-4 2xl:p-6 bg-linear-to-b from-neon-yellow/10 to-transparent border border-neon-yellow/20 rounded-2xl mb-3 shrink-0">
        <div className="text-3xl 2xl:text-4xl font-black text-neon-yellow">
          #{myRank > 0 ? myRank : "?"}
        </div>
        <p className="text-[9px] xl:text-[10px] 2xl:text-[12px] font-black text-white/40 uppercase tracking-widest">
          Seu Rank Global
        </p>
        <p className="text-[10px] xl:text-[11px] 2xl:text-[13px] font-black text-neon-green mt-1">
          {myRank > 0 && myRank <= 3
            ? "ðŸ† Elite do Olimpo"
            : "âš¡ Divisí£o Principal"}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-neon-yellow/20 hover:scrollbar-thumb-neon-yellow/40">
        {rankingData.slice(0, 10).map((r, i) => {
          const isMe = r.id === auth.currentUser?.uid;
          const rankNum = i + 1;
          let badge = "";
          if (rankNum === 1) badge = "ðŸ‘‘";
          else if (rankNum === 2) badge = "âš¡";
          else if (rankNum === 3) badge = "ðŸ”¥";
          else if (isMe) badge = "ðŸŽ¯";

          return (
            <div
              key={r.id}
              className={`flex items-center gap-3 px-3 py-2 2xl:px-4 2xl:py-3 rounded-xl border ${isMe ? "border-neon-green/30 bg-neon-green/5" : rankNum <= 3 ? "border-neon-yellow/20 bg-neon-yellow/5" : "border-white/5"}`}
            >
              <span
                className={`text-[10px] xl:text-[11px] 2xl:text-xs font-black w-6 ${rankNum <= 3 ? "text-neon-yellow" : isMe ? "text-neon-green" : "text-white/20"}`}
              >
                #{rankNum}
              </span>
              <span className="text-base 2xl:text-lg leading-none">
                {badge}
              </span>
              <span
                className={`flex-1 text-[10px] xl:text-[11px] 2xl:text-[12px] font-black uppercase ${isMe ? "text-neon-green" : ""}`}
              >
                {r.name}
              </span>
              <span className="text-[9px] xl:text-[10px] 2xl:text-[11px] text-white/40">
                {(r.xp / 1000).toFixed(1)}k XP
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ArsenalPanel = ({
  arsenalSkills,
  toggleSkill,
  arsenalBuffs,
  toggleBuff,
  playerStats,
}: {
  arsenalSkills: Skill[];
  toggleSkill: (i: number) => void;
  arsenalBuffs: Buff[];
  toggleBuff: (i: number) => void;
  playerStats: PlayerStats;
}) => (
  <>
    <div className="mb-4">
      <p className="text-[8px] xl:text-[9px] 2xl:text-[10px] font-black uppercase tracking-widest text-white/70 mb-3 flex items-center gap-1.5">
        <Zap className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-neon-yellow" />{" "}
        Habilidades Equipadas
      </p>
      <div className="grid grid-cols-4 gap-2 2xl:gap-3">
        {arsenalSkills.map((s, i) => (
          <SkillSlot
            key={i}
            skill={s}
            index={i}
            onClick={() => toggleSkill(i)}
          />
        ))}
      </div>
    </div>
    <div className="mb-4">
      <p className="text-[8px] xl:text-[9px] 2xl:text-[10px] font-black uppercase tracking-widest text-white/70 mb-3 flex items-center gap-1.5">
        <Sparkles className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-blue-400" /> Buffs
        Conquistados
      </p>
      <div className="space-y-2 2xl:space-y-3">
        {arsenalBuffs.map((b, i) => (
          <div
            key={i}
            onClick={() => b.unlocked && toggleBuff(i)}
            className={`flex items-start gap-3 p-3 2xl:p-4 rounded-xl border transition-all ${
              b.unlocked
                ? b.active
                  ? "bg-white/[0.04] border-white/20 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                  : "bg-white/[0.02] border-white/10 cursor-pointer hover:bg-white/[0.04]"
                : "bg-black/40 border-white/5 opacity-40 grayscale cursor-not-allowed"
            }`}
          >
            <span
              className={`text-xl 2xl:text-2xl leading-none ${!b.unlocked ? "opacity-30" : ""}`}
            >
              {typeof b.icon === "string" ? (
                b.icon
              ) : (
                <b.icon className="w-6 h-6" />
              )}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p
                  className={`text-[10px] xl:text-[11px] 2xl:text-[13px] font-black uppercase ${b.unlocked ? "text-white" : "text-white/50"}`}
                >
                  {b.name}
                </p>
                {!b.unlocked && <Lock className="w-2.5 h-2.5 text-white/40" />}
              </div>
              <p className="text-[8px] xl:text-[9px] 2xl:text-[10px] text-white/50 mt-0.5">
                {b.desc}
              </p>
            </div>
            {b.unlocked && b.active && (
              <div className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-neon-green mt-1 shadow-[0_0_10px_rgba(56,242,127,0.8)] animate-pulse" />
            )}
            {!b.unlocked && (
              <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                <span className="text-[7px] font-black text-white/50 uppercase tracking-tighter">
                  Bloqueado
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    <div className="p-3 2xl:p-4 bg-neon-yellow/5 border border-neon-yellow/20 rounded-xl">
      <p className="text-[8px] xl:text-[9px] 2xl:text-[10px] font-black uppercase text-neon-yellow/60 mb-2 flex items-center gap-1">
        <Crown className="w-2.5 h-2.5 xl:w-3 xl:h-3" /> Prí³xima Evoluí§í£o
      </p>
      <div className="flex items-center gap-3">
        <span className="text-2xl 2xl:text-3xl">âš¡</span>
        <div className="flex-1">
          <p className="text-[10px] xl:text-[12px] 2xl:text-[14px] font-black text-neon-yellow uppercase">
            Ní­vel {playerStats.level + 1}
          </p>
          <div className="flex items-center gap-1.5 mt-1 2xl:mt-2">
            <div className="flex-1 h-1 2xl:h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(playerStats.xp / playerStats.xpMax) * 100}%`,
                }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="h-full bg-neon-yellow rounded-full"
              />
            </div>
            <span className="text-[7px] xl:text-[8px] 2xl:text-[9px] text-neon-yellow/60">
              {Math.floor(playerStats.xp)}/{playerStats.xpMax} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

type Exercise = {
  name: string;
  series: number;
  kg: number;
  reps: number;
  done: boolean;
};
type Training = {
  day: string;
  name: string;
  exercises: Exercise[];
  duration: string;
  done: boolean;
};

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface PlayerStats {
  name: string;
  level: number;
  class: string;
  xp: number;
  xpMax: number;
  hp: number;
  hpMax: number;
  gold: number;
  questsCompleted?: number;
  habitsCompleted?: number;
  trainingsCompleted?: number;
  victories?: number;
  defeats?: number;
}

interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
  color: string;
  unlocked: boolean;
  active?: boolean;
}
interface Quest {
  title: string;
  desc: string;
  xp: number;
  done: boolean;
  streak?: number;
  repetition?: string;
  days?: string[];
  weeklyDays?: number;
  monthlyInterval?: number;
  goalAmount?: number;
  goalUnit?: string;
  goalHours?: number;
  goalMinutes?: number;
  goalSeconds?: number;
  timeInterval?: string;
}
interface Habit {
  id: number;
  title: string;
  name: string; // Unified with name usage
  streak: number;
  max: number;
  color: string;
  desc?: string;
  time?: string;
  frequency?: string;
  tasks?: { title: string; done: boolean }[];
  completed: number[];
}

interface Buff {
  id: number;
  name: string;
  desc: string;
  icon: React.ElementType | string;
  unlocked: boolean;
  active: boolean;
  price?: number;
}

interface RankingUser {
  id: string;
  uid?: string; // Compatibility with Firebase
  name: string;
  level: number;
  xp: number;
  class: string;
  lastSeen?: any;
  photoURL?: string;
  status?: string;
  img?: string;
}

interface NewsArticle {
  id: number;
  title: string;
  category: string;
  summary: string;
  date: string;
  image: string;
  readTime: string;
}

interface WeeklyTaskItem {
  id: number;
  title: string;
  done: boolean;
  priority: "Normal" | "Atení§í£o" | "Urgente";
}

interface WeeklyDayTasks {
  day: string;
  tasks: WeeklyTaskItem[];
}

interface PomodoroTask {
  id: number;
  title: string;
  done: boolean;
  priority?: "Normal" | "Atení§í£o" | "Urgente";
  targetSessions: number;
  completedSessions: number;
  targetDays?: number;
}
type PanelId =
  | "quests"
  | "habits"
  | "training"
  | "ranking"
  | "arsenal"
  | "friends"
  | null;
type ViewId =
  | "dashboard"
  | "quests"
  | "habits"
  | "training"
  | "ranking"
  | "weeklyChecklist"
  | "kronos"
  | "friends"
  | "news"
  | "battle"
  | "finance"
  | "projects"
  | "ai";

interface BattleTask {
  id: number;
  title: string;
  done: boolean;
  timeSeconds: number;
  stats?: {
    series: number;
    kg: number;
    reps: number;
  };
}
type BattleMode = "rotina" | "habitos" | "treinos";
interface FinancialTransaction {
  id: string;
  type: "entrada" | "saida";
  value: number;
  category: string;
  desc: string;
  date: string;
  paymentMethod: string;
}
interface CreditCardBill {
  id: string;
  bankName: string;
  value: number;
  dueDate: number; // day of month
  status: "Pago" | "Pendente";
}
interface FinancialGoal {
  id: string;
  title: string;
  target: number;
  current: number;
}

// Project Management Types
interface TaskChecklist {
  id: string;
  text: string;
  done: boolean;
}
interface TaskComment {
  id: string;
  text: string;
  date: string;
}
interface ProjectTask {
  id: string;
  title: string;
  desc: string;
  priority: "Baixa" | "Média" | "Alta" | "Urgente";
  column: "Ideias" | "A Fazer" | "Em Progresso" | "Em Revisí£o" | "Concluí­do";
  deadline: string;
  tags: string[];
  checklist: TaskChecklist[];
  comments: TaskComment[];
  createdAt: string;
}
interface Project {
  id: string;
  name: string;
  desc: string;
  deadline: string;
  priority: "Baixa" | "Média" | "Alta" | "Urgente";
  color: string;
  icon: string;
  tasks: ProjectTask[];
  createdAt: string;
  goal: string;
}

// â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function XPBar({
  current,
  max,
  label,
}: {
  current: number;
  max: number;
  label: string;
}) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1.5">
          {label === "Vida" && (
            <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500/20" />
          )}
          <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
            {label}
          </span>
        </div>
        <span className="text-[9px] font-black text-neon-green">
          {current.toLocaleString()}
          <span className="text-white/20">/{max.toLocaleString()}</span>
        </span>
      </div>
      <div
        className={`bg-white/5 rounded-full overflow-hidden border border-white/5 ${label === "Vida" ? "h-3" : "h-2"}`}
      >
        <div
          style={{ width: `${pct}%` }}
          className={`h-full rounded-full bg-linear-to-r ${label === "Vida" ? "from-red-500 to-pink-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]" : "from-neon-green to-neon-yellow shadow-[0_0_8px_rgba(56,242,127,0.6)]"}`}
        />
      </div>
    </div>
  );
}

function QuestCard({
  quest,
  index,
  onToggle,
  onDelete,
}: {
  quest: Quest;
  index: number;
  onToggle: () => void;
  onDelete?: () => void;
  key?: any;
}) {
  const done = quest.done;
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.07 * index }}
      onClick={onToggle}
      className={`p-3 2xl:p-4 rounded-xl border cursor-pointer transition-all ${done ? "bg-neon-green/5 border-neon-green/20" : "bg-white/3 border-white/5 active:bg-white/[0.06]"}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 w-4 h-4 2xl:w-5 2xl:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${done ? "bg-neon-green border-neon-green shadow-[0_0_10px_rgba(56,242,127,0.6)]" : "border-white bg-black/40 group-hover:border-neon-green/50"}`}
        >
          {done && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 bg-black rounded-full"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-[11px] xl:text-[12px] 2xl:text-[14px] font-black uppercase tracking-tight leading-tight ${done ? "text-white/40 line-through" : "text-white"}`}
          >
            {quest.title}
          </p>
          <p className="text-[9px] xl:text-[10px] 2xl:text-[12px] text-white/60 mt-0.5 font-bold leading-tight">
            {quest.desc}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-[9px] xl:text-[10px] 2xl:text-[12px] font-black text-neon-yellow">
            +{quest.xp} XP
          </span>
          <div className="flex items-center gap-2">
            {quest.streak && (
              <div className="flex items-center gap-0.5">
                <Flame className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 text-orange-400" />
                <span className="text-[8px] xl:text-[9px] 2xl:text-[10px] font-black text-orange-400">
                  {quest.streak}d
                </span>
              </div>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="text-white/20 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3 h-3 2xl:w-4 2xl:h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const SKILL_ICONS: Record<string, any> = {
  Target,
  Zap,
  Shield,
  Sword,
  Crown,
  Trophy,
  Swords,
  Sparkles,
  "Foco Total": Target,
  "Força Mental": Zap,
  Escudo: Shield,
  Lamina: Sword,
  Liderança: Crown,
  Conquista: Trophy,
  Batalha: Swords,
  Magia: Sparkles,
};

function SkillSlot({
  skill,
  index,
  onClick,
}: {
  skill: Skill;
  index: number;
  onClick?: () => void;
  key?: number;
}) {
  let Icon = skill.icon;

  // If Icon is an object (mangled by localStorage) or a string name
  if (typeof Icon === "string" || (typeof Icon === "object" && Icon !== null)) {
    const iconName =
      typeof Icon === "string" ? Icon : (Icon as any).name || skill.name;
    // Fallback to mapping or a default icon
    Icon =
      (SKILL_ICONS as any)[iconName] ||
      (SKILL_ICONS as any)[skill.name.split(" ")[0]] ||
      Sparkles;
  }

  if (!Icon || typeof Icon !== "function") Icon = Sparkles;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.05 * index, type: "spring" }}
      onClick={onClick}
      className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${skill.unlocked ? `bg-linear-to-br from-white/5 to-white/[0.02] ${skill.color} ${skill.active ? "border-opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105" : "border-opacity-30"} hover:scale-105 active:scale-95` : "bg-white/[0.02] border-white/5 opacity-30"}`}
    >
      {skill.unlocked && (
        <div
          className={`absolute inset-0 rounded-xl ${skill.active ? "opacity-20" : "opacity-0"} transition-opacity ${skill.color.replace("border-", "bg-")}`}
        />
      )}

      {skill.active && (
        <div className="absolute top-1 left-1 z-20">
          <CheckCircle2 className="w-3 h-3 text-neon-green drop-shadow-md" />
        </div>
      )}

      <Icon
        className={`w-5 h-5 ${skill.unlocked ? (skill.active ? "text-white" : "text-white/40") : "text-white/20"} transition-colors`}
      />
      <span
        className={`text-[7px] font-black uppercase tracking-wider text-center leading-none px-1 transition-colors ${skill.active ? "text-white" : "text-white/80"}`}
      >
        {skill.name}
      </span>
      {skill.unlocked && (
        <div
          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-bg-dark transition-colors ${skill.active ? "bg-neon-yellow" : "bg-white/20"}`}
        >
          <span
            className={`text-[6px] font-black ${skill.active ? "text-black" : "text-white/70"}`}
          >
            {skill.level}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// â”€â”€â”€ Mobile Bottom Sheet â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[9998] lg:hidden backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0a0a0a] border-t border-white/10 rounded-t-[2.5rem] max-h-[90vh] flex flex-col lg:hidden shadow-[0_-20px_60px_rgba(0,0,0,1)]"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-white/5">
              <span className="text-xs font-black uppercase tracking-widest text-white">
                {title}
              </span>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col px-5 pt-4 pb-12 space-y-5">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// â”€â”€â”€ Full View Components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FullViewWrapper({
  title,
  icon: Icon,
  color,
  onClose,
  children,
}: {
  title: string;
  icon: any;
  color: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Corner Decors */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-xl pointer-events-none z-0" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-xl pointer-events-none z-0" />

      {/* Header */}
      <header className="p-6 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <button
            onClick={onClose}
            className="group flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-neon-yellow rotate-180" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white">
              VOLTAR
            </span>
          </button>
          <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border-2 border-opacity-50 ${color} bg-black/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white uppercase leading-none">
                {title}
              </h2>
              <p className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.3em] mt-1 opacity-40">
                SISTEMA KRONOS // Mí“DULO_ESPECíFICO
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-none relative z-10">
        <div className="max-w-6xl mx-auto w-full pb-20">{children}</div>
      </div>

      {/* Ambient Footer Decor */}
      <div className="p-4 border-t border-white/5 bg-black/20 flex justify-center items-center gap-8 opacity-20">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
          <span className="text-[7px] font-black tracking-[0.4em] text-white uppercase">
            AMBIENTE DE ALTA PERFORMANCE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
// â”€â”€â”€ Create Quest Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CreateQuestModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quest: Omit<Quest, "done">) => void;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // 1ï¸âƒ£ Repetií§í£o
  const [repetition, setRepetition] = useState("Diária");
  const [days, setDays] = useState<string[]>([
    "SEG",
    "TER",
    "QUA",
    "QUI",
    "SEX",
    "SíB",
    "DOM",
  ]);
  const [weeklyDays, setWeeklyDays] = useState<number>(3);
  const [monthlyInterval, setMonthlyInterval] = useState<number>(1);

  // 2ï¸âƒ£ Meta
  const [goalAmount, setGoalAmount] = useState<number | "">("");
  const [goalUnit, setGoalUnit] = useState("Minutos");
  const [goalHours, setGoalHours] = useState<number | "">("");
  const [goalMinutes, setGoalMinutes] = useState<number | "">("");
  const [goalSeconds, setGoalSeconds] = useState<number | "">("");

  // 3ï¸âƒ£ Intervalo de Tempo
  const [timeInterval, setTimeInterval] = useState("A qualquer momento");

  const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SíB", "DOM"];
  const timeOptions = ["A qualquer momento", "Manhí£", "Tarde", "Noite"];
  const unitOptions = ["Segundos", "Minutos", "Horas"];

  const handleDayToggle = (day: string) => {
    if (days.includes(day)) setDays(days.filter((d) => d !== day));
    else setDays([...days, day]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    // Validaí§í£o da Meta (Obrigatí³ria)
    if (goalUnit !== "Horas" && (!goalAmount || goalAmount <= 0)) return;
    if (goalUnit === "Horas" && !goalHours && !goalMinutes && !goalSeconds)
      return;

    onSave({
      title,
      desc,
      xp: 50,
      repetition,
      days: repetition === "Diária" ? days : undefined,
      weeklyDays: repetition === "Semanal" ? weeklyDays : undefined,
      monthlyInterval: repetition === "Mensal" ? monthlyInterval : undefined,
      goalAmount:
        goalAmount !== "" && goalUnit !== "Horas"
          ? Number(goalAmount)
          : undefined,
      goalUnit:
        goalAmount !== "" || goalUnit === "Horas" ? goalUnit : undefined,
      goalHours:
        goalUnit === "Horas" && goalHours !== ""
          ? Number(goalHours)
          : undefined,
      goalMinutes:
        goalUnit === "Horas" && goalMinutes !== ""
          ? Number(goalMinutes)
          : undefined,
      goalSeconds:
        goalUnit === "Horas" && goalSeconds !== ""
          ? Number(goalSeconds)
          : undefined,
      timeInterval,
    });

    // Reset
    setTitle("");
    setDesc("");
    setRepetition("Diária");
    setDays(weekDays);
    setWeeklyDays(3);
    setMonthlyInterval(1);
    setGoalAmount("");
    setGoalUnit("Minutos");
    setGoalHours("");
    setGoalMinutes("");
    setGoalSeconds("");
    setTimeInterval("A qualquer momento");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-2000"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl z-2001 overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green to-neon-yellow z-10" />

            {/* Banner & Header */}
            <div className="p-6 pb-4 border-b border-white/5 relative bg-black/40">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Target className="w-24 h-24" />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <h3 className="text-2xl font-black uppercase italic tracking-wider">
                  Nova Missão
                </h3>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto scrollbar-thin flex-1 space-y-6">
              <form
                id="quest-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* DADOS BíSICOS */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-neon-green" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-neon-green">
                      Alvo Principal
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Título da Missão (Ex: Treino de Força)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Descrição / Contexto Tático (Opcional)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                    />
                  </div>
                </div>

                {/* 1️⃣ REPETIÇÃO */}
                <div className="space-y-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-neon-yellow" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-neon-yellow">
                      1. Repetição
                    </span>
                  </div>
                  <div className="flex bg-black/50 p-1 rounded-xl border border-white/5">
                    {["Diária", "Semanal", "Mensal"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setRepetition(opt)}
                        className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${repetition === opt ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Diária Days */}
                  {repetition === "Diária" && (
                    <div className="flex justify-between gap-1 pt-2">
                      {weekDays.map((day) => {
                        const active = days.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleDayToggle(day)}
                            className={`flex-1 aspect-square flex items-center justify-center rounded-lg text-[9px] font-black transition-all ${active ? "bg-neon-green/20 text-neon-green border border-neon-green/30" : "bg-white/5 text-white/30 border border-white/5 hover:bg-white/10"}`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Semanal Inputs */}
                  {repetition === "Semanal" && (
                    <div className="pt-2">
                      <label className="block text-[9px] font-bold text-white/40 uppercase mb-1">
                        Dias por Semana
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="7"
                        value={weeklyDays}
                        onChange={(e) => setWeeklyDays(Number(e.target.value))}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-neon-green"
                      />
                    </div>
                  )}

                  {/* Mensal Inputs */}
                  {repetition === "Mensal" && (
                    <div className="pt-2">
                      <label className="block text-[9px] font-bold text-white/40 uppercase mb-1">
                        A cada X meses
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={monthlyInterval}
                        onChange={(e) =>
                          setMonthlyInterval(Number(e.target.value))
                        }
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-neon-green"
                      />
                    </div>
                  )}
                </div>

                {/* 2ï¸âƒ£ META */}
                <div className="space-y-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                      2. Meta Obrigatória
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <select
                      value={goalUnit}
                      onChange={(e) => setGoalUnit(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-3 text-sm font-bold focus:outline-none focus:border-blue-400 appearance-none text-white"
                    >
                      {unitOptions.map((u) => (
                        <option key={u} value={u} className="text-black">
                          {u}
                        </option>
                      ))}
                    </select>

                    {goalUnit !== "Horas" ? (
                      <input
                        type="number"
                        min="1"
                        value={goalAmount}
                        onChange={(e) =>
                          setGoalAmount(
                            e.target.value ? Number(e.target.value) : "",
                          )
                        }
                        placeholder="Quantidade"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-3 text-sm font-bold focus:outline-none focus:border-blue-400 text-center"
                      />
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[8px] font-bold text-white/30 uppercase mb-1">
                            Horas
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={goalHours}
                            onChange={(e) =>
                              setGoalHours(
                                e.target.value ? Number(e.target.value) : "",
                              )
                            }
                            placeholder="0"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-blue-400 text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-white/30 uppercase mb-1">
                            Minutos
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={goalMinutes}
                            onChange={(e) =>
                              setGoalMinutes(
                                e.target.value ? Number(e.target.value) : "",
                              )
                            }
                            placeholder="0"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-blue-400 text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-white/30 uppercase mb-1">
                            Segundos
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={goalSeconds}
                            onChange={(e) =>
                              setGoalSeconds(
                                e.target.value ? Number(e.target.value) : "",
                              )
                            }
                            placeholder="0"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-blue-400 text-center"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3ï¸âƒ£ INTERVALO DE TEMPO */}
                <div className="space-y-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-purple-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                      3. Intervalo de Tempo
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {timeOptions.map((timeOpt) => (
                      <button
                        key={timeOpt}
                        type="button"
                        onClick={() => setTimeInterval(timeOpt)}
                        className={`py-2.5 px-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${timeInterval === timeOpt ? "bg-purple-500/20 border-purple-500/50 text-purple-400" : "bg-black/50 border-white/5 text-white/40 hover:border-white/20"}`}
                      >
                        {timeOpt}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-white/5 bg-black/40">
              <button
                form="quest-form"
                type="submit"
                className="w-full bg-neon-green text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#2fe073] hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(56,242,127,0.3)] hover:shadow-[0_0_30px_rgba(56,242,127,0.5)]"
              >
                <Target className="w-5 h-5" />
                Confirmar Missão
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// â”€â”€â”€ Create Habit Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CreateHabitModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: Omit<Habit, "id" | "streak">) => void;
}) {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("Dií¡rio");
  const [time, setTime] = useState("");
  const [difficulty, setDifficulty] = useState(30);
  const [subTasks, setSubTasks] = useState<string[]>([""]);

  const addSubTask = () => setSubTasks([...subTasks, ""]);
  const updateSubTask = (index: number, val: string) => {
    const newTasks = [...subTasks];
    newTasks[index] = val;
    setSubTasks(newTasks);
  };
  const removeSubTask = (index: number) => {
    if (subTasks.length > 1) {
      setSubTasks(subTasks.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    let color = "from-neon-green to-blue-400";
    if (difficulty > 21) color = "from-orange-500 to-red-500";
    else if (difficulty > 7) color = "from-purple-500 to-blue-500";

    onSave({
      title,
      name: title,
      max: difficulty,
      color,
      time: time || undefined,
      frequency,
      desc: "Hí¡bito personalizado do sistema.",
      tasks: subTasks
        .filter((t) => t.trim() !== "")
        .map((t) => ({ title: t, done: false })),
      completed: [],
    });

    setTitle("");
    setFrequency("Dií¡rio");
    setTime("");
    setDifficulty(30);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-2000"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl z-2001 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green to-neon-yellow" />
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase italic">
                  Novo Hábito
                </h3>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    Nome do Hábito
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Leitura Matinal"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                      Frequência
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors appearance-none text-white"
                    >
                      <option value="Diário" className="text-black">
                        Diário
                      </option>
                      <option value="Semanal" className="text-black">
                        Semanal
                      </option>
                      <option value="Mensal" className="text-black">
                        Mensal
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                      Horário (Opcional)
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[12px] font-bold focus:outline-none focus:border-neon-green transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    Meta (Dias)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40">
                    Itens do Pacote
                  </label>
                  {subTasks.map((task, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => updateSubTask(idx, e.target.value)}
                        placeholder={`Hábito ${idx + 1}`}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-neon-green transition-colors"
                      />
                      {subTasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubTask(idx)}
                          className="p-2 text-red-500/50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSubTask}
                    className="w-full py-2 bg-white/5 border border-dashed border-white/10 rounded-xl text-[10px] font-black flex justify-center items-center gap-2 text-white/40 hover:text-white transition-all"
                  >
                    <Plus className="w-3 h-3" /> Adicionar Hábito ao Pacote
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-neon-green text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#2fe073] transition-colors flex justify-center items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Confirmar Hábito
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// â”€â”€â”€ Ready Habits Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ReadyHabitsModal({
  isOpen,
  onClose,
  onAdd,
  canAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: Omit<Habit, "id" | "streak">) => void;
  canAdd: boolean;
}) {
  const readyHabits = [
    {
      title: "Madrugada de Ferro",
      name: "Madrugada de Ferro",
      desc: "Acordar às 05:00 AM para dominar o dia com foco máximo.",
      max: 30,
      color: "from-orange-500 to-red-500",
      frequency: "Diário",
      time: "05:00 AM",
      tasks: [
        { title: "Acordar 05:00", done: false },
        { title: "Banho Gelado", done: false },
        { title: "Leitura", done: false },
      ],
      completed: [],
    },
    {
      title: "Monge Digital",
      name: "Monge Digital",
      desc: "Zero redes sociais e distrações até o meio-dia.",
      max: 21,
      color: "from-purple-500 to-blue-500",
      frequency: "Diário",
      time: "08:00 AM",
      tasks: [
        { title: "Foco Total", done: false },
        { title: "Sem Redes Sociais", done: false },
        { title: "Deep Work", done: false },
      ],
      completed: [],
    },
    {
      title: "Corpo Blindado",
      name: "Corpo Blindado",
      desc: "Sessão de treinamento de alta intensidade.",
      max: 30,
      color: "from-neon-green to-blue-400",
      frequency: "Diário",
      time: "06:00 PM",
      tasks: [
        { title: "Musculação", done: false },
        { title: "Corrida", done: false },
        { title: "Proteína", done: false },
      ],
      completed: [],
    },
    {
      title: "Mente de Aço",
      name: "Mente de Aço",
      desc: "30 minutos de meditação profunda ou leitura técnica.",
      max: 21,
      color: "from-blue-400 to-indigo-500",
      frequency: "Diário",
      time: "10:00 PM",
      tasks: [
        { title: "Meditação", done: false },
        { title: "Journaling", done: false },
        { title: "Estudo", done: false },
      ],
      completed: [],
    },
    {
      title: "Rito do Gelo",
      name: "Rito do Gelo",
      desc: "Banho gelado ao acordar para choque térmico regenerador.",
      max: 15,
      color: "from-cyan-400 to-blue-600",
      frequency: "Diário",
      time: "06:30 AM",
      tasks: [
        { title: "Respiração", done: false },
        { title: "Imersão", done: false },
        { title: "Secagem", done: false },
      ],
      completed: [],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-3000"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] z-3001 overflow-hidden max-h-[80vh] flex flex-col"
          >
            <div className="p-8 overflow-y-auto scrollbar-thin">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-black text-neon-yellow uppercase tracking-widest mb-1">
                    PROTOCOLO KRONOS
                  </p>
                  <h3 className="text-2xl font-black uppercase italic">
                    Hábitos de Elite
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white/40" />
                </button>
              </div>

              <div className="space-y-4">
                {readyHabits.map((hb, i) => (
                  <div
                    key={i}
                    className="group p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-neon-yellow/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-black uppercase italic group-hover:text-neon-yellow transition-colors">
                        {hb.title}
                      </h4>
                      <button
                        onClick={() => {
                          if (!canAdd) {
                            alert(
                              "Protocolo Ativo: Você jí¡ possui hí¡bitos em andamento. Conclua a batalha atual para instalar um novo protocolo.",
                            );
                            return;
                          }
                          onAdd(hb);
                          onClose();
                        }}
                        className={`px-3 py-1 text-black text-[9px] font-black uppercase rounded-lg transition-all ${canAdd ? "bg-neon-yellow hover:scale-110 active:scale-95" : "bg-white/10 text-white/20 cursor-not-allowed"}`}
                      >
                        {canAdd ? "Instalar" : "Bloqueado"}
                      </button>
                    </div>
                    <p className="text-[11px] text-white/40 font-bold leading-relaxed mb-4">
                      {hb.desc}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[7px] font-black text-white/20 uppercase">
                          DURAÇÃO
                        </span>
                        <span className="text-[10px] font-black text-white/70">
                          {hb.max} DIAS
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7px] font-black text-white/20 uppercase">
                          FREQUÊNCIA
                        </span>
                        <span className="text-[10px] font-black text-white/70">
                          {hb.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Habit Tasks Modal ───
function HabitTasksModal({
  habit,
  isOpen,
  onClose,
}: {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!habit || !habit.tasks) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[4000]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-[2rem] z-[4001] overflow-hidden shadow-2xl"
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${habit.color}`} />
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                    Itens do Pacote
                  </p>
                  <h3 className="text-xl font-black uppercase italic text-white leading-tight">
                    {habit.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {habit.tasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white/[0.05] border border-white/10 rounded-xl"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${task.done ? "bg-neon-green border-neon-green" : "border-white bg-black/40"}`}
                    >
                      {task.done && (
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-black uppercase tracking-tight ${task.done ? "text-white/40 line-through" : "text-white"}`}
                    >
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Fechar Protocolo
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Progress Report Modal ───
function ProgressReportModal({
  isOpen,
  onClose,
  stats,
}: {
  isOpen: boolean;
  onClose: () => void;
  stats: any;
}) {
  const activityData = [
    { name: "Seg", value: 40 },
    { name: "Ter", value: 65 },
    { name: "Qua", value: 45 },
    { name: "Qui", value: 90 },
    { name: "Sex", value: 55 },
    { name: "Sáb", value: 30 },
    { name: "Dom", value: 70 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[10000]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-5xl h-[90vh] bg-[#050505] border border-white/10 rounded-[3rem] z-[10001] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(56,242,127,0.1)]"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-green via-neon-yellow to-neon-green" />

            <div className="p-8 md:p-12 overflow-y-auto scrollbar-none flex-1">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                    RELIQUÁRIO DE{" "}
                    <span className="text-neon-yellow">PROXIMIDADE</span>
                  </h2>
                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-2 px-1">
                    Relatório Tático • Protocolo Alpha-9
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all hover:bg-white/10"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Character Profile Card */}
                <div className="p-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-32 h-32 rounded-full bg-neon-green/10 border-4 border-neon-green/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(56,242,127,0.2)]">
                    <Crown className="w-16 h-16 text-neon-yellow" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {stats.class}
                  </h3>
                  <p className="text-neon-yellow text-sm font-black uppercase tracking-widest">
                    Nível {stats.level}
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full mt-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-white/30 uppercase mb-1">
                        XP TOTAL
                      </p>
                      <p className="text-xl font-black text-white">
                        {stats.xp}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-white/30 uppercase mb-1">
                        RANK
                      </p>
                      <p className="text-xl font-black text-neon-green">S+</p>
                    </div>
                  </div>
                </div>

                {/* Graph Area */}
                <div className="lg:col-span-2 p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] flex flex-col min-h-[400px]">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-black uppercase italic text-white flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-neon-green" /> Fluxo
                      de Performance
                    </h4>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-neon-green/20 text-neon-green text-[10px] font-black uppercase tracking-widest leading-none">
                        Últimos 7 Dias
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activityData}>
                        <defs>
                          <linearGradient
                            id="colorVal"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#38f27f"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#38f27f"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="name"
                          stroke="#ffffff20"
                          fontSize={10}
                          fontWeight="900"
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#050505",
                            border: "1px solid #ffffff10",
                            borderRadius: "16px",
                            fontSize: "10px",
                            fontWeight: "900",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#38f27f"
                          strokeWidth={4}
                          fillOpacity={1}
                          fill="url(#colorVal)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Detalhadamente sections */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                <DetailCard
                  title="Missões Concluídas"
                  value={String(stats.questsCompleted || 0)}
                  icon={Target}
                  color="text-blue-400"
                />
                <DetailCard
                  title="Hábitos Concluídos"
                  value={String(stats.habitsCompleted || 0)}
                  icon={Flame}
                  color="text-orange-400"
                />
                <DetailCard
                  title="Treinos Realizados"
                  value={String(stats.trainingsCompleted || 0)}
                  icon={Swords}
                  color="text-neon-green"
                />
                <DetailCard
                  title="Vitórias"
                  value={String(stats.victories || 0)}
                  icon={Award}
                  color="text-yellow-400"
                />
                <DetailCard
                  title="Derrotas"
                  value={String(stats.defeats || 0)}
                  icon={X}
                  color="text-red-500"
                />
              </div>
            </div>

            {/* Footer / Call to action */}
            <div className="p-8 border-t border-white/5 bg-white/1 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-yellow/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-neon-yellow" />
                </div>
                <div>
                  <p className="text-xs font-black text-white/50 uppercase">
                    Conquista Recente
                  </p>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">
                    Lendário das Sombras
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-neon-green transition-all shadow-2xl"
              >
                Confirmar e Retornar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="p-6 bg-white/3 border border-white/5 rounded-3xl hover:border-white/10 transition-colors group">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
          {title}
        </p>
      </div>
      <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
    </div>
  );
}

// â”€â”€â”€ Board View (with Mobile Column Tabs) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BoardView({
  proj,
  projects,
  showTaskModal,
  setShowTaskModal,
  dragTask,
  setDragTask,
  handleTaskDrop,
  updateProject,
  setActiveProject,
  setPlayerStats,
  setView,
  onSaveTask,
  onDeleteTask,
}: {
  proj: Project;
  projects: Project[];
  showTaskModal: ProjectTask | null;
  setShowTaskModal: (t: ProjectTask | null) => void;
  dragTask: string | null;
  setDragTask: (id: string | null) => void;
  handleTaskDrop: (col: (typeof COLUMN_IDS)[number]) => void;
  updateProject: (id: string, fn: (p: Project) => Project) => void;
  setActiveProject: (p: Project | null) => void;
  setPlayerStats: (fn: (p: PlayerStats) => PlayerStats) => void;
  setView: (v: "list" | "board") => void;
  onSaveTask: (t: ProjectTask) => void;
  onDeleteTask: (id: string) => void;
}) {
  const [activeCol, setActiveCol] =
    useState<(typeof COLUMN_IDS)[number]>("A Fazer");

  const colDotColors: Record<string, string> = {
    Ideias: "bg-purple-400",
    "A Fazer": "bg-blue-400",
    "Em Progresso": "bg-orange-400",
    "Em Revisão": "bg-yellow-400",
    Concluído: "bg-emerald-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="fixed inset-0 z-300 bg-[#030508] flex flex-col overflow-hidden"
    >
      {/* â”€â”€ TOP BAR â”€â”€ */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-white/5 bg-black/40 backdrop-blur-xl flex-shrink-0">
        <button
          onClick={() => {
            setActiveProject(null);
            setView("list");
          }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
        <span className="text-lg sm:text-xl flex-shrink-0">{proj.icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-black text-sm sm:text-base truncate leading-tight">
            {proj.name}
          </h2>
          <p className="text-white/40 text-[9px] sm:text-[10px] font-bold">
            {proj.tasks.length} tarefas â€¢ {projectProgress(proj)}% concluí­do
          </p>
        </div>
        {/* Progress bar - hidden on very small screens */}
        <div className="hidden sm:block w-20 h-2 bg-white/10 rounded-full overflow-hidden flex-shrink-0">
          <div
            className="h-full rounded-full bg-linear-to-r from-blue-500 to-emerald-500"
            style={{ width: `${projectProgress(proj)}%` }}
          />
        </div>
        <button
          onClick={() =>
            setShowTaskModal({
              id: "",
              title: "",
              desc: "",
              priority: "Média",
              column: activeCol,
              deadline: "",
              tags: [],
              checklist: [],
              comments: [],
              createdAt: "",
            })
          }
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[9px] sm:text-[10px] font-black uppercase hover:bg-blue-500/30 transition-all flex-shrink-0"
        >
          <Plus className="w-3 h-3" />
          <span className="hidden xs:inline">Nova </span>Tarefa
        </button>
      </div>

      {/* â”€â”€ MOBILE COLUMN TABS â”€â”€ */}
      <div className="flex sm:hidden overflow-x-auto scrollbar-none border-b border-white/5 bg-black/20 flex-shrink-0 px-2 py-2 gap-1.5">
        {COLUMN_IDS.map((col) => {
          const colTasks = proj.tasks.filter((t) => t.column === col);
          const isActive = activeCol === col;
          const style = COLUMN_STYLES[col];
          return (
            <button
              key={col}
              onClick={() => setActiveCol(col)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wide transition-all ${
                isActive
                  ? `${style.bg} border ${style.border} text-white`
                  : "bg-white/3 border border-white/5 text-white/30 hover:text-white/60"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${colDotColors[col]} ${isActive ? "opacity-100" : "opacity-40"}`}
              />
              {col}
              <span
                className={`px-1.5 py-0.5 rounded text-[8px] font-black ${isActive ? "bg-white/20 text-white" : "bg-white/5 text-white/30"}`}
              >
                {colTasks.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* â”€â”€ DESKTOP: HORIZONTAL SCROLL COLUMNS / MOBILE: SINGLE COLUMN â”€â”€ */}
      {/* Desktop layout */}
      <div className="hidden sm:flex flex-1 gap-4 overflow-x-auto p-4 snap-x snap-mandatory scrollbar-none pb-6">
        {COLUMN_IDS.map((col) => (
          <KanbanColumn
            key={col}
            col={col}
            proj={proj}
            updateProject={updateProject}
            setActiveProject={setActiveProject}
            setPlayerStats={setPlayerStats}
            setShowTaskModal={setShowTaskModal}
            setDragTask={setDragTask}
            handleTaskDrop={handleTaskDrop}
            className="flex-shrink-0 w-72 snap-center"
          />
        ))}
      </div>

      {/* Mobile layout: show only active column */}
      <div className="flex sm:hidden flex-1 overflow-hidden p-3 pb-6">
        <KanbanColumn
          col={activeCol}
          proj={proj}
          updateProject={updateProject}
          setActiveProject={setActiveProject}
          setPlayerStats={setPlayerStats}
          setShowTaskModal={setShowTaskModal}
          setDragTask={setDragTask}
          handleTaskDrop={handleTaskDrop}
          className="w-full"
        />
      </div>

      {/* TASK MODAL */}
      <AnimatePresence>
        {showTaskModal && (
          <TaskDetailModal
            task={showTaskModal}
            onClose={() => setShowTaskModal(null)}
            onSave={onSaveTask}
            onDelete={onDeleteTask}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// â”€â”€â”€ Kanban Column â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function KanbanColumn({
  col,
  proj,
  updateProject,
  setActiveProject,
  setPlayerStats,
  setShowTaskModal,
  setDragTask,
  handleTaskDrop,
  className,
}: {
  col: (typeof COLUMN_IDS)[number];
  proj: Project;
  updateProject: (id: string, fn: (p: Project) => Project) => void;
  setActiveProject: (p: Project | null) => void;
  setPlayerStats: (fn: (p: PlayerStats) => PlayerStats) => void;
  setShowTaskModal: (t: ProjectTask | null) => void;
  setDragTask: (id: string | null) => void;
  handleTaskDrop: (col: (typeof COLUMN_IDS)[number]) => void;
  className?: string;
}) {
  const style = COLUMN_STYLES[col];
  const colTasks = proj.tasks.filter((t) => t.column === col);
  const isDoneCol = col === "Concluí­do";

  return (
    <div
      className={`flex flex-col ${style.bg} border ${style.border} rounded-3xl overflow-hidden ${className}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleTaskDrop(col)}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2 px-4 py-3 sm:py-4 border-b border-white/10 bg-white/[0.04] flex-shrink-0">
        <div
          className={`w-2.5 h-2.5 rounded-full ${style.dot} shadow-[0_0_12px_currentColor]`}
        />
        <p className="text-white font-black text-[11px] uppercase tracking-[0.2em] flex-1">
          {col}
        </p>
        <span className="bg-white px-2 py-0.5 rounded-lg text-black text-[10px] font-black">
          {colTasks.length}
        </span>
        {col !== "Ideias" && col !== "Concluí­do" && (
          <button
            onClick={() =>
              setShowTaskModal({
                id: "",
                title: "",
                desc: "",
                priority: "Média",
                column: col,
                deadline: "",
                tags: [],
                checklist: [],
                comments: [],
                createdAt: "",
              })
            }
            className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-none">
        {colTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-2 opacity-30">
            <div className="text-3xl">
              {col === "Ideias"
                ? "ðŸ’¡"
                : col === "A Fazer"
                  ? "ðŸ“‹"
                  : col === "Em Progresso"
                    ? "âš¡"
                    : col === "Em Revisí£o"
                      ? "ðŸ”"
                      : "âœ…"}
            </div>
            <p className="text-white text-[10px] font-black uppercase">
              Sem tarefas aqui
            </p>
          </div>
        )}
        {colTasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => setDragTask(task.id)}
            className={`p-3 bg-white/[0.08] border ${isDoneCol ? "border-emerald-500/20" : "border-white/10"} rounded-2xl cursor-pointer hover:border-white/30 hover:bg-white/[0.12] active:scale-[0.98] transition-all group shadow-md flex items-center gap-3`}
          >
            {/* Circle button to advance column */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = COLUMN_IDS.indexOf(col);
                const nextIndex = (currentIndex + 1) % COLUMN_IDS.length;
                const targetCol = COLUMN_IDS[nextIndex];
                updateProject(proj.id, (p) => {
                  const updated = {
                    ...p,
                    tasks: p.tasks.map((t) =>
                      t.id === task.id ? { ...t, column: targetCol } : t,
                    ),
                  };
                  setActiveProject(updated);
                  setPlayerStats((prev: PlayerStats) => ({
                    ...prev,
                    xp: (prev.xp || 0) + 10,
                    gold: (prev.gold || 0) + 5,
                  }));
                  return updated;
                });
              }}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all touch-manipulation ${
                isDoneCol
                  ? "bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                  : "border-white/50 hover:border-emerald-400 hover:bg-emerald-400/10 active:bg-emerald-400/20"
              }`}
            >
              {isDoneCol && (
                <Check className="w-3 h-3 text-black stroke-[4px]" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p
                className={`text-white text-xs sm:text-[13px] font-black leading-tight ${isDoneCol ? "line-through text-white/40" : ""}`}
              >
                {task.title}
              </p>
              {task.deadline && (
                <p className="text-white/30 text-[9px] font-bold mt-0.5">
                  ðŸ“… {task.deadline}
                </p>
              )}
            </div>

            {/* Edit button */}
            {!isDoneCol && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTaskModal(task);
                }}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 touch-manipulation"
              >
                <Pencil className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Quick Add input */}
      <div className="p-3 border-t border-white/10 bg-white/[0.02] flex-shrink-0">
        <input
          placeholder="+ Adicionar tarefa rí¡pida..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              const title = e.currentTarget.value.trim();
              const newTask: ProjectTask = {
                id: Date.now().toString(),
                title,
                desc: "",
                priority: "Média",
                column: col as any,
                deadline: "",
                tags: [],
                checklist: [],
                comments: [],
                createdAt: new Date().toISOString().slice(0, 10),
              };
              updateProject(proj.id, (p) => {
                const u = { ...p, tasks: [...p.tasks, newTask] };
                setActiveProject(u);
                return u;
              });
              e.currentTarget.value = "";
            }
          }}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/25 focus:border-white/40 focus:bg-white/[0.08] outline-none transition-all font-bold"
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Projects Dashboard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PROJECT_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#f97316",
  "#ec4899",
  "#22c55e",
  "#ef4444",
  "#06b6d4",
  "#eab308",
];
const PROJECT_ICONS = [
  "ðŸš€",
  "ðŸ’¡",
  "ðŸŽ¯",
  "ðŸ”§",
  "ðŸ“±",
  "ðŸŒ",
  "ðŸŽ¨",
  "ðŸ¤–",
  "ðŸ“Š",
  "ðŸ†",
  "âš¡",
  "ðŸ”¥",
];
const COLUMN_IDS = [
  "Ideias",
  "A Fazer",
  "Em Progresso",
  "Em Revisí£o",
  "Concluí­do",
] as const;
const COLUMN_STYLES: Record<
  string,
  { bg: string; border: string; dot: string }
> = {
  Ideias: {
    bg: "bg-purple-500/5",
    border: "border-purple-500/20",
    dot: "bg-purple-400",
  },
  "A Fazer": {
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
  },
  "Em Progresso": {
    bg: "bg-orange-500/5",
    border: "border-orange-500/20",
    dot: "bg-orange-400",
  },
  "Em Revisão": {
    bg: "bg-yellow-500/5",
    border: "border-yellow-500/20",
    dot: "bg-yellow-400",
  },
  Concluído: {
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
};
const PRIORITY_STYLE: Record<string, string> = {
  Baixa: "bg-blue-500/20 text-blue-400",
  Média: "bg-yellow-500/20 text-yellow-400",
  Alta: "bg-orange-500/20 text-orange-400",
  Urgente: "bg-red-500/20 text-red-500",
};

function projectProgress(project: Project) {
  if (project.tasks.length === 0) return 0;
  const done = project.tasks.filter((t) => t.column === "Concluí­do").length;
  return Math.round((done / project.tasks.length) * 100);
}

function aiGenerateTasks(
  description: string,
): Omit<ProjectTask, "id" | "createdAt">[] {
  const lower = description.toLowerCase();
  const base: Omit<ProjectTask, "id" | "createdAt">[] = [];
  const col = "A Fazer" as const;
  const mkTask = (
    title: string,
    col2 = col,
  ): Omit<ProjectTask, "id" | "createdAt"> => ({
    title,
    desc: "",
    priority: "Média",
    column: col2,
    deadline: "",
    tags: [],
    checklist: [],
    comments: [],
  });

  if (/app|aplicativo|sistema|plataforma|saas/i.test(lower)) {
    base.push(
      ...[
        "Definir escopo e requisitos",
        "Criar design (UI/UX)",
        "Configurar backend e banco de dados",
        "Desenvolver tela de login",
        "Desenvolver dashboard principal",
        "Testar funcionalidades",
        "Publicar versí£o inicial",
      ].map((t) => mkTask(t)),
    );
  } else if (/site|website|landing|pí¡gina/i.test(lower)) {
    base.push(
      ...[
        "Definir objetivo da pí¡gina",
        "Criar wireframe",
        "Desenvolver design",
        "Escrever copy",
        "Implementar HTML/CSS",
        "Conectar formulí¡rio",
        "Publicar online",
      ].map((t) => mkTask(t)),
    );
  } else if (/marketing|campanha|conteíºdo/i.test(lower)) {
    base.push(
      ...[
        "Definir píºblico-alvo",
        "Criar estratí©gia",
        "Produzir conteíºdo",
        "Revisar e aprovar",
        "Publicar",
        "Analisar resultados",
      ].map((t) => mkTask(t)),
    );
  } else {
    base.push(
      ...[
        "Pesquisa e planejamento",
        "Execuí§í£o principal",
        "Revisí£o e ajustes",
        "Finalizaí§í£o e entrega",
      ].map((t) => mkTask(t)),
    );
  }
  return base;
}

function aiGenerateChecklist(taskTitle: string): string[] {
  const lower = taskTitle.toLowerCase();
  if (/design|tela|ui|layout/i.test(lower))
    return [
      "Definir paleta de cores",
      "Criar wireframe",
      "Desenvolver componentes",
      "Revisar usabilidade",
      "Exportar assets",
    ];
  if (/backend|api|servidor/i.test(lower))
    return [
      "Definir rotas",
      "Implementar lí³gica",
      "Conectar banco de dados",
      "Escrever testes",
      "Documentar API",
    ];
  if (/landing/i.test(lower))
    return [
      "Definir headline",
      "Criar seí§í£o hero",
      "Escrever copy",
      "Adicionar CTA",
      "Testar formulí¡rio",
      "Publicar",
    ];
  if (/test|testar/i.test(lower))
    return [
      "Criar casos de teste",
      "Executar testes unití¡rios",
      "Testes de integraí§í£o",
      "Corrigir bugs",
      "Validar",
    ];
  return ["Planejar etapas", "Executar", "Revisar", "Finalizar", "Entregar"];
}

function ProjectsDashboard({
  onExit,
  playerStats,
  setPlayerStats,
  projects,
  setProjects,
}: {
  onExit: () => void;
  playerStats: PlayerStats;
  setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {
  const [view, setView] = useState<"list" | "board">("list");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState<ProjectTask | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: 'ðŸ¤– Olí¡! Descreva um projeto e eu crio as tarefas automaticamente!\nEx: "Criar um aplicativo de controle financeiro"',
    },
  ]);
  const [dragTask, setDragTask] = useState<string | null>(null);

  const updateProject = (projId: string, fn: (p: Project) => Project) =>
    setProjects((prev) => prev.map((p) => (p.id === projId ? fn(p) : p)));

  const handleTaskDrop = (col: (typeof COLUMN_IDS)[number]) => {
    if (!dragTask || !activeProject) return;
    const wasCompleted =
      activeProject.tasks.find((t) => t.id === dragTask)?.column ===
      "Concluí­do";
    updateProject(activeProject.id, (p) => {
      const updated = {
        ...p,
        tasks: p.tasks.map((t) =>
          t.id === dragTask ? { ...t, column: col } : t,
        ),
      };
      setActiveProject(updated);
      // Gamify on complete
      if (col === "Concluí­do" && !wasCompleted) {
        setPlayerStats((prev: any) => ({
          ...prev,
          xp: (prev.xp || 0) + 20,
          gold: (prev.gold || 0) + 10,
        }));
      }
      return updated;
    });
    setDragTask(null);
  };

  const handleAiSend = () => {
    if (!aiInput.trim()) return;
    const msg = aiInput.trim();
    setAiMessages((prev) => [...prev, { role: "user", text: msg }]);
    setAiInput("");
    setTimeout(() => {
      const tasks = aiGenerateTasks(msg);
      const proj: Project = {
        id: Date.now().toString(),
        name: msg.slice(0, 60),
        desc: "Criado pela IA",
        deadline: "",
        priority: "Média",
        color:
          PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)],
        icon: PROJECT_ICONS[Math.floor(Math.random() * PROJECT_ICONS.length)],
        tasks: tasks.map((t, i) => ({
          ...t,
          id: (Date.now() + i).toString(),
          createdAt: new Date().toISOString().slice(0, 10),
        })),
        createdAt: new Date().toISOString().slice(0, 10),
        goal: "",
      };
      setProjects((prev) => [proj, ...prev]);
      setAiMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `âœ… Projeto criado: "${proj.name}"\nðŸ“Œ ${tasks.length} tarefas geradas automaticamente!\nðŸª™ Use o quadro para gerencií¡-las.`,
        },
      ]);
      setShowAI(false);
      setActiveProject(proj);
      setView("board");
    }, 600);
  };

  // â”€â”€ BOARD VIEW â”€â”€
  if (activeProject && view === "board") {
    const proj =
      projects.find((p) => p.id === activeProject.id) || activeProject;
    return (
      <BoardView
        proj={proj}
        projects={projects}
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        dragTask={dragTask}
        setDragTask={setDragTask}
        handleTaskDrop={handleTaskDrop}
        updateProject={updateProject}
        setActiveProject={setActiveProject}
        setPlayerStats={setPlayerStats}
        setView={setView}
        onSaveTask={(t) => {
          if (t.id) {
            updateProject(proj.id, (p) => {
              const wasCompleted =
                p.tasks.find((x) => x.id === t.id)?.column === "Concluí­do";
              const updated = {
                ...p,
                tasks: p.tasks.map((x) => (x.id === t.id ? t : x)),
              };
              setActiveProject(updated);
              if (t.column === "Concluí­do" && !wasCompleted)
                setPlayerStats((prev: any) => ({
                  ...prev,
                  xp: (prev.xp || 0) + 20,
                  gold: (prev.gold || 0) + 10,
                }));
              return updated;
            });
          } else {
            const newT: ProjectTask = {
              ...t,
              id: Date.now().toString(),
              createdAt: new Date().toISOString().slice(0, 10),
            };
            updateProject(proj.id, (p) => {
              const u = { ...p, tasks: [...p.tasks, newT] };
              setActiveProject(u);
              return u;
            });
          }
          setShowTaskModal(null);
        }}
        onDeleteTask={(id) => {
          updateProject(proj.id, (p) => {
            const u = { ...p, tasks: p.tasks.filter((x) => x.id !== id) };
            setActiveProject(u);
            return u;
          });
          setShowTaskModal(null);
        }}
      />
    );
  }

  // â”€â”€ LIST VIEW â”€â”€
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[300] bg-[#030508] overflow-y-auto scrollbar-thin"
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/3 w-96 h-72 bg-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        {/* HEADER */}
        <div className="flex items-start sm:items-center justify-between py-6 gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-white break-words">
              Gerenciador de{" "}
              <span className="text-blue-400 font-black">Projetos</span>
            </h1>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1.5">
              {projects.length} projetos ativos
            </p>
          </div>
          <button
            onClick={onExit}
            className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STATS ROW */}
        {projects.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total",
                value: projects.length,
                icon: "ðŸ“",
                c: "blue",
              },
              {
                label: "Tarefas",
                value: projects.reduce((s, p) => s + p.tasks.length, 0),
                icon: "ðŸ“‹",
                c: "purple",
              },
              {
                label: "Concluí­das",
                value: projects.reduce(
                  (s, p) =>
                    s + p.tasks.filter((t) => t.column === "Concluí­do").length,
                  0,
                ),
                icon: "âœ…",
                c: "emerald",
              },
              {
                label: "Em Progresso",
                value: projects.reduce(
                  (s, p) =>
                    s +
                    p.tasks.filter((t) => t.column === "Em Progresso").length,
                  0,
                ),
                icon: "âš¡",
                c: "orange",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`p-4 bg-${s.c}-500/10 border border-${s.c}-500/20 rounded-2xl`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{s.icon}</span>
                  <p className="text-[10px] text-white/40 uppercase font-black">
                    {s.label}
                  </p>
                </div>
                <p className={`text-2xl font-black text-${s.c}-400`}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ACTION BUTTONS (IA & NEW PROJECT) - Moved below stats */}
        <div className="flex items-center gap-3 mb-8 w-full">
          <button
            onClick={() => setShowAI(true)}
            className="flex-1 flex justify-center items-center gap-2 px-4 py-3.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs sm:text-[10px] font-black uppercase hover:bg-purple-500/30 transition-all shadow-[0_4px_15px_rgba(168,85,247,0.2)]"
          >
            <Bot className="w-5 h-5 sm:w-4 sm:h-4" /> IA
          </button>
          <button
            onClick={() => setShowNewProject(true)}
            className="flex-[2] flex justify-center items-center gap-2 px-4 py-3.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 font-black text-xs sm:text-[10px] uppercase hover:bg-blue-500/30 transition-all shadow-[0_4px_15px_rgba(59,130,246,0.2)]"
          >
            <Plus className="w-5 h-5 sm:w-4 sm:h-4" /> Criar Projeto
          </button>
        </div>

        {/* PROJECTS GRID */}
        {projects.length === 0 ? (
          <div className="py-24 flex flex-col items-center gap-4 text-center">
            <span className="text-6xl">ðŸš€</span>
            <p className="text-white font-black text-xl">
              Nenhum projeto ainda
            </p>
            <p className="text-white/60 text-sm">
              Crie seu primeiro projeto ou use a IA para gerar automaticamente!
            </p>
            <button
              onClick={() => setShowNewProject(true)}
              className="mt-4 px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-black text-xs uppercase rounded-2xl hover:bg-blue-500/30 transition-all"
            >
              + Criar Projeto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((proj) => {
              const pct = projectProgress(proj);
              const daysLeft = proj.deadline
                ? Math.ceil(
                    (new Date(proj.deadline).getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24),
                  )
                : null;
              return (
                <motion.div
                  key={proj.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setActiveProject(proj);
                    setView("board");
                  }}
                  className="p-5 bg-white/[0.02] border border-white/10 rounded-3xl cursor-pointer hover:border-white/20 transition-all relative overflow-hidden group"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 rounded-t-3xl"
                    style={{ background: proj.color }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProjects((prev) =>
                        prev.filter((p) => p.id !== proj.id),
                      );
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-white/10 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{proj.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-black text-sm truncate">
                        {proj.name}
                      </p>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${PRIORITY_STYLE[proj.priority]}`}
                      >
                        {proj.priority}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1.5">
                        <span className="text-white/60 font-black uppercase tracking-wider">
                          Progresso
                        </span>
                        <span className="text-white font-black">{pct}%</span>
                      </div>
                      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          className="h-full rounded-full transition-all shadow-[0_0_10px_currentColor]"
                          style={{ background: proj.color }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 text-white/70 font-bold">
                        <span>ðŸ“‹</span>
                        <span>{proj.tasks.length} tarefas</span>
                      </div>
                      {daysLeft !== null && (
                        <div
                          className={`flex items-center gap-1.5 font-black ${daysLeft < 0 ? "text-red-400" : daysLeft < 7 ? "text-orange-400" : "text-white/60"}`}
                        >
                          <span>ðŸ“…</span>
                          <span>
                            {daysLeft < 0
                              ? `${Math.abs(daysLeft)}d atrasado`
                              : `${daysLeft}d restantes`}
                          </span>
                        </div>
                      )}
                    </div>
                    {proj.goal && (
                      <div className="p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-[10px] text-white/70 font-medium">
                        <span className="text-yellow-400 font-black">
                          ðŸ† META:{" "}
                        </span>
                        {proj.goal}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* NEW PROJECT MODAL */}
      <AnimatePresence>
        {showNewProject && (
          <NewProjectModal
            onClose={() => setShowNewProject(false)}
            onCreate={(proj) => {
              setProjects((prev) => [proj, ...prev]);
              setShowNewProject(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* AI MODAL */}
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-3000 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-[#060a0f] border border-white/10 rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-black text-lg uppercase">
                    IA de Projetos
                  </h3>
                </div>
                <button
                  onClick={() => setShowAI(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="h-52 overflow-y-auto space-y-3 mb-4 p-3 bg-white/[0.02] border border-white/5 rounded-2xl scrollbar-thin">
                {aiMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-xl text-xs whitespace-pre-line ${m.role === "user" ? "bg-blue-500/20 text-blue-100 rounded-br-none" : "bg-purple-500/10 text-purple-100 rounded-bl-none"}`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiSend()}
                  placeholder='Ex: "Criar um app de finaní§as"'
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none placeholder:text-white/20 focus:border-purple-500/40"
                />
                <button
                  onClick={handleAiSend}
                  className="px-4 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase hover:bg-purple-500/30 transition-all"
                >
                  Criar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// â”€â”€â”€ AI Chat View â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  action?: { type: string; data?: any };
  visual?: { type: "finance" | "tasks" | "projects"; data: any };
}
interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

function AIChatView({
  onExit,
  transactions,
  projects,
  quests,
  habits,
  budget,
  playerStats,
  setTransactions,
  setProjects,
  setQuests,
}: {
  onExit: () => void;
  transactions: FinancialTransaction[];
  projects: Project[];
  quests: Quest[];
  habits: Habit[];
  budget: number;
  playerStats: PlayerStats;
  setTransactions: (
    fn: (p: FinancialTransaction[]) => FinancialTransaction[],
  ) => void;
  setProjects: (fn: (p: Project[]) => Project[]) => void;
  setQuests: (fn: (q: Quest[]) => Quest[]) => void;
}) {
  const [conversations, setConversations] = useLocalStorage<ChatConversation[]>(
    "kronos_ai_conversations",
    [],
  );
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mentorMode, setMentorMode] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const messages: ChatMessage[] = activeConv?.messages ?? [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const newConversation = (): string => {
    const id = Date.now().toString();
    const welcome: ChatMessage = {
      id: "welcome",
      role: "assistant",
      content: mentorMode
        ? "ðŸŽ“ **Modo Mentor IA Ativado!**\n\nOlí¡, Guerreiro! Sou seu mentor pessoal.\n\nAnalisei seu perfil:\nâ€¢ Ní­vel " +
          playerStats.level +
          " - " +
          playerStats.class +
          "\nâ€¢ " +
          quests.filter((q: any) => q.done).length +
          " missíµes concluí­das\nâ€¢ " +
          habits.length +
          " hí¡bitos ativos\nâ€¢ " +
          projects.length +
          " projetos em andamento\n\nEstou aqui para te guiar ao prí³ximo ní­vel. O que deseja melhorar hoje?"
        : "Olí¡! Sou seu **Assistente IA** integrado ao Kronos. ðŸš€\n\nPosso te ajudar com:\nâ€¢ ðŸ’° Finaní§as e gastos\nâ€¢ ðŸ“‹ Projetos e tarefas\nâ€¢ ðŸŽ¯ Rotina e produtividade\nâ€¢ ðŸ’¡ Ideias e estratí©gias\n\nO que precisa hoje?",
      timestamp: new Date(),
    };
    const conv: ChatConversation = {
      id,
      title: "Nova Conversa",
      messages: [welcome],
      createdAt: new Date().toISOString(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveConvId(id);
    return id;
  };

  useEffect(() => {
    if (conversations.length === 0) {
      newConversation();
    } else {
      setActiveConvId(conversations[0].id);
    }
  }, []);

  const updateConv = (
    convId: string,
    fn: (c: ChatConversation) => ChatConversation,
  ) => {
    setConversations((prev) => prev.map((c) => (c.id === convId ? fn(c) : c)));
  };

  // â”€â”€ AI Engine â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const generateResponse = async (userMsg: string, convId: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMsg }],
          context: {
            playerStats,
            transactions,
            projects,
            quests,
            habits,
            budget,
          },
        }),
      });

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      const aiContent = data.content;

      const aiMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: aiContent,
        timestamp: new Date(),
      };

      updateConv(convId, (c) => {
        const title =
          c.messages.length <= 1
            ? userMsg.length > 30
              ? userMsg.slice(0, 30) + "..."
              : userMsg
            : c.title;
        return { ...c, title, messages: [...c.messages, aiMsg] };
      });
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "âš ï¸ **Ops!** Tive um problema de conexí£o com meus níºcleos de processamento. Tente novamente em alguns instantes.",
        timestamp: new Date(),
      };
      updateConv(convId, (c) => ({
        ...c,
        messages: [...c.messages, errorMsg],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");

    let convId = activeConvId;
    if (!convId) {
      convId = newConversation();
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    updateConv(convId, (c) => ({ ...c, messages: [...c.messages, userMsg] }));
    setIsTyping(true);
    setTimeout(
      () => generateResponse(text, convId!),
      800 + Math.random() * 600,
    );
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => {
      setInput("");
      let convId = activeConvId;
      if (!convId) convId = newConversation();
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: prompt,
        timestamp: new Date(),
      };
      updateConv(convId, (c) => {
        const title =
          c.messages.length <= 1 ? prompt.slice(0, 35) + "..." : c.title;
        return { ...c, title, messages: [...c.messages, userMsg] };
      });
      setIsTyping(true);
      setTimeout(() => generateResponse(prompt, convId!), 800);
    }, 100);
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConvId === id) {
      const remaining = conversations.filter((c) => c.id !== id);
      if (remaining.length > 0) setActiveConvId(remaining[0].id);
      else newConversation();
    }
  };

  const renderMessageContent = (msg: ChatMessage) => {
    const lines = msg.content.split("\n");
    return (
      <div className="space-y-1">
        {lines.map((line, i) => {
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p
              key={i}
              className={`text-sm leading-relaxed ${line.trim() === "" ? "h-2" : ""}`}
            >
              {parts.map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <span key={j} className="font-black text-white">
                    {part.slice(2, -2)}
                  </span>
                ) : (
                  <span key={j}>{part}</span>
                ),
              )}
            </p>
          );
        })}
        {/* Visual cards */}
        {msg.visual?.type === "finance" && (
          <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
              ðŸ’¹ Resumo Financeiro
            </p>
            {"totalIn" in msg.visual.data && (
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-[9px] text-white/40">Entrada</p>
                  <p className="text-xs font-black text-emerald-400">
                    R$ {msg.visual.data.totalIn?.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/40">Gastos</p>
                  <p className="text-xs font-black text-red-400">
                    R$ {msg.visual.data.totalSpent?.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/40">Saldo</p>
                  <p
                    className={`text-xs font-black ${msg.visual.data.saldo >= 0 ? "text-neon-green" : "text-red-400"}`}
                  >
                    R$ {msg.visual.data.saldo?.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            {"value" in msg.visual.data && (
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-black">
                  -R$ {msg.visual.data.value?.toFixed(2)}
                </span>
                <span className="text-[10px] text-white/40">
                  {msg.visual.data.category}
                </span>
              </div>
            )}
          </div>
        )}
        {msg.visual?.type === "tasks" && (
          <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-wider mb-2">
              ðŸ“‹ Status das Tarefas
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-lg font-black text-orange-400">
                  {msg.visual.data.pending}
                </p>
                <p className="text-[9px] text-white/40">Pendentes</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-neon-green">
                  {msg.visual.data.done}
                </p>
                <p className="text-[9px] text-white/40">Concluí­das</p>
              </div>
            </div>
          </div>
        )}
        {msg.visual?.type === "projects" && (
          <div className="mt-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">
              ðŸš€ Projeto Criado
            </p>
            <p className="text-sm font-bold text-white mt-1">
              {msg.visual.data.name}
            </p>
            <p className="text-[10px] text-white/40">
              {msg.visual.data.tasksCount} tarefas geradas
            </p>
          </div>
        )}
      </div>
    );
  };

  const quickPrompts = [
    {
      icon: "ðŸ“Š",
      label: "Finaní§as",
      prompt: "Como estí£o minhas finaní§as esse míªs?",
    },
    {
      icon: "ðŸ“‹",
      label: "Tarefas",
      prompt: "Quais tarefas ainda faltam nos meus projetos?",
    },
    {
      icon: "ðŸ—“ï¸",
      label: "Plano do dia",
      prompt: "Organize meu dia de hoje",
    },
    {
      icon: "ðŸŽ¯",
      label: "Progresso",
      prompt: "Analise meu progresso como mentor",
    },
    { icon: "ðŸ’¡", label: "Ideias", prompt: "Me díª ideias de negí³cio" },
    { icon: "ðŸ’°", label: "Economia", prompt: "Como posso economizar mais?" },
  ];

  return (
    <div className="fixed inset-0 z-[500] flex bg-[#040810] overflow-hidden">
      {/* SIDEBAR */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="absolute inset-0 bg-black/60 z-[10] lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-[#06090f] border-r border-white/5 z-[20] flex flex-col lg:relative lg:w-64"
            >
              <div className="p-4 border-b border-white/5">
                <button
                  onClick={() => {
                    newConversation();
                    setShowSidebar(false);
                  }}
                  className="w-full py-3 px-4 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-600/30 transition-all flex items-center gap-2 justify-center"
                >
                  <Plus className="w-4 h-4" /> Nova Conversa
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest px-2 mb-3">
                  Histí³rico
                </p>
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setActiveConvId(conv.id);
                      setShowSidebar(false);
                    }}
                    className={`group p-3 rounded-xl cursor-pointer flex items-center gap-2 transition-all relative ${activeConvId === conv.id ? "bg-blue-600/20 border border-blue-500/20" : "hover:bg-white/5"}`}
                  >
                    <MessageCircle
                      className={`w-3.5 h-3.5 shrink-0 ${activeConvId === conv.id ? "text-blue-400" : "text-white/20"}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-bold truncate ${activeConvId === conv.id ? "text-blue-300" : "text-white/60"}`}
                      >
                        {conv.title}
                      </p>
                      <p className="text-[9px] text-white/20">
                        {new Date(conv.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-white/20 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              {/* Mentor Mode Toggle */}
              <div className="p-4 border-t border-white/5">
                <button
                  onClick={() => {
                    setMentorMode(!mentorMode);
                    setShowSidebar(false);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 justify-center ${mentorMode ? "bg-purple-600/30 border border-purple-500/40 text-purple-300" : "bg-white/5 border border-white/10 text-white/40 hover:bg-white/10"}`}
                >
                  <Crown
                    className={`w-4 h-4 ${mentorMode ? "text-purple-400" : ""}`}
                  />
                  Modo Mentor IA
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* HEADER */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-[#06090f]/80 backdrop-blur-xl relative z-10 shrink-0">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-xl hover:bg-white/10 transition-all text-white/60 hover:text-white shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${mentorMode ? "bg-purple-600/30 border border-purple-500/30" : "bg-blue-600/30 border border-blue-500/30"}`}
            >
              <Bot
                className={`w-5 h-5 ${mentorMode ? "text-purple-400" : "text-blue-400"}`}
              />
            </div>
            <div className="min-w-0">
              <p
                className={`text-sm font-black ${mentorMode ? "text-purple-300" : "text-white"}`}
              >
                {mentorMode ? "Mentor IA" : "Assistente IA"}
              </p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                <p className="text-[9px] text-neon-green font-bold uppercase tracking-wider">
                  Online
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onExit}
            className="p-2 rounded-xl hover:bg-white/10 transition-all text-white/40 hover:text-white shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QUICK PROMPTS */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none border-b border-white/5 shrink-0">
          {quickPrompts.map((qp) => (
            <button
              key={qp.prompt}
              onClick={() => handleQuickPrompt(qp.prompt)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all whitespace-nowrap shrink-0"
            >
              <span>{qp.icon}</span> {qp.label}
            </button>
          ))}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === "user"
                      ? "bg-linear-to-br from-neon-green/30 to-emerald-600/30 border border-neon-green/20"
                      : mentorMode
                        ? "bg-purple-600/30 border border-purple-500/30"
                        : "bg-blue-600/30 border border-blue-500/30"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-neon-green" />
                  ) : (
                    <Bot
                      className={`w-4 h-4 ${mentorMode ? "text-purple-400" : "text-blue-400"}`}
                    />
                  )}
                </div>
                {/* Bubble */}
                <div
                  className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-linear-to-br from-neon-green/20 to-emerald-600/20 border border-neon-green/20 text-white rounded-tr-sm"
                        : mentorMode
                          ? "bg-purple-900/30 border border-purple-500/10 text-white/80 rounded-tl-sm"
                          : "bg-[#0d1520] border border-white/5 text-white/80 rounded-tl-sm"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="text-sm">{msg.content}</p>
                    ) : (
                      renderMessageContent(msg)
                    )}
                  </div>
                  <p className="text-[9px] text-white/20 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 items-end"
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${mentorMode ? "bg-purple-600/30 border border-purple-500/30" : "bg-blue-600/30 border border-blue-500/30"}`}
              >
                <Bot
                  className={`w-4 h-4 ${mentorMode ? "text-purple-400" : "text-blue-400"}`}
                />
              </div>
              <div className="px-4 py-3 bg-[#0d1520] border border-white/5 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [-3, 3, -3] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                      className={`w-2 h-2 rounded-full ${mentorMode ? "bg-purple-400" : "bg-blue-400"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="shrink-0 px-4 py-4 border-t border-white/5 bg-[#06090f]/80 backdrop-blur-xl">
          <div
            className={`flex items-end gap-3 p-2 rounded-2xl border transition-all ${mentorMode ? "bg-purple-900/20 border-purple-500/20 focus-within:border-purple-500/40" : "bg-white/5 border-white/10 focus-within:border-blue-500/40"}`}
          >
            <button className="p-2 text-white/30 hover:text-white/60 transition-colors shrink-0">
              <Activity className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
              placeholder={
                mentorMode
                  ? "Peí§a conselho ao seu mentor..."
                  : "Digite sua mensagem... (ex: gastei R$ 50 com almoí§o)"
              }
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/20 py-1.5 resize-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`p-2.5 rounded-xl transition-all shrink-0 ${
                input.trim()
                  ? mentorMode
                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-[9px] text-white/15 mt-2">
            IA integrada com seus dados Â· Kronos Assistant v1.0
          </p>
        </div>
      </div>
    </div>
  );
}

function NewProjectModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (p: Project) => void;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Project["priority"]>("Média");
  const [color, setColor] = useState(PROJECT_COLORS[0]);
  const [icon, setIcon] = useState(PROJECT_ICONS[0]);
  const [goal, setGoal] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-3000 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#060a0f] border border-white/10 rounded-3xl p-6 max-h-[90vh] overflow-y-auto scrollbar-thin"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-black text-xl uppercase">
            Novo Projeto
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Nome do Projeto
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
              placeholder="Ex: Criar SaaS de Produtividade"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Descrií§í£o
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none resize-none"
              placeholder="Descreva o projeto..."
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Meta do Projeto ðŸ†
            </label>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
              placeholder="Ex: Laní§ar atí© dia 30"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Prazo Final
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Prioridade
            </label>
            <div className="flex gap-2 mt-1">
              {(["Baixa", "Média", "Alta", "Urgente"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase ${priority === p ? PRIORITY_STYLE[p] : "bg-white/5 border border-white/10 text-white/40"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Cor
            </label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {PROJECT_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-lg border-2 transition-all ${color === c ? "border-white scale-110" : "border-transparent"}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              ícone
            </label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {PROJECT_ICONS.map((ic) => (
                <button
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all ${icon === ic ? "bg-white/20 scale-110" : "bg-white/5 hover:bg-white/10"}`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            if (!name.trim()) return;
            onCreate({
              id: Date.now().toString(),
              name,
              desc,
              deadline,
              priority,
              color,
              icon,
              tasks: [],
              createdAt: new Date().toISOString().slice(0, 10),
              goal,
            });
          }}
          className="w-full mt-6 py-3.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-500/30 transition-all"
        >
          Criar Projeto
        </button>
      </motion.div>
    </motion.div>
  );
}

function TaskDetailModal({
  task,
  onClose,
  onSave,
  onDelete,
}: {
  task: ProjectTask;
  onClose: () => void;
  onSave: (t: ProjectTask) => void;
  onDelete: (id: string) => void;
}) {
  const [t, setT] = useState<ProjectTask>({ ...task });
  const [newCheck, setNewCheck] = useState("");
  const [newComment, setNewComment] = useState("");
  const [aiChecklist, setAiChecklist] = useState<string[]>([]);
  const [showAiChecklist, setShowAiChecklist] = useState(false);

  const checkPct =
    t.checklist.length > 0
      ? Math.round(
          (t.checklist.filter((c) => c.done).length / t.checklist.length) * 100,
        )
      : 0;

  const suggestChecklist = () => {
    setAiChecklist(aiGenerateChecklist(t.title));
    setShowAiChecklist(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[3500] flex items-center justify-center px-2 sm:px-4 bg-black/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-lg bg-[#060a0f] border border-white/10 rounded-3xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 flex-shrink-0">
          <div className="flex-1">
            <input
              value={t.title}
              onChange={(e) => setT((x) => ({ ...x, title: e.target.value }))}
              className="w-full bg-transparent text-white font-black text-base outline-none placeholder:text-white/20"
              placeholder="Tí­tulo da tarefa"
            />
          </div>
          <div className="flex items-center gap-2">
            {t.id && (
              <button
                onClick={() => onDelete(t.id)}
                className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/20 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white font-black uppercase flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{" "}
                Prioridade
              </label>
              <select
                value={t.priority}
                onChange={(e) =>
                  setT((x) => ({ ...x, priority: e.target.value as any }))
                }
                className="mt-1.5 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs outline-none font-bold"
                style={{ background: "#060a0f" }}
              >
                {["Baixa", "Média", "Alta", "Urgente"].map((p) => (
                  <option key={p} value={p} style={{ background: "#060a0f" }}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-white font-black uppercase flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />{" "}
                Coluna
              </label>
              <select
                value={t.column}
                onChange={(e) =>
                  setT((x) => ({ ...x, column: e.target.value as any }))
                }
                className="mt-1.5 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs outline-none font-bold"
                style={{ background: "#060a0f" }}
              >
                {COLUMN_IDS.map((c) => (
                  <option key={c} value={c} style={{ background: "#060a0f" }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-white font-black uppercase flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Prazo
                Final
              </label>
              <input
                type="date"
                value={t.deadline}
                onChange={(e) =>
                  setT((x) => ({ ...x, deadline: e.target.value }))
                }
                className="mt-1.5 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs outline-none font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] text-white font-black uppercase flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Tags
              </label>
              <input
                value={t.tags.join(",")}
                onChange={(e) =>
                  setT((x) => ({
                    ...x,
                    tags: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
                className="mt-1.5 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs outline-none font-bold"
                placeholder="tag1, tag2"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-white font-black uppercase flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white" /> Descrií§í£o
            </label>
            <textarea
              value={t.desc}
              onChange={(e) => setT((x) => ({ ...x, desc: e.target.value }))}
              rows={3}
              className="mt-1.5 w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs outline-none resize-none font-medium"
            />
          </div>
          {/* CHECKLIST */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <label className="text-[9px] text-white font-black uppercase">
                  Checklist
                </label>
                {t.checklist.length > 0 && (
                  <span className="text-[9px] text-white font-black">
                    {checkPct}%
                  </span>
                )}
              </div>
              <button
                onClick={suggestChecklist}
                className="text-[9px] text-purple-400 hover:text-purple-300 font-black uppercase flex items-center gap-1"
              >
                <Bot className="w-3 h-3" /> IA Sugerir
              </button>
            </div>
            {t.checklist.length > 0 && (
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3 border border-white/5">
                <div
                  className="h-full bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                  style={{ width: `${checkPct}%` }}
                />
              </div>
            )}
            {showAiChecklist && (
              <div className="mb-3 p-3 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                <p className="text-purple-400 text-[9px] font-black uppercase mb-2">
                  ðŸ¤– Checklist sugerido pela IA:
                </p>
                {aiChecklist.map((item, i) => (
                  <p key={i} className="text-white text-[10px] py-1 font-bold">
                    â€¢ {item}
                  </p>
                ))}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setT((x) => ({
                        ...x,
                        checklist: [
                          ...x.checklist,
                          ...aiChecklist.map((text, i) => ({
                            id: (Date.now() + i).toString(),
                            text,
                            done: false,
                          })),
                        ],
                      }));
                      setShowAiChecklist(false);
                    }}
                    className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[9px] font-black uppercase rounded-lg hover:bg-purple-500/30"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => setShowAiChecklist(false)}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase rounded-lg hover:bg-white/10"
                  >
                    Ignorar
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              {t.checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-white/[0.08] border border-white/10 rounded-2xl group transition-all hover:bg-white/[0.12] hover:border-white/30 shadow-lg"
                >
                  <button
                    onClick={() =>
                      setT((x) => ({
                        ...x,
                        checklist: x.checklist.map((c) =>
                          c.id === item.id ? { ...c, done: !c.done } : c,
                        ),
                      }))
                    }
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${item.done ? "bg-emerald-500 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" : "border-white border-opacity-100 shadow-[0_0_5px_rgba(255,255,255,0.2)]"}`}
                  >
                    {item.done && (
                      <span className="text-black text-[10px] font-black">
                        âœ“
                      </span>
                    )}
                  </button>
                  <span
                    className={`flex-1 text-sm font-black tracking-tight ${item.done ? "line-through text-white/40" : "text-white"}`}
                  >
                    {item.text}
                  </span>
                  <button
                    onClick={() =>
                      setT((x) => ({
                        ...x,
                        checklist: x.checklist.filter((c) => c.id !== item.id),
                      }))
                    }
                    className="opacity-0 group-hover:opacity-100 p-2 text-white/40 hover:text-red-400 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                value={newCheck}
                onChange={(e) => setNewCheck(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newCheck.trim()) {
                    setT((x) => ({
                      ...x,
                      checklist: [
                        ...x.checklist,
                        {
                          id: Date.now().toString(),
                          text: newCheck.trim(),
                          done: false,
                        },
                      ],
                    }));
                    setNewCheck("");
                  }
                }}
                className="flex-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none placeholder:text-white/20"
                placeholder="Adicionar item..."
              />
              <button
                onClick={() => {
                  if (!newCheck.trim()) return;
                  setT((x) => ({
                    ...x,
                    checklist: [
                      ...x.checklist,
                      {
                        id: Date.now().toString(),
                        text: newCheck.trim(),
                        done: false,
                      },
                    ],
                  }));
                  setNewCheck("");
                }}
                className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* COMMENTS */}
          <div>
            <label className="text-[9px] text-white/30 font-black uppercase">
              Comentí¡rios ({t.comments.length})
            </label>
            <div className="space-y-2 mt-2">
              {t.comments.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-white/[0.02] border border-white/5 rounded-xl"
                >
                  <p className="text-white/70 text-xs">{c.text}</p>
                  <p className="text-white/20 text-[9px] mt-1">{c.date}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newComment.trim()) {
                    setT((x) => ({
                      ...x,
                      comments: [
                        ...x.comments,
                        {
                          id: Date.now().toString(),
                          text: newComment.trim(),
                          date: new Date().toLocaleString("pt-BR"),
                        },
                      ],
                    }));
                    setNewComment("");
                  }
                }}
                className="flex-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none placeholder:text-white/20"
                placeholder="Adicionar comentí¡rio..."
              />
              <button
                onClick={() => {
                  if (!newComment.trim()) return;
                  setT((x) => ({
                    ...x,
                    comments: [
                      ...x.comments,
                      {
                        id: Date.now().toString(),
                        text: newComment.trim(),
                        date: new Date().toLocaleString("pt-BR"),
                      },
                    ],
                  }));
                  setNewComment("");
                }}
                className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/5 flex-shrink-0">
          <button
            onClick={() => onSave(t)}
            className="w-full py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-500/30 transition-all"
          >
            Salvar Tarefa
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// â”€â”€â”€ Financial Dashboard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const EXPENSE_CATEGORIES = [
  { name: "Moradia", color: "#3b82f6" },
  { name: "Alimentaí§í£o", color: "#f97316" },
  { name: "Transporte", color: "#06b6d4" },
  { name: "Lazer", color: "#a855f7" },
  { name: "Conhecimento", color: "#22c55e" },
  { name: "Assinaturas", color: "#ec4899" },
  { name: "Saíºde", color: "#ef4444" },
  { name: "Roupas", color: "#eab308" },
  { name: "Outros", color: "#6b7280" },
];
const RANK_LABELS = [
  "Novato",
  "Aprendiz",
  "Veterano",
  "Elite",
  "Mestre",
  "Lendário",
];
function getRank(level: number) {
  return RANK_LABELS[Math.min(Math.floor(level / 5), RANK_LABELS.length - 1)];
}
function parseBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function nlpParseTransaction(text: string): {
  type: "entrada" | "saida";
  value: number;
  category: string;
  desc: string;
} | null {
  const lower = text.toLowerCase();
  const valueMatch = text.match(/(\d+[\.,]?\d*)/);
  if (!valueMatch) return null;
  const value = parseFloat(valueMatch[1].replace(",", "."));
  if (isNaN(value) || value <= 0) return null;
  // Income keywords
  const isEntrada =
    /recebi|salí¡rio|salario|ganhei|consegui|peguei|me deu|me deram| deu |caiu na|transferiram|depositaram|pix chegou|vendi|venda|bonus|bí´nus|comissí£o|comissao|lucro|entrada|renda|freelance|pagaram|pix recebi/i.test(
      lower,
    );
  // Expense keywords
  const isSaida =
    /gastei|comprei|paguei|fui|saiu|descontou|debitou|tirei|paguei|cobrou|cobrado/i.test(
      lower,
    );
  const type: "entrada" | "saida" = isEntrada && !isSaida ? "entrada" : "saida";

  let category = "Outros";
  if (
    /uber|taxi|í´nibus|onibus|metro|gasolina|combustí­vel|passagem|transporte/i.test(
      lower,
    )
  )
    category = "Transporte";
  else if (
    /comida|lanche|restaurante|ifood|delivery|almoí§o|jantar|cafí©|supermercado|mercado|alimentaí§/i.test(
      lower,
    )
  )
    category = "Alimentaí§í£o";
  else if (
    /aluguel|condomí­nio|luz|agua|internet|casa|moradia|iptu/i.test(lower)
  )
    category = "Moradia";
  else if (/netflix|spotify|youtube|prime|hbo|disney|assinatura/i.test(lower))
    category = "Assinaturas";
  else if (/academia|mí©dico|remí©dio|farmí¡cia|saíºde|plano/i.test(lower))
    category = "Saíºde";
  else if (/roupas|roupa|tíªnis|camisa|calí§a|loja|shopping/i.test(lower))
    category = "Roupas";
  else if (
    /curso|livro|udemy|alura|estudo|escola|faculdade|conhecimento/i.test(lower)
  )
    category = "Conhecimento";
  else if (/cinema|show|festa|bar|jogos|lazer|passeio/i.test(lower))
    category = "Lazer";
  else if (isEntrada) category = "Receita";
  return { type, value, category, desc: text };
}

function FinancialDashboard({
  onExit,
  playerStats,
  setPlayerStats,
  transactions,
  setTransactions,
  budget,
  setBudget,
  creditCards,
  setCreditCards,
  financialGoals,
  setFinancialGoals,
}: {
  onExit: () => void;
  playerStats: PlayerStats;
  setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  transactions: FinancialTransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<FinancialTransaction[]>>;
  budget: number;
  setBudget: (v: number) => void;
  creditCards: CreditCardBill[];
  setCreditCards: React.Dispatch<React.SetStateAction<CreditCardBill[]>>;
  financialGoals: FinancialGoal[];
  setFinancialGoals: React.Dispatch<React.SetStateAction<FinancialGoal[]>>;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "ai">("overview");
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [aiInputText, setAiInputText] = useState("");
  const [aiMessages, setAiMessages] = useState<
    { type: "user" | "ai"; text: string; accent?: string }[]
  >([
    {
      type: "ai",
      text: 'Olí¡! Sou sua IA Financeira ðŸ¤–\n\nMe diga o que gastou ou recebeu!\nEx: "Gastei 50 no Uber" ou "Recebi 3000 de salí¡rio"',
      accent: "blue",
    },
  ]);

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthlyTx = transactions.filter((t) => t.date.startsWith(currentMonth));
  const totalEntradas = monthlyTx
    .filter((t) => t.type === "entrada")
    .reduce((s, t) => s + t.value, 0);
  const totalSaidas = monthlyTx
    .filter((t) => t.type === "saida")
    .reduce((s, t) => s + t.value, 0);
  const saldo = totalEntradas - totalSaidas;
  const budgetPercent =
    budget > 0 ? Math.min((totalSaidas / budget) * 100, 100) : 0;
  const budgetOver = totalSaidas > budget && budget > 0;
  const categoryTotals = EXPENSE_CATEGORIES.map((cat) => ({
    ...cat,
    total: monthlyTx
      .filter((t) => t.type === "saida" && t.category === cat.name)
      .reduce((s, t) => s + t.value, 0),
  })).filter((c) => c.total > 0);
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d
      .toLocaleString("pt-BR", { month: "short" })
      .replace(".", "");
    return {
      name: label,
      Entradas: transactions
        .filter((t) => t.date.startsWith(key) && t.type === "entrada")
        .reduce((s, t) => s + t.value, 0),
      Saídas: transactions
        .filter((t) => t.date.startsWith(key) && t.type === "saida")
        .reduce((s, t) => s + t.value, 0),
    };
  });

  const handleAiSend = () => {
    if (!aiInputText.trim()) return;
    const userMsg = aiInputText.trim();
    setAiMessages((prev) => [...prev, { type: "user", text: userMsg }]);
    setAiInputText("");
    setTimeout(() => {
      const parsed = nlpParseTransaction(userMsg);
      if (parsed) {
        setTransactions((prev) => [
          {
            id: Date.now().toString(),
            ...parsed,
            date: new Date().toISOString().slice(0, 10),
            paymentMethod: "IA",
          },
          ...prev,
        ]);
        setPlayerStats((prev: any) => ({
          ...prev,
          gold: (prev.gold || 0) + 15,
        }));
        setAiMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: `âœ… ${parsed.type === "entrada" ? "Receita" : "Despesa"} registrada!\nðŸ“‚ Categoria: ${parsed.category}\nðŸ’° Valor: ${parseBRL(parsed.value)}\nðŸª™ +15 moedas ganhas!`,
            accent: parsed.type === "entrada" ? "emerald" : "orange",
          },
        ]);
      } else {
        setAiMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: 'Ní£o consegui entender ðŸ¤”\nTente: "Gastei 50 no Uber" ou "Recebi 2000 de salí¡rio"',
            accent: "red",
          },
        ]);
      }
    }, 500);
  };
  const getInsights = () => {
    const ins: string[] = [];
    if (budgetOver)
      ins.push(
        `âš ï¸ Orí§amento ultrapassado em ${parseBRL(totalSaidas - budget)}!`,
      );
    if (categoryTotals.length > 0)
      ins.push(
        `ðŸ“Š Maior gasto: ${[...categoryTotals].sort((a, b) => b.total - a.total)[0].name}`,
      );
    if (totalSaidas > totalEntradas && totalEntradas > 0)
      ins.push("ðŸ“‰ Você gastou mais do que recebeu esse míªs!");
    if (saldo > 0 && totalEntradas > 0)
      ins.push(`ðŸ’¡ Saldo positivo de ${parseBRL(saldo)} esse míªs!`);
    if (ins.length === 0)
      ins.push("Adicione transaí§íµes para ver insights personalizados!");
    return ins;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed inset-0 z-[300] bg-[#030508] overflow-y-auto scrollbar-thin"
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-500/8 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-28">
        {/* HEADER */}
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
              Centro <span className="text-emerald-400">Financeiro</span>
            </h1>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-0.5">
              Gestí£o Estratí©gica de Riqueza
            </p>
          </div>
          <button
            onClick={onExit}
            className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* PROFILE */}
        <div className="p-4 bg-white/3 border border-white/10 rounded-3xl mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <Crown className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-black">
              {playerStats.name || "Guerreiro"}
            </p>
            <p className="text-emerald-400 text-xs font-black uppercase">
              {getRank(playerStats.level)} â€¢ Ní­vel {playerStats.level}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              {
                emoji: "ðŸ”¥",
                label: "Sequíªncia",
                value: `${playerStats.level} dias`,
                cls: "orange",
              },
              {
                emoji: "ðŸª™",
                label: "Moedas",
                value: (playerStats.gold || 0).toLocaleString(),
                cls: "yellow",
              },
              {
                emoji: "â¤ï¸",
                label: "Energia",
                value: Math.floor(playerStats.hp || 0),
                cls: "red",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`flex items-center gap-2 px-3 py-2 bg-${s.cls}-500/10 border border-${s.cls}-500/20 rounded-xl`}
              >
                <span>{s.emoji}</span>
                <div>
                  <p className="text-[9px] text-white/40">{s.label}</p>
                  <p className={`text-${s.cls}-400 font-black text-sm`}>
                    {s.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* TABS */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "overview" ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" : "bg-white/5 border border-white/10 text-white/40 hover:text-white"}`}
          >
            ðŸ“Š Visí£o Geral
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "ai" ? "bg-blue-500/20 border border-blue-500/30 text-blue-400" : "bg-white/5 border border-white/10 text-white/40 hover:text-white"}`}
          >
            ðŸ¤– IA Financeira
          </button>
        </div>

        {activeTab === "overview" && (
          <>
            {/* SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                {
                  label: "Entradas",
                  value: totalEntradas,
                  icon: "ðŸ“ˆ",
                  c: "emerald",
                },
                {
                  label: "Saí­das",
                  value: totalSaidas,
                  icon: "ðŸ“‰",
                  c: "red",
                },
                {
                  label: "Saldo",
                  value: saldo,
                  icon: "ðŸ’°",
                  c: saldo >= 0 ? "emerald" : "red",
                },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  whileHover={{ scale: 1.02 }}
                  className={`p-5 bg-${card.c}-500/10 border border-${card.c}-500/20 rounded-3xl`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{card.icon}</span>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                      {card.label}
                    </p>
                  </div>
                  <p
                    className={`text-2xl font-black text-${card.c}-400 tracking-tight`}
                  >
                    {parseBRL(card.value)}
                  </p>
                  <p className="text-[10px] text-white/20 mt-1">Este míªs</p>
                </motion.div>
              ))}
            </div>
            {/* BUDGET */}
            <div
              className={`p-5 border rounded-3xl mb-6 ${budgetOver ? "bg-red-500/5 border-red-500/20" : "bg-white/[0.02] border-white/10"}`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {budgetOver ? "âš ï¸" : "ðŸŽ¯"}
                  </span>
                  <p className="text-white font-black text-sm">
                    Orí§amento Mensal
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-white/40 text-xs">
                    {parseBRL(totalSaidas)} de {parseBRL(budget)}
                  </p>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-24 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold outline-none"
                  />
                </div>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${budgetPercent}%` }}
                  className={`h-full rounded-full ${budgetOver ? "bg-red-500" : budgetPercent > 70 ? "bg-orange-500" : "bg-emerald-500"}`}
                />
              </div>
              {budgetOver && (
                <p className="text-red-400 text-[10px] font-black mt-2 uppercase">
                  âš ï¸ Orí§amento ultrapassado!
                </p>
              )}
            </div>
            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-3xl">
                <p className="text-white font-black text-sm mb-4 uppercase tracking-widest">
                  ðŸ• Gastos por Categoria
                </p>
                {categoryTotals.length === 0 ? (
                  <div className="flex items-center justify-center h-40 text-white/20 text-xs">
                    Sem despesas este míªs
                  </div>
                ) : (
                  <>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryTotals}
                            dataKey="total"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={75}
                            strokeWidth={0}
                          >
                            {categoryTotals.map((e, i) => (
                              <Cell key={i} fill={e.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(v: any) => parseBRL(v)}
                            contentStyle={{
                              background: "#050505",
                              border: "1px solid #ffffff15",
                              borderRadius: "12px",
                              fontSize: "10px",
                              fontWeight: 900,
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-3">
                      {categoryTotals.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-2">
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: cat.color }}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between text-[10px] font-bold mb-0.5">
                              <span className="text-white/60">{cat.name}</span>
                              <span className="text-white">
                                {parseBRL(cat.total)}
                              </span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${totalSaidas > 0 ? (cat.total / totalSaidas) * 100 : 0}%`,
                                  background: cat.color,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-3xl">
                <p className="text-white font-black text-sm mb-4 uppercase tracking-widest">
                  ðŸ“ˆ Evoluí§í£o (6 Meses)
                </p>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={last6Months}>
                      <XAxis
                        dataKey="name"
                        stroke="#ffffff20"
                        fontSize={9}
                        tickLine={false}
                        axisLine={false}
                        fontWeight={900}
                      />
                      <YAxis
                        stroke="#ffffff10"
                        fontSize={8}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `R$${v}`}
                      />
                      <Tooltip
                        formatter={(v: any) => parseBRL(v)}
                        contentStyle={{
                          background: "#050505",
                          border: "1px solid #ffffff15",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: 900,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Entradas"
                        stroke="#34d399"
                        strokeWidth={2.5}
                        dot={{ fill: "#34d399", strokeWidth: 0, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Saí­das"
                        stroke="#f87171"
                        strokeWidth={2.5}
                        dot={{ fill: "#f87171", strokeWidth: 0, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-1 bg-emerald-400 rounded" />
                    <span className="text-[10px] text-white/40">Entradas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-1 bg-red-400 rounded" />
                    <span className="text-[10px] text-white/40">Saí­das</span>
                  </div>
                </div>
              </div>
            </div>
            {/* CREDIT CARDS */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-black text-sm uppercase tracking-widest">
                  ðŸ’³ Faturas de Cartí£o
                </p>
                <button
                  onClick={() => setShowCardModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white text-[10px] font-black uppercase transition-all"
                >
                  <Plus className="w-3 h-3" /> Adicionar
                </button>
              </div>
              {creditCards.length === 0 ? (
                <div className="p-6 border border-dashed border-white/10 rounded-2xl text-center text-white/20 text-xs">
                  Nenhum cartí£o cadastrado
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {creditCards.map((card) => (
                    <div
                      key={card.id}
                      className={`p-4 border rounded-2xl relative ${card.status === "Pago" ? "bg-emerald-500/5 border-emerald-500/20" : "bg-white/[0.02] border-white/10"}`}
                    >
                      <button
                        onClick={() =>
                          setCreditCards((prev) =>
                            prev.filter((c) => c.id !== card.id),
                          )
                        }
                        className="absolute top-3 right-3 p-1 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <p className="font-black text-white text-sm">
                        {card.bankName}
                      </p>
                      <p className="text-xl font-black text-white mt-1">
                        {parseBRL(card.value)}
                      </p>
                      <p className="text-white/30 text-[10px] mt-1">
                        Vence dia {card.dueDate}
                      </p>
                      <button
                        onClick={() =>
                          setCreditCards((prev) =>
                            prev.map((c) =>
                              c.id === card.id
                                ? {
                                    ...c,
                                    status:
                                      c.status === "Pago" ? "Pendente" : "Pago",
                                  }
                                : c,
                            ),
                          )
                        }
                        className={`mt-3 px-2 py-1 rounded-lg text-[9px] font-black uppercase ${card.status === "Pago" ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"}`}
                      >
                        {card.status}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* GOALS */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-black text-sm uppercase tracking-widest">
                  ðŸ† Metas Financeiras
                </p>
                <button
                  onClick={() => setShowGoalModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white text-[10px] font-black uppercase transition-all"
                >
                  <Plus className="w-3 h-3" /> Nova Meta
                </button>
              </div>
              {financialGoals.length === 0 ? (
                <div className="p-6 border border-dashed border-white/10 rounded-2xl text-center text-white/20 text-xs">
                  Nenhuma meta definida
                </div>
              ) : (
                <div className="space-y-3">
                  {financialGoals.map((goal) => {
                    const pct = Math.min(
                      (goal.current / goal.target) * 100,
                      100,
                    );
                    return (
                      <div
                        key={goal.id}
                        className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-white font-black text-sm">
                            {goal.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={goal.current}
                              onChange={(e) =>
                                setFinancialGoals((prev) =>
                                  prev.map((g) =>
                                    g.id === goal.id
                                      ? {
                                          ...g,
                                          current: Number(e.target.value),
                                        }
                                      : g,
                                  ),
                                )
                              }
                              className="w-20 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                            />
                            <button
                              onClick={() =>
                                setFinancialGoals((prev) =>
                                  prev.filter((g) => g.id !== goal.id),
                                )
                              }
                              className="p-1 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-all"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-white/40 mb-1">
                          <span>{parseBRL(goal.current)}</span>
                          <span>{parseBRL(goal.target)}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: `${pct}%` }}
                            className={`h-full rounded-full ${pct >= 100 ? "bg-emerald-400" : "bg-blue-400"}`}
                          />
                        </div>
                        <p className="text-[10px] text-white/30 mt-1">
                          {pct.toFixed(0)}% concluí­do
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* TRANSACTIONS LIST */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-black text-sm uppercase tracking-widest">
                  ðŸ“‹ Transaí§íµes Recentes
                </p>
                <button
                  onClick={() => setShowTransactionModal(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase transition-all hover:bg-emerald-500/30"
                >
                  <Plus className="w-3 h-3" /> Nova
                </button>
              </div>
              {transactions.length === 0 ? (
                <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center text-white/20 text-xs">
                  Nenhuma transaí§í£o. Use o botí£o abaixo ou a IA!
                </div>
              ) : (
                <div className="space-y-2">
                  {transactions.slice(0, 15).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${tx.type === "entrada" ? "bg-emerald-500/10" : "bg-red-500/10"}`}
                      >
                        {tx.type === "entrada" ? "ðŸ“¥" : "ðŸ“¤"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-bold truncate">
                          {tx.desc}
                        </p>
                        <p className="text-white/30 text-[10px]">
                          {tx.category} â€¢ {tx.date} â€¢ {tx.paymentMethod}
                        </p>
                      </div>
                      <p
                        className={`font-black text-sm flex-shrink-0 ${tx.type === "entrada" ? "text-emerald-400" : "text-red-400"}`}
                      >
                        {tx.type === "entrada" ? "+" : "-"}
                        {parseBRL(tx.value)}
                      </p>
                      <button
                        onClick={() =>
                          setTransactions((prev) =>
                            prev.filter((t) => t.id !== tx.id),
                          )
                        }
                        className="p-1 text-white/10 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "ai" && (
          <div className="space-y-5">
            <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
              <p className="text-blue-400 font-black text-sm uppercase tracking-widest mb-3">
                ðŸ”¬ Aní¡lise Inteligente
              </p>
              <div className="space-y-2">
                {getInsights().map((ins, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white/3 border border-white/5 rounded-xl text-white/70 text-xs font-medium"
                  >
                    {ins}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col h-[400px] bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-black text-xs">
                    Assistente Financeiro IA
                  </p>
                  <p className="text-white/30 text-[9px]">
                    Interpreta linguagem natural
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {aiMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs font-medium whitespace-pre-line ${msg.type === "user" ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-100 rounded-br-none" : msg.accent === "emerald" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 rounded-bl-none" : msg.accent === "orange" ? "bg-orange-500/10 border border-orange-500/20 text-orange-100 rounded-bl-none" : msg.accent === "red" ? "bg-red-500/10 border border-red-500/20 text-red-200 rounded-bl-none" : "bg-blue-500/10 border border-blue-500/20 text-blue-100 rounded-bl-none"}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-white/5 flex gap-2">
                <input
                  value={aiInputText}
                  onChange={(e) => setAiInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiSend()}
                  placeholder='Ex: "Gastei 50 no Uber"'
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none placeholder:text-white/20 focus:border-blue-500/40"
                />
                <button
                  onClick={handleAiSend}
                  className="px-4 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase hover:bg-blue-500/30 transition-all"
                >
                  Enviar
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Gastei 50 no Uber",
                "Paguei 120 de luz",
                "Recebi 3000 de salí¡rio",
                "Comprei roupa por 200",
              ].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setAiInputText(ex)}
                  className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-left text-white/40 text-[10px] font-medium hover:border-white/20 hover:text-white/70 transition-all"
                >
                  ðŸ’¬ {ex}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FIXED BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-linear-to-t from-[#030508] to-transparent">
        <button
          onClick={() => setShowTransactionModal(true)}
          className="w-full max-w-xl mx-auto flex items-center justify-center gap-3 py-4 bg-linear-to-r from-emerald-600 to-emerald-500 text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(52,211,153,0.3)] hover:from-emerald-500 hover:to-emerald-400 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" /> Nova Transaí§í£o
        </button>
      </div>

      <AnimatePresence>
        {showTransactionModal && (
          <FinancialTransactionModal
            onClose={() => setShowTransactionModal(false)}
            onSave={(tx) => {
              setTransactions((prev) => [
                {
                  ...tx,
                  id: Date.now().toString(),
                  date: tx.date || new Date().toISOString().slice(0, 10),
                },
                ...prev,
              ]);
              if (tx.type === "entrada")
                setPlayerStats((prev: any) => ({
                  ...prev,
                  gold: (prev.gold || 0) + 15,
                }));
              setShowTransactionModal(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCardModal && (
          <FinancialCardModal
            onClose={() => setShowCardModal(false)}
            onSave={(card) => {
              setCreditCards((prev) => [
                { ...card, id: Date.now().toString(), status: "Pendente" },
                ...prev,
              ]);
              setShowCardModal(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showGoalModal && (
          <FinancialGoalModal
            onClose={() => setShowGoalModal(false)}
            onSave={(goal) => {
              setFinancialGoals((prev) => [
                { ...goal, id: Date.now().toString() },
                ...prev,
              ]);
              setShowGoalModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FinancialTransactionModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (tx: Omit<FinancialTransaction, "id">) => void;
}) {
  const [type, setType] = useState<"entrada" | "saida">("saida");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].name);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState("PIX");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-3000 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#060a0f] border border-white/10 rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-black text-xl uppercase">
            Nova Transaí§í£o
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setType("entrada")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase ${type === "entrada" ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" : "bg-white/5 border border-white/10 text-white/40"}`}
            >
              ðŸ“¥ Entrada
            </button>
            <button
              onClick={() => setType("saida")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase ${type === "saida" ? "bg-red-500/20 border border-red-500/30 text-red-400" : "bg-white/5 border border-white/10 text-white/40"}`}
            >
              ðŸ“¤ Saí­da
            </button>
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Valor (R$)
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-emerald-500/40"
              placeholder="0,00"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
              style={{ background: "#060a0f" }}
            >
              {EXPENSE_CATEGORIES.map((c) => (
                <option
                  key={c.name}
                  value={c.name}
                  style={{ background: "#060a0f" }}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Descrií§í£o
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
              placeholder="Ex: Almoí§o"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Forma de Pagamento
            </label>
            <div className="flex gap-2 mt-1">
              {["Cartí£o", "PIX", "Dinheiro"].map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase ${paymentMethod === m ? "bg-blue-500/20 border border-blue-500/30 text-blue-400" : "bg-white/5 border border-white/10 text-white/40"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            if (!value || isNaN(Number(value)) || Number(value) <= 0) return;
            onSave({
              type,
              value: Number(value),
              category,
              desc: desc || category,
              date,
              paymentMethod,
            });
          }}
          className="w-full mt-6 py-3.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-emerald-500/30 transition-all"
        >
          Salvar Transaí§í£o
        </button>
      </motion.div>
    </motion.div>
  );
}

function FinancialCardModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (c: Omit<CreditCardBill, "id" | "status">) => void;
}) {
  const [bankName, setBankName] = useState("");
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState(10);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-3000 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-sm bg-[#060a0f] border border-white/10 rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-black text-xl uppercase">
            Adicionar Cartí£o
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Banco
            </label>
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
              placeholder="Ex: Nubank"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Valor da Fatura (R$)
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Dia de Vencimento
            </label>
            <input
              type="number"
              min={1}
              max={31}
              value={dueDate}
              onChange={(e) => setDueDate(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
            />
          </div>
        </div>
        <button
          onClick={() => {
            if (!bankName || !value) return;
            onSave({ bankName, value: Number(value), dueDate });
          }}
          className="w-full mt-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-black text-xs uppercase rounded-2xl hover:bg-blue-500/30 transition-all"
        >
          Salvar Cartí£o
        </button>
      </motion.div>
    </motion.div>
  );
}

function FinancialGoalModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (g: Omit<FinancialGoal, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("0");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-3000 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-sm bg-[#060a0f] border border-white/10 rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-black text-xl uppercase">
            Nova Meta ðŸ†
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Meta
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
              placeholder="Ex: Guardar R$ 10.000"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Valor Total (R$)
            </label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-white/40 uppercase">
              Valor Atual (R$)
            </label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none"
            />
          </div>
        </div>
        <button
          onClick={() => {
            if (!title || !target) return;
            onSave({ title, target: Number(target), current: Number(current) });
          }}
          className="w-full mt-6 py-3 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-black text-xs uppercase rounded-2xl hover:bg-yellow-500/30 transition-all"
        >
          Salvar Meta
        </button>
      </motion.div>
    </motion.div>
  );
}

// â”€â”€â”€ Create Training Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CreateTrainingModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (training: Omit<Training, "done">) => void;
}) {
  const [day, setDay] = useState("SEG");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("60 min");
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", series: 0, kg: 0, reps: 0, done: false },
  ]);

  const addExercise = () =>
    setExercises((prev) => [
      ...prev,
      { name: "", series: 0, kg: 0, reps: 0, done: false },
    ]);
  const removeExercise = (idx: number) =>
    setExercises((prev) => prev.filter((_, i) => i !== idx));
  const updateExercise = (
    idx: number,
    field: keyof Exercise,
    val: string | number,
  ) =>
    setExercises((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [field]: val } : e)),
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-5000"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl z-5001 overflow-hidden max-h-[85vh] flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-neon-green to-neon-yellow" />
            <div className="p-6 overflow-y-auto scrollbar-thin">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase italic">
                  Novo Plano de Treino
                </h3>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                      Dia Atribuí­do
                    </label>
                    <select
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors text-white appearance-none"
                    >
                      {["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"].map(
                        (d) => (
                          <option
                            key={d}
                            value={d}
                            className="bg-black text-white"
                          >
                            {d}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                      Estimativa Tempo
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Ex: 60 min"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    Identificaí§í£o do Treino
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Protocolo Hipertrofia A"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      Set de Exercí­cios
                    </label>
                    <button
                      onClick={addExercise}
                      className="flex items-center gap-1 text-[9px] font-black text-neon-green uppercase tracking-widest hover:text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Adicionar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {exercises.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={ex.name}
                            onChange={(e) =>
                              updateExercise(idx, "name", e.target.value)
                            }
                            placeholder={`Exercí­cio ${idx + 1}`}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                          />
                          <button
                            onClick={() => removeExercise(idx)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-white/30 hover:text-red-500" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[8px] font-black uppercase text-white/30 mb-1">
                              Sí©rie
                            </label>
                            <input
                              type="number"
                              value={ex.series}
                              onChange={(e) =>
                                updateExercise(
                                  idx,
                                  "series",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none focus:border-neon-green"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-black uppercase text-white/30 mb-1">
                              Pí©s/KG
                            </label>
                            <input
                              type="number"
                              value={ex.kg}
                              onChange={(e) =>
                                updateExercise(
                                  idx,
                                  "kg",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none focus:border-neon-green"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-black uppercase text-white/30 mb-1">
                              Reps
                            </label>
                            <input
                              type="number"
                              value={ex.reps}
                              onChange={(e) =>
                                updateExercise(
                                  idx,
                                  "reps",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none focus:border-neon-green"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onCreate({
                      day,
                      name,
                      duration,
                      exercises: exercises.filter((e) => e.name.trim() !== ""),
                    });
                    onClose();
                    // Reset
                    setName("");
                    setExercises([
                      { name: "", series: 0, kg: 0, reps: 0, done: false },
                    ]);
                  }}
                  className="w-full mt-4 bg-neon-green text-black font-black uppercase tracking-widest py-4 rounded-xl hover:shadow-[0_0_20px_rgba(56,242,127,0.4)] transition-all flex justify-center items-center gap-2"
                >
                  <Swords className="w-4 h-4" />
                  Finalizar Protocolo de Treino
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// â”€â”€â”€ KRONOS DASHBOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const MonthProgressChart = ({
  habits,
}: {
  habits: { id: number; name: string; completed: number[] }[];
}) => {
  // Dynamic calculation: Calculate percentage per day based on real habit data
  const daysCount = 60; // Total points on chart for smoothness
  const currentMonthDays = 31;

  const getDataFromHabits = () => {
    const dataPoints = [];
    for (let i = 0; i < daysCount; i++) {
      // Map 60 points to 31 days
      const dayIdx =
        Math.floor((i / (daysCount - 1)) * (currentMonthDays - 1)) + 1;

      if (habits.length === 0) {
        dataPoints.push(0);
        continue;
      }

      const completedCount = habits.filter((h) =>
        h.completed.includes(dayIdx),
      ).length;
      const percentage = (completedCount / habits.length) * 100;
      dataPoints.push(percentage);
    }
    return dataPoints;
  };

  const data = getDataFromHabits();
  // Calculate total global progress for the "Live" percentage
  const totalPossible = habits.length * 31;
  const totalCompleted = habits.reduce((acc, h) => acc + h.completed.length, 0);
  const globalProgress =
    totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  const pointsString = data
    .map((val, i) => `${(i / (data.length - 1)) * 100},${100 - val * 0.9}`)
    .join(" ");

  return (
    <div className="w-full bg-black/60 border border-white/5 rounded-3xl p-4 md:p-8 mb-6 md:mb-10 relative overflow-hidden backdrop-blur-3xl">
      <div className="flex justify-between items-start mb-6 md:mb-10 relative z-10">
        <div className="space-y-1">
          <h3 className="text-xs md:text-base font-black uppercase tracking-[0.3em] text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]">
            Progresso de Desempenho
          </h3>
          <p className="text-[8px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest">
            Protocolo de Eficiíªncia Biolí³gica v4.0
          </p>
        </div>
        <div className="text-right">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-red-600/10 blur-2xl rounded-full" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={globalProgress}
              className="text-3xl md:text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10"
            >
              {globalProgress}%
            </motion.span>
          </div>
        </div>
      </div>

      <div className="flex h-48 md:h-64 relative group">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between h-full pr-4 text-[8px] md:text-[10px] font-black text-white/40 font-mono">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        <div className="flex-1 relative border-l border-b border-white/5">
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((val) => (
            <div
              key={val}
              className="absolute left-0 right-0 h-px bg-white/[0.05]"
              style={{ bottom: `${val}%` }}
            />
          ))}

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="cyberRedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area */}
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              d={`M 0,100 L 0,${100 - data[0] * 0.9} ${data.map((val, i) => `L ${(i / (data.length - 1)) * 100},${100 - val * 0.9}`).join(" ")} L 100,100 Z`}
              fill="url(#cyberRedGradient)"
            />

            {/* Line */}
            <motion.polyline
              key={pointsString}
              points={pointsString}
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]"
            />
          </svg>
        </div>
      </div>

      {/* X-Axis Markers (Dots) */}
      <div className="flex justify-between items-center mt-6 px-14">
        {Array.from({ length: 31 }).map((_, i) => {
          const hasActivity = habits.some((h) => h.completed.includes(i + 1));
          return (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-500 ${hasActivity ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]" : "bg-white/20"}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const HabitMonthlyGrid = ({
  habits,
  onToggle,
  isAdding,
  setIsAdding,
  editingId,
  setEditingId,
  input,
  setInput,
  onSave,
  onDelete,
}: {
  habits: { id: number; name: string; completed: number[] }[];
  onToggle: (id: number, day: number) => void;
  isAdding: boolean;
  setIsAdding: (v: boolean) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  input: string;
  setInput: (v: string) => void;
  onSave: (id?: number) => void;
  onDelete: (id: number) => void;
}) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="w-full bg-black/40 border border-white/5 rounded-3xl p-4 md:p-8 relative overflow-hidden backdrop-blur-3xl">
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <div>
          <h3 className="text-xs md:text-base font-black uppercase tracking-[0.3em] text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            Cí­rculo de Hí¡bitos
          </h3>
          <p className="text-[8px] md:text-[10px] text-white/20 font-bold uppercase tracking-widest mt-1">
            Matriz de aquisií§í£o e consistíªncia
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-white/30 italic">
            Aquisií§í£o 31d
          </span>
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
              setInput("");
            }}
            className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-[0_4px_15px_rgba(220,38,38,0.4)] hover:scale-110 active:scale-90 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-none pb-4">
        <div className="min-w-[850px]">
          {/* Time markings above grid (Days 1 to 31) */}
          <div className="flex mb-8 items-end">
            <div className="w-48 md:w-56 lg:w-64 flex-shrink-0" />
            <div className="flex-1 px-4 relative">
              <div className="h-px w-full bg-white/5 absolute top-1/2 left-0" />
              <div
                className="grid gap-2 relative z-10"
                style={{ gridTemplateColumns: "repeat(31, minmax(0, 1fr))" }}
              >
                {days.map((d) => (
                  <div key={d} className="flex flex-col items-center">
                    <span className="text-[8px] md:text-[10px] font-black text-white/60 mb-2">
                      {d}
                    </span>
                    <div className="w-px h-2 bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-10">
            {isAdding && (
              <div className="flex items-center animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="w-full md:w-56 lg:w-64 flex-shrink-0 flex items-center gap-2 pr-6">
                  <input
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="INSERIR PROTOCOLO..."
                    className="bg-white/5 border border-red-900/40 rounded-xl px-4 py-2 text-[10px] md:text-[11px] font-black text-white w-full outline-none focus:border-red-500/50 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && onSave()}
                  />
                  <button
                    onClick={() => onSave()}
                    className="md:hidden px-4 py-2 bg-red-600 text-white rounded-xl font-black uppercase text-[10px] shadow-[0_0_15px_rgba(220,38,38,0.3)] active:scale-95 transition-all text-xs"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}

            {habits.map((habit) => {
              const prog = Math.round((habit.completed.length / 31) * 100);
              return (
                <div key={habit.id} className="flex items-center group">
                  {/* Habit name and mini progress bar */}
                  <div className="w-48 md:w-56 lg:w-64 flex-shrink-0 pr-6 lg:pr-10">
                    {editingId === habit.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          autoFocus
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="bg-white/5 border border-red-900/40 rounded-xl px-3 py-1.5 text-[10px] md:text-[11px] font-black text-white w-full outline-none focus:border-red-500/50 transition-all"
                          onKeyDown={(e) =>
                            e.key === "Enter" && onSave(habit.id)
                          }
                        />
                        <button
                          onClick={() => onSave(habit.id)}
                          className="md:hidden px-3 py-1.5 bg-red-600 text-white rounded-xl font-black uppercase text-[9px] shadow-[0_0_15px_rgba(220,38,38,0.3)] active:scale-95 transition-all"
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] md:text-[12px] font-black text-white/90 uppercase tracking-wide truncate">
                            {habit.name}
                          </span>
                          <span className="text-[8px] md:text-[10px] font-black text-red-500/60 font-mono">
                            {prog}%
                          </span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${prog}%` }}
                          />
                        </div>
                        <div className="absolute -left-6 lg:left-[-2.5rem] top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Edit3
                            onClick={() => {
                              setEditingId(habit.id);
                              setInput(habit.name);
                              setIsAdding(false);
                            }}
                            className="w-3 md:w-4 h-3 md:h-4 cursor-pointer text-white/10 hover:text-white"
                          />
                          <Trash2
                            onClick={() => onDelete(habit.id)}
                            className="w-3 md:w-4 h-3 md:h-4 cursor-pointer text-white/10 hover:text-red-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Grid of Dots (Checkmarks inside) */}
                  <div
                    className="flex-1 grid gap-1.5 md:gap-2 px-2 md:px-4"
                    style={{
                      gridTemplateColumns: "repeat(31, minmax(0, 1fr))",
                    }}
                  >
                    {days.map((d) => {
                      const isDone = habit.completed.includes(d);
                      return (
                        <div
                          key={d}
                          className="flex justify-center items-center h-6 md:h-10"
                        >
                          <motion.div
                            whileHover={{ scale: 1.25 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => onToggle(habit.id, d)}
                            className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                              isDone
                                ? "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.7)] border-red-400 border-[2px] md:border-[3px]"
                                : "bg-white/10 border-2 border-white/20 hover:border-red-500/50"
                            }`}
                          >
                            {isDone && (
                              <Check className="w-3 md:w-4 h-3 md:h-4 text-white" />
                            )}
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Aesthetic Blurs */}
      <div className="absolute -bottom-20 -right-20 w-40 md:w-80 h-40 md:h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};

const KronosDashboard = ({
  habits,
  onToggle,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
}: {
  habits: Habit[];
  onToggle: (id: number, day: number) => void;
  onClose: () => void;
  onAdd: (name: string) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [input, setInput] = useState("");

  const handleSave = (id?: number) => {
    if (!input.trim()) return;
    if (id) {
      onUpdate(id, input);
      setEditingId(null);
    } else {
      onAdd(input);
      setIsAdding(false);
    }
    setInput("");
  };

  return (
    <FullViewWrapper
      title="Central de Comando KRONOS"
      icon={Crown}
      color="border-red-600/50"
      onClose={onClose}
    >
      <div className="max-w-7xl mx-auto w-full pb-20 md:pb-32 px-2 md:px-4 selection:bg-red-500/30">
        <div className="mb-8 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-5xl font-black text-white uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Tarefas Diárias
            </h2>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 md:w-8 h-0.5 md:h-1 bg-red-600 rounded-full" />
              <p className="text-[7px] md:text-xs text-white/40 font-black uppercase tracking-[0.2em]">
                Acompanhe seu desempenho dií¡rio e complete objetivos para
                evoluir.
              </p>
            </div>
          </div>
          <div className="inline-block self-start md:self-auto">
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-red-600/5 border border-red-600/20 rounded-xl">
              <span className="text-[7px] md:text-[9px] font-black text-red-500 uppercase tracking-widest">
                SISTEMA ATIVO: PROTOCOLO 0x44
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-12">
          <MonthProgressChart habits={habits} />
          <HabitMonthlyGrid
            habits={habits}
            onToggle={onToggle}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingId={editingId}
            setEditingId={setEditingId}
            input={input}
            setInput={setInput}
            onSave={handleSave}
            onDelete={onDelete}
          />
        </div>
      </div>
    </FullViewWrapper>
  );
};

// â”€â”€â”€ Mode Selection Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ModeSelectionModal({
  isOpen,
  onClose,
  onStart,
}: {
  isOpen: boolean;
  onClose: () => void;
  onStart: (mode: BattleMode) => void;
}) {
  const [selected, setSelected] = useState<BattleMode | null>(null);
  const modes: {
    id: BattleMode;
    label: string;
    desc: string;
    icon: any;
    color: string;
    glow: string;
  }[] = [
    {
      id: "rotina",
      label: "Rotina",
      desc: "Complete suas missíµes dií¡rias",
      icon: Target,
      color: "from-red-500 to-orange-500",
      glow: "rgba(255,0,76,0.4)",
    },
    {
      id: "habitos",
      label: "Hí¡bitos",
      desc: "Fortaleí§a seus hí¡bitos",
      icon: Flame,
      color: "from-orange-400 to-yellow-400",
      glow: "rgba(255,145,0,0.4)",
    },
    {
      id: "treinos",
      label: "Treinos",
      desc: "Domine seu treino do dia",
      icon: Swords,
      color: "from-cyan-400 to-blue-500",
      glow: "rgba(0,242,255,0.4)",
    },
  ];
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-2000"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl z-2001 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-neon-green via-neon-yellow to-red-500" />
            <div className="p-6 pb-4 border-b border-white/5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-wider">
                    Escolha o Modo
                  </h3>
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">
                    Selecione sua batalha
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                    selected === m.id
                      ? "border-neon-green bg-neon-green/5 shadow-[0_0_25px_rgba(56,242,127,0.15)]"
                      : "border-white/5 bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${m.color} flex items-center justify-center shadow-lg`}
                    style={{
                      boxShadow:
                        selected === m.id ? `0 0 20px ${m.glow}` : "none",
                    }}
                  >
                    <m.icon className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-black uppercase tracking-wider">
                      {m.label}
                    </p>
                    <p className="text-[9px] text-white/40 font-bold">
                      {m.desc}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selected === m.id
                        ? "border-neon-green bg-neon-green"
                        : "border-white/20"
                    }`}
                  >
                    {selected === m.id && (
                      <div className="w-2 h-2 bg-black rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="p-5 pt-2">
              <button
                onClick={() => {
                  if (selected) {
                    onStart(selected);
                  }
                }}
                disabled={!selected}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  selected
                    ? "bg-neon-green text-black shadow-[0_10px_30px_rgba(56,242,127,0.4)] active:scale-95 border-b-4 border-black/20"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                <Sword className="w-5 h-5" /> JOGAR
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// â”€â”€â”€ Validation Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ValidationModal({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-3000"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-full max-w-sm bg-[#0a0a0a] border border-red-500/30 rounded-3xl z-3001 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 to-orange-500" />
            <div className="p-8 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-wider text-red-500">
                Guerras Indisponí­veis
              </h3>
              <p className="text-xs text-white/60 font-medium leading-relaxed">
                {message}
              </p>
              <button
                onClick={onClose}
                className="w-full py-4 mt-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95"
              >
                ENTENDIDO
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// â”€â”€â”€ Battle View â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BattleView({
  tasks,
  totalTime,
  battleIndex,
  onExit,
  onAbort,
  onTaskComplete,
  onFullReset,
  onVictory,
}: {
  tasks: BattleTask[];
  totalTime: number;
  battleIndex: number;
  onExit: () => void;
  onAbort: () => void;
  onTaskComplete: (rewardXp: number, rewardGold: number) => void;
  onFullReset: () => void;
  onVictory: () => void;
}) {
  const VILLAINS = [
    { name: "Sombra do Caos", img: vilao1 },
    { name: "Rei das Trevas", img: vilao2 },
    { name: "Lorde Corrupto", img: vilao3 },
    { name: "Dragão Sombrio", img: vilao4 },
  ];
  const currentVillain = VILLAINS[battleIndex % 4];

  const [battleTasks, setBattleTasks] = useState<BattleTask[]>(tasks);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [lastTaskTime, setLastTaskTime] = useState(Date.now());
  const [result, setResult] = useState<"victory" | "defeat" | null>(null);
  const [shakeEnemy, setShakeEnemy] = useState(false);
  const [shakePlayer, setShakePlayer] = useState(false);
  const [damageFloat, setDamageFloat] = useState<{
    id: number;
    value: number;
    isEnemy: boolean;
  } | null>(null);
  const [floatId, setFloatId] = useState(0);
  const [xpHistory, setXpHistory] = useState<{ time: string; xp: number }[]>([
    { time: "00:00", xp: 0 },
  ]);
  const [totalXpGained, setTotalXpGained] = useState(0);

  const completedCount = battleTasks.filter((t) => t.done).length;
  const totalTasks = battleTasks.length;
  const dmgPerTask = totalTasks > 0 ? Math.ceil(100 / totalTasks) : 100;

  // Countdown timer + idle damage
  useEffect(() => {
    if (result) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setResult("defeat");
          return 0;
        }
        return prev - 1;
      });
      // Enemy attacks every 30 seconds without progress
      if (Date.now() - lastTaskTime >= 30000) {
        setPlayerHP((prev) => {
          const next = Math.max(0, prev - 8);
          if (next <= 0) setResult("defeat");
          return next;
        });
        setShakePlayer(true);
        setTimeout(() => setShakePlayer(false), 500);
        setFloatId((prev) => prev + 1);
        setDamageFloat({ id: floatId + 1, value: -8, isEnemy: false });
        setLastTaskTime(Date.now());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [result, lastTaskTime, floatId]);

  // Clear damage float
  useEffect(() => {
    if (damageFloat) {
      const t = setTimeout(() => setDamageFloat(null), 1200);
      return () => clearTimeout(t);
    }
  }, [damageFloat]);

  const completeTask = (taskId: number) => {
    if (result) return;
    setBattleTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: true } : t)),
    );
    setLastTaskTime(Date.now());

    // Deal damage
    setEnemyHP((prev) => {
      const next = Math.max(0, prev - dmgPerTask);
      if (next <= 0) setTimeout(() => setResult("victory"), 600);
      return next;
    });
    setShakeEnemy(true);
    setTimeout(() => setShakeEnemy(false), 500);
    setFloatId((prev) => prev + 1);
    setDamageFloat({ id: floatId + 1, value: -dmgPerTask, isEnemy: true });

    // Reward for task completion
    onTaskComplete(50, 20);
    setTotalXpGained((prev) => prev + 50);

    // Update XP History for chart
    const timeStr = new Date().toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    });
    setXpHistory((prev) => [
      ...prev,
      { time: timeStr, xp: totalXpGained + 50 },
    ]);

    // Check if all tasks are done
    const currentlyDoneCount = battleTasks.filter((t) => t.done).length + 1;
    if (currentlyDoneCount >= totalTasks) {
      setTimeout(() => {
        setResult("victory");
        onVictory();
        onTaskComplete(250, 150);
        setTotalXpGained((prev) => prev + 250);
        setXpHistory((prev) => [
          ...prev,
          { time: "FIM", xp: totalXpGained + 300 },
        ]);
      }, 800);
    }
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const isUrgent = timeLeft < 60;

  // Result screen
  // â”€â”€ Victory â”€â”€
  if (result === "victory") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-3000 flex flex-col items-center justify-center px-6"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(56,242,127,0.15) 0%, #050505 70%)",
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <div
            className="text-6xl sm:text-8xl font-black uppercase italic mb-4 text-neon-green"
            style={{ textShadow: "0 0 40px rgba(56,242,127,0.5)" }}
          >
            VITÓRIA!
          </div>
          <p className="text-white/50 text-sm font-black uppercase tracking-widest mb-2">
            Todas as tarefas concluídas!
          </p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-neon-yellow/10 border border-neon-yellow/30 rounded-2xl"
          >
            <Star className="w-5 h-5 text-neon-yellow" />
            <span className="text-neon-yellow font-black text-lg">
              +{totalXpGained} XP Ganho
            </span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <button
            onClick={onExit}
            className="px-10 py-5 bg-neon-green text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(56,242,127,0.3)] border-b-4 border-black/20"
          >
            Voltar ao Dashboard
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // â”€â”€ Defeat / Game Over â”€â”€
  const MOTIVATIONAL_PHRASES = [
    "A derrota ní£o í© o fim. í‰ o comeí§o de uma nova batalha.",
    "Os guerreiros mais fortes foram construí­dos pelas suas piores derrotas.",
    "Cada queda í© uma lií§í£o. Levante-se mais forte do que antes.",
    "O caminho para a vití³ria passa pelo fracasso. Continue.",
    "Recomeí§ar do zero í© o privilí©gio dos corajosos. Você í© um.",
    "Ní£o existe guerreiro invencí­vel â€” existe quem nunca desistiu.",
  ];
  const phrase =
    MOTIVATIONAL_PHRASES[
      Math.floor(Date.now() / 1000) % MOTIVATIONAL_PHRASES.length
    ];

  if (result === "defeat") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-3000 flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(180,0,0,0.18) 0%, #000000 70%)",
        }}
      >
        {/* Falling red particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-16 bg-linear-to-b from-red-600/70 to-transparent rounded-full"
              style={{ left: `${(i * 5.7) % 100}%`, top: "-10%" }}
              animate={{ y: ["0%", "110vh"], opacity: [0, 0.9, 0] }}
              transition={{
                duration: 2.5 + (i % 5) * 0.4,
                repeat: Infinity,
                delay: i * 0.22,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Skull */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
          className="mb-6 w-24 h-24 rounded-full border-4 border-red-600/60 bg-red-950/40 flex items-center justify-center shadow-[0_0_80px_rgba(220,38,38,0.5)]"
        >
          <span className="text-5xl select-none">ðŸ’€</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter text-red-600 mb-2"
            style={{
              textShadow:
                "0 0 60px rgba(220,38,38,0.6), 0 0 20px rgba(220,38,38,0.4)",
            }}
          >
            GAME OVER
          </h1>
          <p className="text-white/30 text-xs font-black uppercase tracking-[0.4em]">
            Você foi derrotado
          </p>
        </motion.div>

        {/* Motivational phrase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-md text-center mb-8 px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl"
        >
          <p className="text-white/70 text-sm sm:text-base font-medium italic leading-relaxed">
            "{phrase}"
          </p>
        </motion.div>

        {/* Stats that will be reset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-3 sm:gap-5 mb-8 flex-wrap justify-center"
        >
          {[
            { label: "Nível", value: "→ 1", color: "text-red-400" },
            { label: "XP", value: "→ 0", color: "text-orange-400" },
            { label: "Moedas", value: "→ 0", color: "text-yellow-400" },
            { label: "Conquistas", value: "Zeradas", color: "text-purple-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-3 bg-black/40 border border-white/5 rounded-xl min-w-[76px]"
            >
              <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">
                {stat.label}
              </span>
              <span className={`text-sm font-black ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
        >
          <button
            onClick={() => {
              onFullReset();
              onExit();
            }}
            className="flex-1 py-5 bg-gradient-to-r from-red-700 to-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_40px_rgba(220,38,38,0.4)] hover:shadow-[0_10px_60px_rgba(220,38,38,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-red-500/30"
          >
            <span className="text-lg">🔄</span> RECOMEÇAR DO ZERO
          </button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-5 text-[10px] font-bold text-white/15 uppercase tracking-widest text-center"
        >
          Todo o progresso será perdido permanentemente
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[2500] bg-black flex flex-col overflow-hidden font-sans text-white"
    >
      {/* TOP — Gameplay (60% to ensure space for assets) */}
      <section className="h-[60dvh] min-h-[400px] w-full relative flex flex-col border-b border-white/10 overflow-hidden bg-[#050505] shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
          style={{ backgroundImage: "url('/medieval-battle.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

        {/* Header Gameplay */}
        <div className="absolute top-3 left-3 right-3 sm:top-6 sm:left-6 sm:right-6 flex justify-between items-center z-20">
          <div
            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md font-black text-base lg:text-xl tracking-widest font-mono ${isUrgent ? "text-red-500 animate-pulse" : "text-white"}`}
          >
            {mm}:{ss}
          </div>
          <div className="flex items-center gap-3">
            <div className="px-2 sm:px-4 py-1 sm:py-2 bg-black/60 border border-red-500/30 rounded-xl backdrop-blur-md">
              <span className="text-[8px] sm:text-[10px] font-black text-red-500 uppercase tracking-widest">
                Modo Combate Ativo
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-4 sm:gap-8 xl:gap-16 px-4 sm:px-8 xl:px-12 relative z-10 lg:mt-10">
          {/* Inimigo */}
          <div className="flex flex-col items-center gap-4 flex-1 max-w-[250px] lg:max-w-[400px]">
            <div className="text-center">
              <p className="text-[9px] sm:text-[11px] lg:text-[12px] font-black text-red-500/80 uppercase tracking-widest mb-0.5 sm:mb-1">
                Inimigo
              </p>
              <p className="text-sm sm:text-lg lg:text-2xl font-black text-white uppercase italic tracking-tighter drop-shadow-[0_4px_10px_rgba(255,0,0,0.3)]">
                {currentVillain.name}
              </p>
            </div>

            <div className="w-full relative h-5 sm:h-6 bg-black/60 rounded-full border border-white/20 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <motion.div
                animate={{ width: `${enemyHP}%` }}
                className="h-full bg-gradient-to-r from-red-800 to-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-black text-white uppercase tracking-widest">
                {Math.max(0, enemyHP)}%
              </span>
            </div>

            <motion.div
              animate={
                shakeEnemy ? { x: [0, -8, 8, -8, 8, 0] } : { y: [0, -6, 0] }
              }
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 0.4 },
              }}
              className="relative"
            >
              <img
                src={
                  typeof currentVillain.img === "string"
                    ? currentVillain.img
                    : (currentVillain.img as any)?.src || currentVillain.img
                }
                alt="Inimigo"
                className="w-40 h-40 sm:w-56 sm:h-56 lg:w-[300px] lg:h-[300px] xl:w-[380px] xl:h-[380px] object-contain drop-shadow-[0_0_40px_rgba(255,0,0,0.3)]"
              />
              {damageFloat && damageFloat.isEnemy && (
                <motion.div
                  initial={{ y: 0, opacity: 1, scale: 0.5 }}
                  animate={{ y: -80, opacity: 0, scale: 2 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 font-black text-4xl italic z-20"
                >
                  {damageFloat.value}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* VS */}
          <div className="relative flex flex-col items-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-neon-yellow/40 bg-black/80 flex items-center justify-center relative shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              <span className="text-xl lg:text-3xl font-black text-white italic z-10">
                VS
              </span>
              <div className="absolute inset-0 bg-neon-yellow/5 animate-pulse rounded-full" />
            </div>
          </div>

          {/* Player */}
          <div className="flex flex-col items-center gap-4 flex-1 max-w-[250px] lg:max-w-[400px]">
            <div className="text-center">
              <p className="text-[9px] sm:text-[11px] lg:text-[12px] font-black text-neon-green/80 uppercase tracking-widest mb-0.5 sm:mb-1">
                Status Alpha
              </p>
              <p className="text-sm sm:text-lg lg:text-2xl font-black text-white uppercase italic tracking-tighter drop-shadow-[0_4px_10px_rgba(56,242,127,0.3)]">
                Você
              </p>
            </div>

            <div className="w-full relative h-5 sm:h-6 bg-black/60 rounded-full border border-white/20 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <motion.div
                animate={{ width: `${playerHP}%` }}
                className="h-full bg-gradient-to-r from-emerald-800 to-neon-green shadow-[0_0_20px_rgba(56,242,127,0.5)]"
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-black text-white uppercase tracking-widest">
                {Math.max(0, playerHP)}%
              </span>
            </div>

            <motion.div
              animate={
                shakePlayer ? { x: [0, -8, 8, -8, 8, 0] } : { y: [0, -4, 0] }
              }
              transition={{
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 0.4 },
              }}
              className="relative"
            >
              <img
                src={playerLeft.src}
                alt="Player"
                className="w-40 h-40 sm:w-56 sm:h-56 lg:w-[300px] lg:h-[300px] xl:w-[380px] xl:h-[380px] object-contain drop-shadow-[0_0_40px_rgba(56,242,127,0.3)]"
              />
              {damageFloat && !damageFloat.isEnemy && (
                <motion.div
                  initial={{ y: 0, opacity: 1, scale: 0.5 }}
                  animate={{ y: -80, opacity: 0, scale: 2 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 font-black text-4xl italic z-20"
                >
                  {damageFloat.value}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM — Objectives (remaining space) */}
      <section className="flex-1 w-full bg-black flex flex-col z-30 relative overflow-hidden">
        {/* Header Objetivos */}
        <div className="px-6 py-4 lg:px-10 lg:py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div>
            <h2 className="text-sm lg:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" />
              Objetivos de Guerra
            </h2>
            <p className="text-[9px] lg:text-[10px] font-medium text-white/30 uppercase tracking-[0.2em] mt-1">
              Protocolo de Execução Tática
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-0.5">
                Status Global
              </span>
              <span className="text-sm lg:text-base font-mono font-black text-white">
                {completedCount}
                <span className="text-white/20 mx-1">/</span>
                {totalTasks}
              </span>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 px-4 py-2 rounded-xl text-center">
              <p className="text-[8px] font-black text-red-500/60 uppercase tracking-widest mb-0.5">
                XP Acumulado
              </p>
              <p className="text-sm font-bold text-neon-yellow">
                +{totalXpGained}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Tarefas */}
        <div className="flex-1 overflow-y-auto px-6 py-4 lg:px-10 lg:py-6 bg-[#0a0a0a]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {battleTasks.map((task, i) => (
              <motion.button
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => !task.done && completeTask(task.id)}
                disabled={task.done}
                className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/10 transition-all duration-300 ${
                  task.done
                    ? "opacity-50 grayscale bg-white/5"
                    : "bg-white/[0.05] hover:bg-white/[0.1] hover:border-red-500/40"
                }`}
              >
                <div
                  className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.done
                      ? "bg-red-600 border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.7)]"
                      : "bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  }`}
                >
                  {task.done && (
                    <Check className="w-3.5 h-3.5 text-white stroke-[4px]" />
                  )}
                  {!task.done && (
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <p
                    className={`text-sm font-bold truncate ${task.done ? "text-white/30 line-through" : "text-white/90"}`}
                  >
                    {task.title}
                  </p>
                  {task.stats ? (
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[8px] font-black text-neon-green/60 uppercase">
                        S: {task.stats.series}
                      </span>
                      <span className="text-[8px] font-black text-white/30 uppercase">
                        KG: {task.stats.kg}
                      </span>
                      <span className="text-[8px] font-black text-white/30 uppercase">
                        REP: {task.stats.reps}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-0.5">
                      Executor Alpha-1
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-[10px] font-mono font-bold ${task.done ? "text-white/10" : "text-neon-yellow"}`}
                  >
                    +50 XP
                  </span>
                  {!task.done && (
                    <span className="text-[8px] font-black text-red-500/40 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                      Confirmar
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Footer Abortar */}
        <div className="px-6 py-4 border-t border-white/5 bg-black flex justify-center items-center">
          <button
            onClick={onAbort}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all"
          >
            <X className="w-3.5 h-3.5" />
            Abortar Missí£o Tí¡tica
          </button>
        </div>
      </section>
    </motion.div>
  );
}

// â”€â”€â”€ MAIN COMPONENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function SystemDashboard({
  onLogout,
  volume,
  setVolume,
}: {
  onLogout: () => void;
  volume: number;
  setVolume: (v: number) => void;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const [activeLeft, setActiveLeft] = useState<
    "quests" | "habits" | "training" | "ranking"
  >("quests");
  const [currentView, setCurrentView] = useState<ViewId>("dashboard");
  const [isProgressReportOpen, setIsProgressReportOpen] = useState(false);
  const [isCreateHabitModalOpen, setIsCreateHabitModalOpen] = useState(false);
  const [isReadyHabitsModalOpen, setIsReadyHabitsModalOpen] = useState(false);
  const [isHabitTasksModalOpen, setIsHabitTasksModalOpen] = useState(false);
  const [selectedHabitForTasks, setSelectedHabitForTasks] =
    useState<Habit | null>(null);
  const [isCreateTrainingModalOpen, setIsCreateTrainingModalOpen] =
    useState(false);

  const [habits, setHabits] = useLocalStorage<Habit[]>("kronos_habits", []);
  const [charAnim, setCharAnim] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<PanelId>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showModeSelection, setShowModeSelection] = useState(false);
  const [battleTasks, setBattleTasks] = useState<BattleTask[]>([]);
  const [battleTotalTime, setBattleTotalTime] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  // RESTORED MISSING STATE
  const [isCreateQuestModalOpen, setIsCreateQuestModalOpen] = useState(false);
  const [quests, setQuests] = useLocalStorage<Quest[]>("kronos_quests", []);
  const [weeklyTrainings, setWeeklyTrainings] = useLocalStorage<Training[]>(
    "kronos_trainings",
    [],
  );
  const [editingTrainingIndex, setEditingTrainingIndex] = useState<
    number | null
  >(null);
  const [isEditTrainingModalOpen, setIsEditTrainingModalOpen] = useState(false);
  const [playerStats, setPlayerStats] = useLocalStorage<PlayerStats>(
    "kronos_playerStats_v3",
    {
      name: "TEST_GUERREIRO",
      level: 1,
      class: "Guerreiro Supremo",
      xp: 0,
      xpMax: 1000,
      hp: 100,
      hpMax: 100,
      gold: 0,
    },
  );
  const [battleCount, setBattleCount] = useLocalStorage(
    "kronos_battle_count",
    0,
  );
  const [currentBattleMode, setCurrentBattleMode] = useState<BattleMode | null>(
    null,
  );

  // FINANCIAL STATES
  const [transactions, setTransactions] = useLocalStorage<
    FinancialTransaction[]
  >("kronos_financial_transactions", []);
  const [budget, setBudget] = useLocalStorage<number>(
    "kronos_financial_budget",
    5000,
  );
  const [creditCards, setCreditCards] = useLocalStorage<CreditCardBill[]>(
    "kronos_financial_cards",
    [],
  );
  const [financialGoals, setFinancialGoals] = useLocalStorage<FinancialGoal[]>(
    "kronos_financial_goals",
    [],
  );
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // PROJECTS STATES
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "kronos_projects",
    [],
  );

  // SHOP STATES
  const [ownedCharacters, setOwnedCharacters] = useLocalStorage<number[]>(
    "kronos_owned_chars",
    [1],
  );
  const [ownedPets, setOwnedPets] = useLocalStorage<number[]>(
    "kronos_owned_pets",
    [1],
  );
  const [selectedCharId, setSelectedCharId] = useLocalStorage<number>(
    "kronos_selected_char",
    1,
  );
  const [selectedPetId, setSelectedPetId] = useLocalStorage<number>(
    "kronos_selected_pet",
    1,
  );

  const currentColChar =
    SHOP_CHARACTERS.find((c) => c.id === selectedCharId)?.img ||
    SHOP_CHARACTERS[0].img;
  const currentColPet =
    SHOP_PETS.find((p) => p.id === selectedPetId)?.img || SHOP_PETS[0].img;

  const handleFullReset = () => {
    setPlayerStats((prev) => ({
      ...prev,
      level: 1,
      class: "Guerreiro Supremo",
      xp: 0,
      xpMax: 1000,
      hp: 100,
      hpMax: 100,
      gold: 0,
      questsCompleted: 0,
      habitsCompleted: 0,
      trainingsCompleted: 0,
      victories: 0,
      defeats: 0,
    }));
    setArsenalSkills((prev) =>
      prev.map((s) => ({ ...s, unlocked: false, active: false })),
    );
    setArsenalBuffs((prev) =>
      prev.map((b) => ({ ...b, unlocked: false, active: false })),
    );
    setQuests((prev) => prev.map((q) => ({ ...q, done: false, streak: 0 })));
  };

  const startBattle = (mode: BattleMode) => {
    setCurrentBattleMode(mode);
    let tasks: BattleTask[] = [];
    let totalSeconds = 0;

    if (mode === "rotina") {
      tasks = quests.map((q, i) => {
        let secs = 5 * 60; // default 5 min
        if (
          q.goalUnit === "Horas" &&
          (q.goalHours || q.goalMinutes || q.goalSeconds)
        ) {
          secs =
            (q.goalHours || 0) * 3600 +
            (q.goalMinutes || 0) * 60 +
            (q.goalSeconds || 0);
        } else if (q.goalUnit === "Minutos" && q.goalAmount) {
          secs = q.goalAmount * 60;
        } else if (q.goalUnit === "Segundos" && q.goalAmount) {
          secs = q.goalAmount;
        }
        return { id: i, title: q.title, done: false, timeSeconds: secs };
      });
    } else if (mode === "habitos") {
      let id = 0;
      habits.forEach((h) => {
        if (h.tasks && h.tasks.length > 0) {
          h.tasks.forEach((t) => {
            tasks.push({
              id: id++,
              title: `${h.title}: ${t.title}`,
              done: false,
              timeSeconds: 3 * 60,
            });
          });
        } else {
          tasks.push({
            id: id++,
            title: h.title,
            done: false,
            timeSeconds: 5 * 60,
          });
        }
      });
    } else if (mode === "treinos") {
      let id = 0;
      weeklyTrainings.forEach((t) => {
        t.exercises.forEach((ex) => {
          const secs = Math.ceil(
            ((parseInt(t.duration) || 45) * 60) /
              Math.max(1, t.exercises.length),
          );
          tasks.push({
            id: id++,
            title: `${t.name}: ${ex.name}`,
            done: false,
            timeSeconds: secs,
            stats: { series: ex.series, kg: ex.kg, reps: ex.reps },
          });
        });
      });
    }

    if (tasks.length === 0) {
      setValidationError(
        `Atení§í£o detetada: Protocolo de batalha ní£o pode ser iniciado sem objetivos. Adicione tarefas para continuar.`,
      );
      return;
    }

    totalSeconds = tasks.reduce((acc, t) => acc + t.timeSeconds, 0);
    if (totalSeconds < 60) totalSeconds = 60; // minimum 1 min

    setBattleTasks(tasks);
    setBattleTotalTime(totalSeconds);
    setShowModeSelection(false);
    setCurrentView("battle");
  };
  const [activeShopTab, setActiveShopTab] = useState<
    "characters" | "pets" | null
  >(null);
  const [showNamePlate, setShowNamePlate] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [weeklyTasks, setWeeklyTasks] = useLocalStorage<WeeklyDayTasks[]>(
    "kronos_weeklyTasks",
    [
      { day: "Segunda", tasks: [] },
      { day: "Terí§a", tasks: [] },
      { day: "Quarta", tasks: [] },
      { day: "Quinta", tasks: [] },
      { day: "Sexta", tasks: [] },
      { day: "Sí¡bado", tasks: [] },
      { day: "Domingo", tasks: [] },
    ],
  );

  const [checklistTab, setChecklistTab] = useState<
    "calendar" | "checklist" | "pomodoro"
  >("calendar");
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTask, setPomodoroTask] = useState("");
  const [personalTasks, setPersonalTasks] = useLocalStorage<
    { id: number; title: string; done: boolean }[]
  >("kronos_personalTasks", []);
  const [pomodoroGroup, setPomodoroGroup] = useLocalStorage<PomodoroTask[]>(
    "kronos_pomodoroGroup",
    [],
  );
  const [currentPomodoroIdx, setCurrentPomodoroIdx] = useState(0);
  const [lastCheckDate, setLastCheckDate] = useState(new Date().toDateString());
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<
    "Normal" | "Atení§í£o" | "Urgente"
  >("Normal");

  const [isAddingPersonalTask, setIsAddingPersonalTask] = useState(false);
  const [newPersonalTaskInput, setNewPersonalTaskInput] = useState("");
  const [newPersonalTaskPriority, setNewPersonalTaskPriority] = useState<
    "Normal" | "Atení§í£o" | "Urgente"
  >("Normal");
  const [newPersonalTaskDate, setNewPersonalTaskDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [isAddingPomodoroTask, setIsAddingPomodoroTask] = useState(false);
  const [newPomodoroTaskInput, setNewPomodoroTaskInput] = useState("");

  const [friendsList, setFriendsList] = useState([
    {
      id: 1,
      name: "Guerreiro Alpha",
      level: 42,
      xp: "85.2k",
      status: "ONLINE",
      img: "https://i.ibb.co/6cD731hz/Chat-GPT-Image-1-de-mar-de-2026-13-23-58.png",
    },
    {
      id: 2,
      name: "Sombra Noturna",
      level: 38,
      xp: "72.4k",
      status: "EM MISSÃO",
      img: "https://i.ibb.co/Mm8fkMz/Chat-GPT-Image-1-de-mar-de-2026-21-15-22.png",
    },
    {
      id: 3,
      name: "Mestre do Cí³digo",
      level: 50,
      xp: "124.9k",
      status: "OFFLINE",
      img: "https://i.ibb.co/jXgP91m/Chat-GPT-Image-1-de-mar-de-2026-21-15-18.png",
    },
  ]);
  const [friendSearchInput, setFriendSearchInput] = useState("");
  const [isSearchingFriends, setIsSearchingFriends] = useState(false);

  const [newsArticles, setNewsArticles] = useState([
    {
      id: 1,
      title: "A Ascensí£o dos Guardiíµes",
      category: "LORE",
      summary:
        "Antigas profecias despertam nas Colinas de Prata. Novos herí³is sí£o convocados.",
      date: "03 MAR 2026",
      image:
        "https://i.ibb.co/6cD731hz/Chat-GPT-Image-1-de-mar-de-2026-13-23-58.png",
      readTime: "3 min",
    },
    {
      id: 2,
      title: "Evento: Eclipse Sombrio",
      category: "EVENTO",
      summary:
        "Prepare suas armas! O torneio mensal de arena comeí§a neste final de semana.",
      date: "01 MAR 2026",
      image:
        "https://i.ibb.co/HT2cTXfW/Chat-GPT-Image-1-de-mar-de-2026-13-24-02.png",
      readTime: "5 min",
    },
    {
      id: 3,
      title: "Notas da Atualizaí§í£o v2.4",
      category: "SISTEMA",
      summary:
        "Novas funcionalidades de alianí§as e chat de guilda agora disponí­veis.",
      date: "28 FEV 2026",
      image:
        "https://i.ibb.co/jXgP91m/Chat-GPT-Image-1-de-mar-de-2026-21-15-18.png",
      readTime: "2 min",
    },
  ]);
  const [newPomodoroTaskPriority, setNewPomodoroTaskPriority] = useState<
    "Normal" | "Atení§í£o" | "Urgente"
  >("Normal");
  const [newPomodoroTaskSessions, setNewPomodoroTaskSessions] = useState(1);
  const [newPomodoroTaskDays, setNewPomodoroTaskDays] = useState(30);

  // â”€â”€â”€ FIREBASE / REAL-TIME DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [currentUser, setCurrentUser] = useState<any>(null); // Keeping any for Firebase User as it might need specific handling
  const [rankingData, setRankingData] = useState<RankingUser[]>([]);
  const [friendsData, setFriendsData] = useState<RankingUser[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Update user profile in Firestore initially or on login
        const userRef = doc(db, "users", user.uid);
        setDoc(
          userRef,
          {
            uid: user.uid,
            name: playerStats.name,
            level: playerStats.level,
            xp: Math.floor(playerStats.xp),
            class: playerStats.class,
            lastSeen: Timestamp.now(),
            photoURL:
              user.photoURL ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
          },
          { merge: true },
        );
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Ranking Listener (Top 50)
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RankingUser[];
      setRankingData(users);
    });
    return () => unsubscribe();
  }, []);

  // 3. Friends Listener
  useEffect(() => {
    if (!currentUser) {
      setFriendsData([]);
      return;
    }
    const userRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userRef, async (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const friendsIds = userData.friends || [];

        if (friendsIds.length > 0) {
          // Fetch details for each friend
          const friendsQuery = query(
            collection(db, "users"),
            where("uid", "in", friendsIds),
          );
          const friendsSnap = await getDocs(friendsQuery);
          const friendsList = friendsSnap.docs.map((fd) => ({
            id: fd.id,
            ...fd.data(),
          })) as RankingUser[];
          setFriendsData(friendsList);
        } else {
          setFriendsData([]);
        }
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  // 4. Sync Stats to Firestore when they change
  useEffect(() => {
    if (!currentUser || isSyncing) return;

    const syncStats = async () => {
      setIsSyncing(true);
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          name: playerStats.name,
          level: playerStats.level,
          xp: Math.floor(playerStats.xp),
          class: playerStats.class,
          gold: Math.floor(playerStats.gold),
          lastUpdate: Timestamp.now(),
        });
      } catch (err) {
        console.error("Error syncing stats:", err);
      } finally {
        setIsSyncing(false);
      }
    };

    const timeoutId = setTimeout(syncStats, 5000); // Debounce sync
    return () => clearTimeout(timeoutId);
  }, [playerStats, currentUser]);

  const addFriend = async (friendId: string) => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        friends: arrayUnion(friendId),
      });
      alert("Alianí§a formada com sucesso!");
    } catch (err) {
      console.error("Error adding friend:", err);
      alert("Erro ao adicionar aliado.");
    }
  };

  const [kronosHabits, setKronosHabits] = useLocalStorage<any[]>(
    "kronos_internalHabits",
    [],
  );

  const toggleKronosHabit = (id: number, day: number) => {
    setKronosHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const alreadyDone = h.completed.includes(day);
          const nextCompleted = alreadyDone
            ? h.completed.filter((d: number) => d !== day)
            : [...h.completed, day];

          if (!alreadyDone) {
            gainReward(30, 10); // Reward for habit completion
          }

          return { ...h, completed: nextCompleted };
        }
        return h;
      }),
    );
  };

  const gainReward = (xp: number, gold: number, reason?: string) => {
    setPlayerStats((prev) => {
      let newXp = prev.xp + xp;
      let newLevel = prev.level;
      let newXpMax = prev.xpMax;

      while (newXp >= newXpMax) {
        newXp -= newXpMax;
        newLevel += 1;
        newXpMax = newLevel * 1000;
      }

      // Check for level-based unlocks
      checkUnlocks(newLevel, prev.gold + gold);

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpMax: newXpMax,
        gold: prev.gold + gold,
      };
    });
  };

  const checkUnlocks = (level: number, gold: number) => {
    // Unlock skills based on level
    setArsenalSkills((prev) =>
      prev.map((s, i) => {
        if (!s.unlocked) {
          if (level >= (i + 1) * 2) return { ...s, unlocked: true };
        }
        return s;
      }),
    );

    // Unlock buffs based on goals (Streaks/Completions)
    setArsenalBuffs((prev) =>
      prev.map((b, i) => {
        if (!b.unlocked) {
          // ðŸŒ… Madrugador: Acorda antes das 5AM por 12 dias
          if (i === 0) {
            const earlyBirdHabit = kronosHabits.find(
              (h) =>
                h.name.toLowerCase().includes("madrugada") ||
                h.name.toLowerCase().includes("5am") ||
                h.name.toLowerCase().includes("acordar cedo"),
            );
            if (earlyBirdHabit && earlyBirdHabit.completed.length >= 12)
              return { ...b, unlocked: true };
          }
          // ðŸ§˜ Monge Mental: 7 dias sem redes sociais
          if (i === 1) {
            const detoxHabit = kronosHabits.find(
              (h) =>
                h.name.toLowerCase().includes("redes sociais") ||
                h.name.toLowerCase().includes("detox") ||
                h.name.toLowerCase().includes("monge"),
            );
            if (detoxHabit && detoxHabit.completed.length >= 7)
              return { ...b, unlocked: true };
          }
          // âš”ï¸ Ferro Puro: Treinou 8 dias seguidos
          if (i === 2) {
            const trainingStreak = weeklyTrainings.filter((t) => t.done).length;
            if (trainingStreak >= 8) return { ...b, unlocked: true };
          }
          // ðŸ‰ Dragí£o Dormindo: 30 dias de treino total
          if (i === 3) {
            const totalTrainings = weeklyTrainings.filter((t) => t.done).length; // Simplified for now, should ideally be a counter
            if (totalTrainings >= 30) return { ...b, unlocked: true };
          }
        }
        return b;
      }),
    );
  };

  const onToggleQuest = (index: number) => {
    const quest = quests[index];
    if (quest && !quest.done) {
      const baseXP = quest.xp || 50;
      const baseGold = 20;
      // Bonus for streaks
      const streakBonus = quest.streak ? Math.min(quest.streak * 5, 50) : 0;
      gainReward(baseXP + streakBonus, baseGold + streakBonus / 2);
    }
  };

  const addKronosHabit = (name: string) => {
    const newHabit = {
      id: Math.max(0, ...kronosHabits.map((h) => h.id)) + 1,
      name,
      completed: [],
    };
    setKronosHabits((prev) => [...prev, newHabit]);
  };

  const updateKronosHabit = (id: number, name: string) => {
    setKronosHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name } : h)),
    );
  };

  const deleteKronosHabit = (id: number) => {
    setKronosHabits((prev) => prev.filter((h) => h.id !== id));
  };

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (showNamePlate) {
      const timer = setTimeout(() => {
        setShowNamePlate(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNamePlate]);

  useEffect(() => {
    let interval: any;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0 && pomodoroActive) {
      // Increment session progress
      if (
        pomodoroGroup.length > 0 &&
        currentPomodoroIdx < pomodoroGroup.length
      ) {
        const newGroup = [...pomodoroGroup];
        const task = newGroup[currentPomodoroIdx];
        task.completedSessions += 1;

        if (task.completedSessions >= task.targetSessions) {
          task.done = true;
        }

        setPomodoroGroup(newGroup);

        // Check if we should continue
        if (task.done) {
          if (currentPomodoroIdx < pomodoroGroup.length - 1) {
            // Move to next task
            setCurrentPomodoroIdx((prev) => prev + 1);
            setPomodoroTime(25 * 60);
            // Stay active
          } else {
            // Everything finished!
            setPomodoroActive(false);
          }
        } else {
          // Not done with this task yet, reset timer for next session of same task
          setPomodoroTime(25 * 60);
          // Stay active
        }
      } else {
        setPomodoroActive(false);
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime, pomodoroGroup, currentPomodoroIdx]);

  // Auto-delete logic for 'Hoje' tasks
  useEffect(() => {
    const todayStr = new Date().toDateString();
    if (lastCheckDate !== todayStr) {
      setWeeklyTasks((prev) => prev.map((d) => ({ ...d, tasks: [] })));
      setLastCheckDate(todayStr);
    }
  }, [lastCheckDate]);

  useEffect(() => {
    if (!showIntro) setTimeout(() => setCharAnim(true), 400);
  }, [showIntro]);

  const togglePanel = (id: PanelId) =>
    setMobilePanel((prev) => (prev === id ? null : id));

  // â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  const [arsenalSkills, setArsenalSkills] = useLocalStorage<Skill[]>(
    "kronos_skills",
    [
      {
        name: "Foco Total",
        icon: Target,
        level: 3,
        color: "border-blue-400",
        unlocked: false,
        active: false,
      },
      {
        name: "Força Mental",
        icon: Zap,
        level: 5,
        color: "border-neon-yellow",
        unlocked: false,
        active: false,
      },
      {
        name: "Escudo",
        icon: Shield,
        level: 2,
        color: "border-purple-400",
        unlocked: false,
        active: false,
      },
      {
        name: "Lâmina",
        icon: Sword,
        level: 4,
        color: "border-red-400",
        unlocked: false,
        active: false,
      },
      {
        name: "Liderança",
        icon: Crown,
        level: 1,
        color: "border-amber-400",
        unlocked: false,
        active: false,
      },
      {
        name: "Conquista",
        icon: Trophy,
        level: 2,
        color: "border-neon-green",
        unlocked: false,
        active: false,
      },
      {
        name: "Batalha",
        icon: Swords,
        level: 0,
        color: "border-white/20",
        unlocked: false,
        active: false,
      },
      {
        name: "Magia",
        icon: Sparkles,
        level: 0,
        color: "border-white/20",
        unlocked: false,
        active: false,
      },
    ],
  );
  const [arsenalBuffs, setArsenalBuffs] = useLocalStorage<Buff[]>(
    "kronos_buffs",
    [
      {
        id: 1,
        name: "Madrugador",
        desc: "Acorda antes das 5AM por 12 dias",
        icon: "ðŸŒ…",
        active: false,
        unlocked: false,
      },
      {
        id: 2,
        name: "Monge Mental",
        desc: "7 dias sem redes sociais",
        icon: "ðŸ§˜",
        active: false,
        unlocked: false,
      },
      {
        id: 3,
        name: "Ferro Puro",
        desc: "Treinou 8 dias seguidos",
        icon: "âš”ï¸",
        active: false,
        unlocked: false,
      },
      {
        id: 4,
        name: "Dragão Dormindo",
        desc: "Desbloqueie apí³s 30 dias de treino",
        icon: "ðŸ‰",
        active: false,
        unlocked: false,
      },
    ],
  );

  const handleDeleteTraining = (index: number) => {
    setWeeklyTrainings((prev) => prev.filter((_, i) => i !== index));
  };
  const handleEditTraining = (index: number) => {
    setEditingTrainingIndex(index);
    setIsEditTrainingModalOpen(true);
  };
  const handleSaveTraining = (updated: Training) => {
    if (editingTrainingIndex !== null) {
      setWeeklyTrainings((prev) => {
        // Ao editar, se mudou o dia para um que jí¡ existe (e ní£o í© o mesmo que estamos editando)
        const targetDayIdx = prev.findIndex(
          (t, i) => t.day === updated.day && i !== editingTrainingIndex,
        );

        if (targetDayIdx !== -1) {
          // Mescla o que editamos no treino que jí¡ existia naquele dia
          const mergedTrainings = prev.map((t, i) => {
            if (i === targetDayIdx) {
              return {
                ...t,
                exercises: [...t.exercises, ...updated.exercises],
                duration:
                  parseInt(t.duration) + parseInt(updated.duration) + " min",
                done: false,
              };
            }
            return t;
          });
          // Remove o registro original que estí¡vamos editando
          return mergedTrainings.filter((_, i) => i !== editingTrainingIndex);
        }

        // Apenas atualiza o registro atual se ní£o houver conflito de dia
        return prev.map((t, i) => (i === editingTrainingIndex ? updated : t));
      });
    }
    setIsEditTrainingModalOpen(false);
    setEditingTrainingIndex(null);
  };

  const toggleExercise = (trainingIndex: number, exerciseIndex: number) => {
    setWeeklyTrainings((prev) =>
      prev.map((t, i) => {
        if (i !== trainingIndex) return t;
        const updatedExercises = t.exercises.map((ex, j) => {
          if (j === exerciseIndex) {
            if (!ex.done) {
              gainReward(20, 5);
            }
            return { ...ex, done: !ex.done };
          }
          return ex;
        });
        const allDone =
          updatedExercises.length > 0 &&
          updatedExercises.every((ex) => ex.done);
        return { ...t, exercises: updatedExercises, done: allDone };
      }),
    );
  };

  const toggleSkill = (index: number) => {
    if (!arsenalSkills[index].unlocked) return;
    setArsenalSkills((prev) =>
      prev.map((s, i) => (i === index ? { ...s, active: !s.active } : s)),
    );
  };

  const toggleBuff = (index: number) => {
    if (!arsenalBuffs[index].unlocked) return;
    setArsenalBuffs((prev) =>
      prev.map((b, i) => (i === index ? { ...b, active: !b.active } : b)),
    );
  };

  // â”€â”€â”€ Sub-components extracted for optimization â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const ClashHeader = ({
    className = "",
    playerStats,
    userMenuOpen,
    setUserMenuOpen,
    UserMenu,
    onCrownClick,
  }: {
    className?: string;
    playerStats: any;
    userMenuOpen: boolean;
    setUserMenuOpen: (open: boolean) => void;
    UserMenu: React.ComponentType<any>;
    onCrownClick: () => void;
  }) => (
    <div
      className={`flex items-center gap-2 px-3 pt-3 pb-2 relative z-[110] w-full ${className}`}
    >
      {/* Header Crown Button */}
      <button
        onClick={onCrownClick}
        className="w-10 h-10 bg-linear-to-br from-yellow-300 to-yellow-600 rounded-xl border-2 border-white/60 shadow-xl flex items-center justify-center active:scale-90 transition-all text-white shrink-0"
      >
        <Crown className="w-6 h-6 drop-shadow-md" />
      </button>

      {/* Level & XP */}
      <div className="flex-1 min-w-0 flex items-center bg-black/60 rounded-lg pr-2 border border-white/20 h-9 overflow-hidden shadow-2xl">
        <div className="w-9 h-9 bg-linear-to-br from-[#0091FF] to-[#0055FF] flex items-center justify-center relative border-r border-white/20 overflow-hidden shrink-0">
          <span className="text-white font-black text-xs z-10 drop-shadow-md">
            {playerStats.level}
          </span>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/20"
          />
        </div>
        <div className="flex flex-col ml-2 flex-1 min-w-0">
          <span className="text-[9px] font-black text-white/90 italic mb-0.5 tracking-tight truncate">
            {Math.floor(playerStats.xp)}/{playerStats.xpMax}
          </span>
          <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
            <motion.div
              animate={{
                width: `${(playerStats.xp / playerStats.xpMax) * 100}%`,
              }}
              className="h-full bg-linear-to-r from-[#00F2FF] to-[#0091FF] shadow-[0_0_8px_rgba(0,242,255,0.6)]"
            />
          </div>
        </div>
      </div>

      {/* Gold */}
      <div className="flex-1 min-w-0 flex items-center bg-black/60 rounded-lg pl-1 pr-2 border border-white/20 h-9 shadow-inner gap-1.5">
        <div className="flex items-center gap-1 shrink-0">
          <button className="w-6 h-6 bg-linear-to-b from-[#49ff8d] to-[#2bad5b] rounded-md flex items-center justify-center shadow-lg active:scale-90 transition-transform border-2 border-white/40 group">
            <Plus className="w-4 h-4 text-black" />
          </button>
          <div className="w-5 h-5 rounded-full bg-linear-to-b from-yellow-300 to-yellow-600 flex items-center justify-center shadow-md border border-yellow-200 shrink-0">
            <CircleDollarSign className="w-3 h-3 text-yellow-900" />
          </div>
        </div>
        <span className="text-[10px] font-black text-white truncate drop-shadow-sm flex-1 text-right">
          {Math.floor(playerStats.gold).toLocaleString()}
        </span>
      </div>

      {/* Avatar / Profile Menu */}
      <div className="relative shrink-0">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-10 h-10 bg-linear-to-br from-[#FFD700] via-[#FDB931] to-[#9E7E38] rounded-xl border-2 border-white/60 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center active:scale-95 transition-all text-white shrink-0 relative overflow-hidden"
        >
          <img
            src={personagemImg.src}
            alt="Avatar"
            className="absolute w-[140%] h-[140%] max-w-none object-contain -top-2 pointer-events-none"
          />
        </button>
        {userMenuOpen && <UserMenu />}
      </div>
    </div>
  );

  const UserMenu = () => (
    <div className="absolute top-full right-0 mt-6 w-48 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden z-[200] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="p-3 border-b border-white/5 bg-white/[0.02]">
        <p className="text-[10px] font-black text-white uppercase tracking-widest">
          {playerStats.name}
        </p>
        <p className="text-[8px] text-neon-green font-bold uppercase">
          {playerStats.class}
        </p>
      </div>
      <div className="p-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSettingsOpen(true);
            setUserMenuOpen(false);
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white"
        >
          <Settings className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-wider text-left">
            Configuraí§í£o
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveShopTab("characters");
            setUserMenuOpen(false);
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white"
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-wider text-left">
            Personagem
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLogout();
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition-colors text-white/70 hover:text-red-400"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-wider text-left">
            Sair
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-dark text-white relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/nature-bg.png')" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <AnimatePresence mode="wait">
        {/* â•â•â•â• INTRO â•â•â•â• */}
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/nature-bg.png')" }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-transparent to-bg-dark/80" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-lg mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8 sm:mb-10"
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-neon-green/20 backdrop-blur-2xl border border-neon-green/30 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center mb-6 sm:mb-8 mx-auto rotate-45 shadow-[0_0_60px_rgba(56,242,127,0.3)]">
                  <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-neon-green fill-current -rotate-45" />
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-display uppercase tracking-tight mb-4 sm:mb-6 leading-none">
                  BEM-VINDO AO
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-green to-neon-yellow">
                    COCKPIT KRONOS
                  </span>
                </h2>
                <p className="text-white text-xs sm:text-lg font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] opacity-60">
                  O MUNDO í‰ SUA ARENA. DOMINE.
                </p>
              </motion.div>
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowIntro(false)}
                className="px-8 sm:px-14 py-4 sm:py-6 bg-neon-green text-black font-black text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-xl sm:rounded-2xl shadow-[0_0_40px_rgba(56,242,127,0.3)] flex items-center gap-3 sm:gap-5 group"
              >
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                CONECTAR AO SISTEMA
              </motion.button>
            </div>
            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-green rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* â•â•â•â• RPG HUD â•â•â•â• */}
        {!showIntro && (
          <motion.div
            key="hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 h-screen overflow-hidden flex flex-col"
          >
            {/* â”€â”€ TOP BAR (desktop only) â”€â”€ */}
            <header className="hidden md:flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b border-white/5 backdrop-blur-xl bg-black/30 relative z-[100]">
              {/* Left: Crown + Level/XP + Gold */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Header Crown Button */}
                <button
                  onClick={() => setIsProgressReportOpen(true)}
                  className="w-10 h-10 bg-linear-to-br from-yellow-300 to-yellow-600 rounded-xl border-2 border-white/60 shadow-xl flex items-center justify-center active:scale-90 transition-all text-white shrink-0"
                >
                  <Crown className="w-6 h-6 drop-shadow-md" />
                </button>

                {/* Level & XP */}
                <div className="flex items-center bg-black/60 rounded-lg pr-3 border border-white/20 h-10 overflow-hidden shadow-2xl min-w-[120px]">
                  <div className="w-10 h-10 bg-linear-to-br from-[#0091FF] to-[#0055FF] flex items-center justify-center relative border-r border-white/20 overflow-hidden shrink-0">
                    <span className="text-white font-black text-xs z-10 drop-shadow-md">
                      {playerStats.level}
                    </span>
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-white/20"
                    />
                  </div>
                  <div className="flex flex-col ml-2.5 flex-1">
                    <span className="text-[9px] font-black text-white/90 italic ml-0.5 mb-0.5 tracking-tight">
                      {Math.floor(playerStats.xp)} / {playerStats.xpMax} XP
                    </span>
                    <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(playerStats.xp / playerStats.xpMax) * 100}%`,
                        }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-linear-to-r from-neon-yellow to-yellow-500 shadow-[0_0_10px_rgba(255,242,0,0.4)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Gold */}
                <div className="flex items-center bg-black/60 rounded-lg pl-1 pr-3 border border-white/20 h-10 shadow-inner gap-2 min-w-[130px]">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="w-6 h-6 bg-linear-to-b from-[#49ff8d] to-[#2bad5b] rounded-md flex items-center justify-center shadow-lg active:scale-90 transition-transform border-2 border-white/40 group">
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                    <div className="w-6 h-6 rounded-full bg-linear-to-b from-yellow-300 to-yellow-600 flex items-center justify-center shadow-md border border-yellow-200">
                      <CircleDollarSign className="w-3.5 h-3.5 text-yellow-900" />
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-white truncate drop-shadow-sm flex-1 text-right">
                    {Math.floor(playerStats.gold).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Right: News, Friends, Calendar + Avatar */}
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => setCurrentView("ai")}
                  className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95 group relative flex items-center justify-center text-blue-400"
                  title="Chat IA"
                >
                  <Bot className="w-5 h-5 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => setCurrentView("projects")}
                  className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95 group relative flex items-center justify-center text-gray-400"
                  title="Projetos"
                >
                  <Briefcase className="w-5 h-5 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => setCurrentView("finance")}
                  className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95 group relative flex items-center justify-center text-emerald-400"
                  title="Financeiro"
                >
                  <CircleDollarSign className="w-5 h-5 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => setCurrentView("news")}
                  className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95 group relative flex items-center justify-center"
                  title="Noticias"
                >
                  <Newspaper className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => setCurrentView("friends")}
                  className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95 group relative flex items-center justify-center"
                  title="Amigos"
                >
                  <Friends className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                </button>

                <button
                  onClick={() => setCurrentView("weeklyChecklist")}
                  className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95 group relative flex items-center justify-center"
                  title="Checklist Semanal"
                >
                  <CalendarDays className="w-5 h-5 text-neon-green group-hover:text-white transition-colors" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-dark animate-pulse" />
                </button>

                <div className="ml-2 relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-10 h-10 bg-linear-to-br from-[#FFD700] via-[#FDB931] to-[#9E7E38] rounded-xl border-2 border-white/60 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center active:scale-95 transition-all text-white shrink-0 overflow-hidden relative"
                    title={playerStats.name}
                  >
                    <img
                      src="https://i.ibb.co/6cD731hz/Chat-GPT-Image-1-de-mar-de-2026-13-23-58.png"
                      alt="Avatar"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                  {userMenuOpen && <UserMenu />}
                </div>
              </div>
            </header>

            {currentView === "quests" && (
              <FullViewWrapper
                title="Central de Missíµes"
                icon={Target}
                color="border-neon-green"
                onClose={() => setCurrentView("dashboard")}
              >
                {/* HUD Decors */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-neon-green/20 opacity-50 pointer-events-none rounded-tr-3xl" />
                <div className="absolute bottom-20 left-0 w-16 h-16 border-b-2 border-l-2 border-neon-green/20 opacity-50 pointer-events-none rounded-bl-3xl" />
                <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-[0.02] pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 relative z-10">
                  <div className="col-span-full mb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/10" />
                      <h3 className="text-sm font-black uppercase tracking-[0.4em] italic text-white/60">
                        SUA ROTINA
                      </h3>
                      <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/10" />
                    </div>
                  </div>

                  {/* Botí£o Gigante de Criar Missí£o */}
                  <button
                    onClick={() => setIsCreateQuestModalOpen(true)}
                    className="p-6 bg-neon-green/5 border border-neon-green/20 rounded-2xl flex flex-col items-center justify-center gap-4 group hover:bg-neon-green/10 hover:border-neon-green/40 transition-all border-dashed min-h-[160px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-neon-green/20">
                      <Plus className="w-6 h-6 text-neon-green" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-neon-green">
                      Nova Missí£o
                    </span>
                  </button>

                  {quests.map((q, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        const newQuests = [...quests];
                        const target = newQuests[i];
                        const wasDone = target.done;
                        target.done = !wasDone;
                        setQuests(newQuests);
                        if (!wasDone) {
                          onToggleQuest(i);
                        }
                      }}
                      className={`group border p-6 rounded-2xl relative overflow-hidden transition-all cursor-pointer ${q.done ? "bg-neon-green/5 border-neon-green/30" : "bg-black/40 border-white/10 hover:border-neon-green/30"}`}
                    >
                      <div className="absolute top-0 right-0 p-3 flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[7px] font-black text-white/20">
                            MS-0{i + 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuests(quests.filter((_, idx) => idx !== i));
                            }}
                            className="text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(3)].map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${idx < (i % 3) + 1 ? "bg-neon-green" : "bg-white/10"}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                          {/* Checklist Dot */}
                          <div
                            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${q.done ? "bg-neon-green border-neon-green shadow-[0_0_10px_rgba(56,242,127,0.6)]" : "border-white/30 bg-black/40 group-hover:border-neon-green/50"}`}
                          >
                            {q.done && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2.5 h-2.5 bg-black rounded-full"
                              />
                            )}
                          </div>
                          <div>
                            <h4
                              className={`text-base font-black uppercase italic transition-colors ${q.done ? "text-white/40 line-through" : "text-white group-hover:text-neon-green"}`}
                            >
                              {q.title}
                            </h4>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                              {q.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-[7px] font-black text-white/20 uppercase">
                                RECOMPENSA
                              </span>
                              <span className="text-[10px] font-black text-neon-yellow">
                                +{q.xp} XP
                              </span>
                            </div>
                            {q.streak && (
                              <div className="flex flex-col">
                                <span className="text-[7px] font-black text-white/20 uppercase">
                                  STREAK
                                </span>
                                <span className="text-[10px] font-black text-orange-400">
                                  {q.streak} DIAS
                                </span>
                              </div>
                            )}
                          </div>
                          <div
                            className={`px-4 py-1.5 rounded-lg border text-[8px] font-black uppercase tracking-widest transition-all ${q.done ? "bg-neon-green/10 border-neon-green/20 text-neon-green" : "bg-white/5 border-white/10 text-white/30"}`}
                          >
                            {q.done ? "CONCLUíDO" : "EM ANDAMENTO"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FullViewWrapper>
            )}

            {currentView === "habits" && (
              <FullViewWrapper
                title="Sistema de Hí¡bitos"
                icon={Flame}
                color="border-orange-500"
                onClose={() => setCurrentView("dashboard")}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
                  {/* Botí£o Gigante de Criar Hí¡bito */}
                  <div className="grid grid-cols-1 gap-4 h-full">
                    <button
                      onClick={() => setIsCreateHabitModalOpen(true)}
                      className="p-8 bg-orange-500/5 border border-orange-500/20 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 group hover:bg-orange-500/10 hover:border-orange-500/40 transition-all border-dashed"
                    >
                      <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-orange-500/20">
                        <Plus className="w-8 h-8 text-orange-400" />
                      </div>
                      <span className="text-xl font-black uppercase italic text-orange-400">
                        Novo Hí¡bito
                      </span>
                    </button>
                    <button
                      onClick={() => setIsReadyHabitsModalOpen(true)}
                      className="p-8 bg-neon-yellow/5 border border-neon-yellow/20 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 group hover:bg-neon-yellow/10 hover:border-neon-yellow/40 transition-all border-dashed"
                    >
                      <div className="w-16 h-16 rounded-full bg-neon-yellow/10 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-neon-yellow/20">
                        <Eye className="w-8 h-8 text-neon-yellow" />
                      </div>
                      <span className="text-xl font-black uppercase italic text-neon-yellow">
                        Protocolos de Elite
                      </span>
                    </button>
                  </div>

                  {habits.map((h, i) => (
                    <div
                      key={h.id}
                      className="p-8 bg-white/3 border border-white/5 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-white/[0.05] transition-all relative"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setHabits(
                            habits.filter((habit) => habit.id !== h.id),
                          );
                        }}
                        className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center justify-between pr-8">
                        <span className="text-xl font-black uppercase italic text-white group-hover:text-orange-400 transition-colors">
                          {h.title}
                        </span>
                        <div className="flex items-center gap-4">
                          {h.tasks && h.tasks.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedHabitForTasks(h);
                                setIsHabitTasksModalOpen(true);
                              }}
                              className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <Eye className="w-5 h-5 text-neon-yellow" />
                            </button>
                          )}
                          <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-400" />
                            <span className="text-xl font-black text-orange-400">
                              {h.streak}d
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-white/40 uppercase tracking-widest leading-relaxed">
                        {h.desc}
                      </p>
                      <div className="mt-auto">
                        <div className="flex justify-between mb-2">
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                            PROGRESSO DO STREAK
                          </span>
                          <span className="text-[10px] font-black text-white/60">
                            {h.streak}/{h.max} DIAS
                          </span>
                        </div>
                        <div className="h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(h.streak / h.max) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full rounded-full bg-linear-to-r ${h.color} shadow-[0_0_15px_rgba(255,165,0,0.3)]`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FullViewWrapper>
            )}

            {currentView === "training" && (
              <FullViewWrapper
                title="Treinos"
                icon={Swords}
                color="border-neon-green"
                onClose={() => setCurrentView("dashboard")}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20 relative z-10">
                  {/* --- LEFT COLUMN: TRAINING STATS & ACTION --- */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-8 bg-neon-green/5 border border-neon-green/20 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Swords className="w-32 h-32" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-1">
                          TREINO ATIVO
                        </p>
                        <h3 className="text-3xl font-black uppercase italic mb-6">
                          ðŸ‹ï¸ TREINO ALPHA
                        </h3>

                        <div className="space-y-4 mb-8">
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-[10px] font-black text-white/40 uppercase">
                              Treinos na Semana
                            </span>
                            <span className="text-sm font-black text-neon-yellow">
                              {weeklyTrainings.filter((t) => t.done).length}/
                              {weeklyTrainings.length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-[10px] font-black text-white/40 uppercase">
                              Exercí­cios
                            </span>
                            <span className="text-sm font-black text-white">
                              {weeklyTrainings.reduce(
                                (acc, t) => acc + t.exercises.length,
                                0,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-[10px] font-black text-white/40 uppercase">
                              Tempo Estimado
                            </span>
                            <span className="text-sm font-black text-white">
                              275 min
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsCreateTrainingModalOpen(true)}
                          className="w-full py-4 bg-neon-green text-black font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(56,242,127,0.3)] transition-all flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Criar Novo Treino
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* --- RIGHT COLUMN: WEEKLY TRAINING SCHEDULE --- */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Weekly Progress Header */}
                    <div className="p-6 bg-neon-green/5 border border-neon-green/20 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-black text-white/30 uppercase tracking-[0.4em]">
                          Progresso Semanal
                        </p>
                        <span className="text-sm font-black text-neon-green">
                          {weeklyTrainings.filter((t) => t.done).length}/
                          {weeklyTrainings.length} Treinos
                        </span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(weeklyTrainings.filter((t) => t.done).length / weeklyTrainings.length) * 100}%`,
                          }}
                          transition={{ duration: 1.2 }}
                          className="h-full bg-linear-to-r from-neon-green to-neon-yellow rounded-full shadow-[0_0_15px_rgba(56,242,127,0.5)]"
                        />
                      </div>
                      <div className="flex justify-between mt-3">
                        {weeklyTrainings.map((t, i) => (
                          <div
                            key={i}
                            className={`flex flex-col items-center gap-1`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-black ${t.done ? "bg-neon-green text-black" : "bg-white/5 text-white/30 border border-white/10"}`}
                            >
                              {t.done ? "âœ“" : t.day}
                            </div>
                            <span
                              className={`text-[7px] font-black ${t.done ? "text-neon-green" : "text-white/20"}`}
                            >
                              {t.day}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Training Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {weeklyTrainings.map((t, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`p-5 rounded-2xl border transition-all group ${t.done ? "bg-neon-green/5 border-neon-green/20" : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"}`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black ${t.done ? "bg-neon-green text-black" : "bg-white/5 text-white/50 border border-white/10"}`}
                            >
                              {t.day}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditTraining(i)}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-white/30 hover:text-neon-yellow" />
                              </button>
                              <button
                                onClick={() => handleDeleteTraining(i)}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-white/30 hover:text-red-500" />
                              </button>
                              {t.done && (
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_rgba(56,242,127,0.5)]" />
                                  <span className="text-[8px] font-black text-neon-green uppercase">
                                    Concluí­do
                                  </span>
                                </div>
                              )}
                              {!t.done && (
                                <span className="text-[8px] font-black text-white/20 uppercase">
                                  Pendente
                                </span>
                              )}
                            </div>
                          </div>
                          <h4
                            className={`text-sm font-black uppercase italic mb-1 ${t.done ? "text-neon-green" : "text-white group-hover:text-neon-green transition-colors"}`}
                          >
                            {t.name}
                          </h4>
                          <p className="text-[9px] text-white/30 font-bold mb-4">
                            {t.duration} â€¢ {t.exercises.length} exercí­cios
                          </p>

                          <div className="space-y-3">
                            {t.exercises.map((ex, j) => (
                              <div
                                key={j}
                                onClick={() => toggleExercise(i, j)}
                                className={`p-3 border rounded-xl cursor-pointer transition-all ${ex.done ? "bg-neon-green/10 border-neon-green/30" : "bg-white/3 border-white/5 hover:bg-white/[0.06]"}`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                    className={`w-3 h-3 rounded-sm border flex items-center justify-center flex-shrink-0 ${ex.done ? "bg-neon-green border-neon-green" : "border-white/15 bg-white/5"}`}
                                  >
                                    {ex.done && (
                                      <div className="w-1.5 h-1.5 bg-black rounded-[1px]" />
                                    )}
                                  </div>
                                  <span
                                    className={`text-[10px] font-black uppercase italic ${ex.done ? "text-white/40 line-through" : "text-white/80"}`}
                                  >
                                    {ex.name}
                                  </span>
                                </div>
                                <div className="flex gap-4 pl-5">
                                  <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">
                                      Sí©rie
                                    </span>
                                    <span
                                      className={`text-[10px] font-black ${ex.done ? "text-neon-green/40" : "text-neon-green"}`}
                                    >
                                      {ex.series}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">
                                      KG
                                    </span>
                                    <span
                                      className={`text-[10px] font-black ${ex.done ? "text-white/20" : "text-white"}`}
                                    >
                                      {ex.kg}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">
                                      Reps
                                    </span>
                                    <span
                                      className={`text-[10px] font-black ${ex.done ? "text-white/20" : "text-white"}`}
                                    >
                                      {ex.reps}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}

                      {/* Create New Training Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => setIsCreateTrainingModalOpen(true)}
                        className="p-5 rounded-2xl border-2 border-dashed border-neon-green/20 bg-neon-green/[0.02] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-neon-green/5 hover:border-neon-green/40 transition-all group min-h-[200px]"
                      >
                        <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus className="w-6 h-6 text-neon-green" />
                        </div>
                        <span className="text-[10px] font-black text-neon-green uppercase tracking-widest">
                          Criar Treino
                        </span>
                      </motion.div>
                    </div>

                    {/* Training Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        {
                          label: "Treinos Feitos",
                          value: `${weeklyTrainings.filter((t) => t.done).length}`,
                          icon: "ðŸ‹ï¸",
                        },
                        {
                          label: "Streak Semanal",
                          value: "3 sem",
                          icon: "ðŸ”¥",
                        },
                        {
                          label: "Exercí­cios Totais",
                          value: `${weeklyTrainings.reduce((acc, t) => acc + t.exercises.length, 0)}`,
                          icon: "ðŸ’ª",
                        },
                        {
                          label: "Tempo Total",
                          value: "275 min",
                          icon: "â±ï¸",
                        },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="text-xl leading-none">
                            {stat.icon}
                          </span>
                          <p className="text-lg font-black text-white mt-1">
                            {stat.value}
                          </p>
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mt-0.5">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FullViewWrapper>
            )}

            {currentView === "ranking" && (
              <FullViewWrapper
                title="Ranking Global"
                icon={Trophy}
                color="border-neon-yellow"
                onClose={() => setCurrentView("dashboard")}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20 relative z-10 px-4 sm:px-0">
                  {/* --- LEFT COLUMN: PLAYER RANK & STATS --- */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-5 sm:p-8 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Trophy className="w-24 h-24 sm:w-32 sm:h-32 text-neon-yellow" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-[10px] font-black text-neon-yellow uppercase tracking-[0.3em] mb-1">
                          SUA DIVISíƒO
                        </p>
                        <h3 className="text-3xl sm:text-4xl font-black uppercase italic mb-2 tracking-tighter text-white">
                          â›“ï¸ FERRO IV
                        </h3>
                        <p className="text-sm font-black text-neon-green uppercase tracking-widest mb-6 sm:mb-8">
                          TOP 5% GLOBAL
                        </p>

                        <div className="space-y-6 mb-8 sm:mb-10">
                          <div>
                            <div className="flex justify-between items-end mb-2">
                              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                                RANK ATUAL
                              </span>
                              <span className="text-xl sm:text-2xl font-black text-white italic">
                                #12
                              </span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <div className="h-full w-[70%] bg-linear-to-r from-neon-yellow to-orange-500 shadow-[0_0_15px_rgba(255,242,0,0.3)]" />
                            </div>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-2 italic text-right">
                              Mais 2.5k XP para o Rank #11
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/5">
                              <p className="text-[8px] font-black text-white/30 uppercase mb-1">
                                Taxa de Foco
                              </p>
                              <p className="text-lg sm:text-xl font-black text-neon-yellow italic">
                                94%
                              </p>
                            </div>
                            <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/5">
                              <p className="text-lg sm:text-xl font-black text-orange-400 italic">
                                07
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-black border border-white/10 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neon-yellow/10 flex items-center justify-center border border-neon-yellow/20">
                              <TrendingUp className="w-5 h-5 text-neon-yellow" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-white/80 uppercase tracking-tight">
                                Evoluí§í£o Diária
                              </p>
                              <p className="text-[9px] font-black text-neon-green uppercase">
                                +128 POSIí‡í•ES
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- RIGHT COLUMN: LEADERBOARD --- */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 sm:px-6 mb-2 gap-2">
                      <div className="flex items-center gap-4">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                          RANK GLOBAL
                        </p>
                        <div className="hidden sm:block h-px w-20 bg-white/5" />
                        <p className="text-[10px] font-black text-neon-yellow/40 uppercase tracking-[0.4em]">
                          TEMPORADA 01
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[9px] font-black text-white/40 uppercase">
                          Termina em: 12d 04h
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          rank: 1,
                          name: "KronosMaster",
                          instagram: "kronos_official",
                          xp: "48.2k",
                          badge: "ðŸ‘‘",
                          division: "DIAMANTE I",
                          status: "ONLINE",
                        },
                        {
                          rank: 2,
                          name: "Alpha_Prime",
                          instagram: "alpha.fitness",
                          xp: "42.1k",
                          badge: "âš¡",
                          division: "PLATINA II",
                          status: "EM MISSÃO",
                        },
                        {
                          rank: 3,
                          name: "IronMonk",
                          instagram: "iron_monk_life",
                          xp: "38.7k",
                          badge: "ðŸ”¥",
                          division: "OURO IV",
                          status: "ONLINE",
                        },
                        {
                          rank: 4,
                          name: "CyberWolf",
                          instagram: "cyberwolf_fit",
                          xp: "35.2k",
                          badge: "ðŸ—¡ï¸",
                          division: "PRATA I",
                          status: "OFFLINE",
                        },
                        {
                          rank: 5,
                          name: "ShadowStep",
                          instagram: "shadow_step",
                          xp: "31.9k",
                          badge: "ðŸ‘¤",
                          division: "PRATA III",
                          status: "ONLINE",
                        },
                        {
                          rank: 11,
                          name: "Elite_Gamer",
                          instagram: "elite_gym",
                          xp: "18.5k",
                          badge: "ðŸŒ€",
                          division: "FERRO I",
                          status: "ONLINE",
                        },
                        {
                          rank: 12,
                          name: "TEST_GUERREIRO",
                          instagram: "test_warrior",
                          xp: "14.2k",
                          badge: "ðŸŽ¯",
                          division: "FERRO IV",
                          status: "ONLINE",
                          isMe: true,
                        },
                        {
                          rank: 13,
                          name: "CyberWolf",
                          instagram: "wolf_pack",
                          xp: "13.9k",
                          badge: "ðŸ‰",
                          division: "FERRO IV",
                          status: "OFFLINE",
                        },
                      ].map((r, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-center gap-3 sm:gap-6 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-2 transition-all group overflow-hidden relative
                                                            ${
                                                              r.isMe
                                                                ? "bg-neon-green/10 border-neon-green/30 shadow-[0_0_20px_rgba(56,242,127,0.1)]"
                                                                : r.rank <= 3
                                                                  ? "bg-neon-yellow/5 border-neon-yellow/20 hover:bg-neon-yellow/10"
                                                                  : "bg-white/1 border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                                                            }`}
                        >
                          {/* Rank Number */}
                          <div className="w-8 sm:w-12 flex flex-col items-center">
                            <span
                              className={`text-xl sm:text-2xl font-black italic leading-none
                                                                ${
                                                                  r.rank === 1
                                                                    ? "text-neon-yellow"
                                                                    : r.rank ===
                                                                        2
                                                                      ? "text-white/80"
                                                                      : r.rank ===
                                                                          3
                                                                        ? "text-orange-400"
                                                                        : r.isMe
                                                                          ? "text-neon-green"
                                                                          : "text-white/20"
                                                                }`}
                            >
                              {r.rank < 10 ? `0${r.rank}` : r.rank}
                            </span>
                          </div>

                          {/* Avatar/Badge */}
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl
                                                            ${r.rank <= 3 ? "bg-white/5 border border-white/10" : "bg-black/40"}`}
                          >
                            {r.badge}
                          </div>

                          {/* Name & Title */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                              <h4
                                className={`text-sm sm:text-lg font-black uppercase italic truncate ${r.isMe ? "text-neon-green" : "text-white/90"}`}
                              >
                                {r.name} {r.isMe && "(VOCÊ)"}
                              </h4>
                              {r.status === "ONLINE" && (
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-neon-green shadow-[0_0_5px_rgba(56,242,127,1)]" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-2.5 h-2.5 text-white" />
                              <span className="text-[7px] sm:text-[9px] font-bold text-white lowercase">
                                @{r.instagram}
                              </span>
                            </div>
                            <p className="text-[7px] sm:text-[8px] font-black text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.25em] truncate mt-0.5">
                              {r.division} â€¢ {r.status}
                            </p>
                          </div>

                          {/* XP Stats */}
                          <div className="text-right">
                            <p
                              className={`text-sm sm:text-xl font-black italic leading-none ${r.isMe ? "text-neon-green" : "text-white"}`}
                            >
                              {r.xp}
                            </p>
                            <p className="text-[7px] sm:text-[9px] font-black text-white/20 uppercase tracking-widest mt-1">
                              XP TOTAL
                            </p>
                          </div>

                          {/* Hover line decoration */}
                          <div
                            className={`absolute left-0 top-0 w-1 h-full transition-all duration-500
                                                            ${
                                                              r.isMe
                                                                ? "bg-neon-green"
                                                                : r.rank === 1
                                                                  ? "bg-neon-yellow scale-y-100"
                                                                  : "bg-white/10 scale-y-0 group-hover:scale-y-100"
                                                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </FullViewWrapper>
            )}

            {currentView === "weeklyChecklist" && (
              <FullViewWrapper
                title="Checklist"
                icon={CheckSquare}
                color="border-neon-green"
                onClose={() => setCurrentView("dashboard")}
              >
                <div className="relative z-10 px-4 sm:px-0 pb-20">
                  {/* Header - Centralized on Mobile with Dynamic Titles */}
                  <div className="mb-8 flex flex-col items-center sm:items-start text-center sm:text-left transition-all duration-300">
                    <h2 className="text-3xl sm:text-4xl font-black uppercase italic text-white mb-2 leading-none">
                      {checklistTab === "calendar"
                        ? "HOJE"
                        : checklistTab === "checklist"
                          ? "Tarefas"
                          : "Pomodoro"}
                    </h2>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
                      {checklistTab === "calendar"
                        ? "Suas Tarefas De Hoje"
                        : checklistTab === "checklist"
                          ? "Sistema Tradicional"
                          : "Metodo Cientifico"}
                    </p>
                  </div>

                  {/* Sub-navigation Menu */}
                  <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
                    {[
                      { id: "calendar", icon: Calendar, label: "Calendí¡rio" },
                      {
                        id: "checklist",
                        icon: CheckSquare,
                        label: "Checklist",
                      },
                      { id: "pomodoro", icon: Timer, label: "Pomodoro" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setChecklistTab(tab.id as any)}
                        className={`flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl border transition-all ${checklistTab === tab.id ? "bg-neon-green text-black border-neon-green shadow-[0_0_20px_rgba(56,242,127,0.3)]" : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"}`}
                      >
                        <tab.icon
                          className={`w-4 h-4 ${checklistTab === tab.id ? "text-black" : "text-neon-green"}`}
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                          {tab.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {checklistTab === "calendar" && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-3xl">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black uppercase italic">
                              Hoje
                            </h3>
                            <button
                              onClick={() => setIsAddingTask(!isAddingTask)}
                              className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center hover:bg-neon-green/20 transition-all group"
                            >
                              <Plus
                                className={`w-5 h-5 text-neon-green transition-transform ${isAddingTask ? "rotate-45" : "group-hover:scale-110"}`}
                              />
                            </button>
                          </div>

                          <AnimatePresence>
                            {isAddingTask && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mb-6"
                              >
                                <div className="p-4 bg-white/3 border border-white/10 rounded-2xl space-y-4">
                                  <div>
                                    <p className="text-[10px] font-black uppercase text-white/40 mb-2 tracking-widest">
                                      Nome da Tarefa
                                    </p>
                                    <input
                                      type="text"
                                      value={newTaskInput}
                                      onChange={(e) =>
                                        setNewTaskInput(e.target.value)
                                      }
                                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-white focus:outline-none focus:border-neon-green/50 transition-all"
                                      placeholder="O que vocíª vai fazer?"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black uppercase text-white/40 mb-2 tracking-widest">
                                      Prioridade
                                    </p>
                                    <div className="grid grid-cols-3 gap-2">
                                      {(
                                        [
                                          "Normal",
                                          "Atení§í£o",
                                          "Urgente",
                                        ] as const
                                      ).map((p) => (
                                        <button
                                          key={p}
                                          onClick={() => setNewTaskPriority(p)}
                                          className={`py-2 rounded-lg text-[10px] font-black uppercase border transition-all ${
                                            newTaskPriority === p
                                              ? p === "Normal"
                                                ? "bg-neon-green/20 border-neon-green/50 text-neon-green"
                                                : p === "Atení§í£o"
                                                  ? "bg-yellow-400/20 border-yellow-400/50 text-yellow-400"
                                                  : "bg-red-500/20 border-red-500/50 text-red-500"
                                              : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                                          }`}
                                        >
                                          {p}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      if (newTaskInput.trim()) {
                                        const day =
                                          new Date().toLocaleDateString(
                                            "pt-BR",
                                            { weekday: "long" },
                                          );
                                        const normalizedDay =
                                          day.charAt(0).toUpperCase() +
                                          day.slice(1).split("-")[0];
                                        setWeeklyTasks((prev) =>
                                          prev.map((d) =>
                                            d.day === normalizedDay
                                              ? {
                                                  ...d,
                                                  tasks: [
                                                    ...d.tasks,
                                                    {
                                                      id: Date.now(),
                                                      title: newTaskInput,
                                                      done: false,
                                                      priority: newTaskPriority,
                                                    },
                                                  ],
                                                }
                                              : d,
                                          ),
                                        );
                                        setNewTaskInput("");
                                        setIsAddingTask(false);
                                      }
                                    }}
                                    className="w-full py-3 bg-neon-green text-black rounded-xl font-black uppercase text-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
                                  >
                                    Salvar Tarefa
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="space-y-6">
                            {(() => {
                              const day = new Date().toLocaleDateString(
                                "pt-BR",
                                { weekday: "long" },
                              );
                              const normalizedDay =
                                day.charAt(0).toUpperCase() +
                                day.slice(1).split("-")[0];
                              const todayTasks =
                                weeklyTasks.find((d) => d.day === normalizedDay)
                                  ?.tasks || [];

                              const pendingTasks = todayTasks.filter(
                                (t) => !t.done,
                              );
                              const completedTasks = todayTasks.filter(
                                (t) => t.done,
                              );

                              const renderTask = (task: any) => (
                                <div
                                  key={task.id}
                                  className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group"
                                >
                                  <div className="flex items-center gap-4">
                                    <div
                                      onClick={() => {
                                        setWeeklyTasks((prev) =>
                                          prev.map((d) =>
                                            d.day === normalizedDay
                                              ? {
                                                  ...d,
                                                  tasks: d.tasks.map((t) =>
                                                    t.id === task.id
                                                      ? { ...t, done: !t.done }
                                                      : t,
                                                  ),
                                                }
                                              : d,
                                          ),
                                        );
                                      }}
                                      className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-all ${task.done ? "bg-neon-green border-neon-green shadow-[0_0_10px_rgba(56,242,127,0.5)]" : "border-white bg-black/40"} flex items-center justify-center`}
                                    >
                                      {task.done && (
                                        <Check className="w-3 h-3 text-black stroke-[4px]" />
                                      )}
                                    </div>
                                    <span
                                      className={`text-sm font-black uppercase tracking-tight ${task.done ? "text-white/40 line-through" : "text-white"}`}
                                    >
                                      {task.title}
                                    </span>
                                  </div>
                                  {task.priority && (
                                    <div
                                      className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${
                                        task.priority === "Normal"
                                          ? "bg-neon-green/10 text-neon-green"
                                          : task.priority === "Atení§í£o"
                                            ? "bg-yellow-400/10 text-yellow-400"
                                            : "bg-red-500/10 text-red-500"
                                      }`}
                                    >
                                      {task.priority}
                                    </div>
                                  )}
                                </div>
                              );

                              return (
                                <>
                                  {/* Active Tasks */}
                                  <div className="space-y-3">
                                    {pendingTasks.length === 0 &&
                                      !isAddingTask &&
                                      completedTasks.length === 0 && (
                                        <p className="text-center py-8 text-white/10 font-black uppercase italic text-xs">
                                          Nenhuma tarefa para hoje
                                        </p>
                                      )}
                                    {pendingTasks.map(renderTask)}
                                  </div>

                                  {/* Completed Tasks Section */}
                                  {completedTasks.length > 0 && (
                                    <div className="pt-4 border-t border-white/5 space-y-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green/40" />
                                        <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                                          Concluí­do
                                        </p>
                                      </div>
                                      {completedTasks.map(renderTask)}
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {checklistTab === "checklist" && (
                      <motion.div
                        key="checklist"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-3xl">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black uppercase italic">
                              Tarefas
                            </h3>
                            <button
                              onClick={() =>
                                setIsAddingPersonalTask(!isAddingPersonalTask)
                              }
                              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${isAddingPersonalTask ? "bg-red-500/10 border-red-500/20 rotate-45" : "bg-neon-green/10 border-neon-green/20"} hover:scale-105`}
                            >
                              <Plus
                                className={`w-5 h-5 ${isAddingPersonalTask ? "text-red-500" : "text-neon-green"}`}
                              />
                            </button>
                          </div>

                          <AnimatePresence>
                            {isAddingPersonalTask && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mb-8"
                              >
                                <div className="p-5 bg-white/3 border border-white/10 rounded-2xl space-y-4">
                                  <div>
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">
                                      Nome da Tarefa
                                    </p>
                                    <input
                                      type="text"
                                      value={newPersonalTaskInput}
                                      onChange={(e) =>
                                        setNewPersonalTaskInput(e.target.value)
                                      }
                                      placeholder="O que precisa ser feito?"
                                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/10 focus:border-neon-green/50 outline-none transition-all"
                                    />
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">
                                        Prioridade
                                      </p>
                                      <div className="flex gap-2">
                                        {["Normal", "Atení§í£o", "Urgente"].map(
                                          (p) => (
                                            <button
                                              key={p}
                                              onClick={() =>
                                                setNewPersonalTaskPriority(
                                                  p as any,
                                                )
                                              }
                                              className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase border transition-all ${
                                                newPersonalTaskPriority === p
                                                  ? p === "Normal"
                                                    ? "bg-neon-green/20 border-neon-green/40 text-neon-green"
                                                    : p === "Atení§í£o"
                                                      ? "bg-yellow-400/20 border-yellow-400/40 text-yellow-400"
                                                      : "bg-red-500/20 border-red-500/40 text-red-500"
                                                  : "bg-white/5 border-white/5 text-white/20 hover:bg-white/10"
                                              }`}
                                            >
                                              {p}
                                            </button>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">
                                        Data
                                      </p>
                                      <input
                                        type="date"
                                        value={newPersonalTaskDate}
                                        onChange={(e) =>
                                          setNewPersonalTaskDate(e.target.value)
                                        }
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-neon-green/50 transition-all [color-scheme:dark]"
                                      />
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => {
                                      if (!newPersonalTaskInput.trim()) return;
                                      const newTask = {
                                        id: Date.now(),
                                        title: newPersonalTaskInput,
                                        priority: newPersonalTaskPriority,
                                        date: newPersonalTaskDate,
                                        done: false,
                                      };
                                      setPersonalTasks((prev) => [
                                        ...prev,
                                        newTask,
                                      ]);
                                      setNewPersonalTaskInput("");
                                      setIsAddingPersonalTask(false);
                                    }}
                                    className="w-full mt-2 py-3 bg-neon-green text-black rounded-xl font-black uppercase text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Salvar Tarefa
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div className="space-y-6">
                            {(() => {
                              const pending = personalTasks.filter(
                                (t) => !t.done,
                              );
                              const completed = personalTasks.filter(
                                (t) => t.done,
                              );

                              const renderPersonal = (task: any) => (
                                <div
                                  key={task.id}
                                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between group ${task.done ? "bg-neon-green/5 border-neon-green/20" : "bg-white/[0.02] border-white/5 hover:bg-white/5"}`}
                                >
                                  <div
                                    onClick={() =>
                                      setPersonalTasks((prev) =>
                                        prev.map((t) =>
                                          t.id === task.id
                                            ? { ...t, done: !t.done }
                                            : t,
                                        ),
                                      )
                                    }
                                    className="flex items-center gap-4 cursor-pointer flex-1"
                                  >
                                    <div
                                      className={`w-5 h-5 rounded border ${task.done ? "bg-neon-green border-neon-green" : "border-white/20"} flex items-center justify-center`}
                                    >
                                      {task.done && (
                                        <CheckSquare className="w-3.5 h-3.5 text-black" />
                                      )}
                                    </div>
                                    <div className="flex flex-col">
                                      <span
                                        className={`text-sm font-bold ${task.done ? "text-white/30 line-through" : "text-white"}`}
                                      >
                                        {task.title}
                                      </span>
                                      {task.date && (
                                        <span className="text-[8px] text-white/20 font-black uppercase tracking-wider mt-0.5">
                                          {new Date(
                                            task.date,
                                          ).toLocaleDateString("pt-BR")}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-1.5">
                                    {task.priority && (
                                      <div
                                        className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${
                                          task.priority === "Normal"
                                            ? "bg-neon-green/10 text-neon-green"
                                            : task.priority === "Atení§í£o"
                                              ? "bg-yellow-400/10 text-yellow-400"
                                              : "bg-red-500/10 text-red-500"
                                        }`}
                                      >
                                        {task.priority}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );

                              return (
                                <>
                                  <div className="space-y-3">
                                    {personalTasks.length === 0 && (
                                      <p className="text-center py-8 text-white/10 font-black uppercase italic text-xs">
                                        Seu checklist estí¡ vazio
                                      </p>
                                    )}
                                    {pending.map(renderPersonal)}
                                  </div>

                                  {completed.length > 0 && (
                                    <div className="pt-4 border-t border-white/5 space-y-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green/40" />
                                        <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                                          Concluí­do
                                        </p>
                                      </div>
                                      {completed.map(renderPersonal)}
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {checklistTab === "pomodoro" && (
                      <motion.div
                        key="pomodoro"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="max-w-4xl mx-auto w-full px-2 lg:px-0"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                          {/* Timer Section */}
                          <div className="lg:col-span-3 p-6 sm:p-10 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] sm:rounded-[3rem] text-center relative overflow-hidden h-fit">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-neon-green to-transparent opacity-30" />

                            <div className="mb-6">
                              <p className="text-[10px] font-black text-neon-green uppercase tracking-[0.2em] mb-2 font-display">
                                {pomodoroGroup.length > 0 &&
                                currentPomodoroIdx < pomodoroGroup.length
                                  ? `FOCO EM: ${pomodoroGroup[currentPomodoroIdx].title}`
                                  : "DEFINA UM OBJETIVO"}
                              </p>
                              <div className="text-5xl sm:text-7xl font-bold text-white tracking-tight tabular-nums flex justify-center gap-1 sm:gap-2">
                                <span className="min-w-[1.2ch]">
                                  {Math.floor(pomodoroTime / 60)
                                    .toString()
                                    .padStart(2, "0")}
                                </span>
                                <span className="animate-pulse opacity-50">
                                  :
                                </span>
                                <span className="min-w-[1.2ch]">
                                  {(pomodoroTime % 60)
                                    .toString()
                                    .padStart(2, "0")}
                                </span>
                              </div>
                              <p className="text-[8px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mt-2">
                                Mergulhe no Foco
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                              <button
                                disabled={pomodoroGroup.length === 0}
                                onClick={() =>
                                  setPomodoroActive(!pomodoroActive)
                                }
                                className={`w-full sm:flex-1 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm transition-all 
                                                                                        ${
                                                                                          pomodoroGroup.length ===
                                                                                          0
                                                                                            ? "bg-white/5 text-white/10 cursor-not-allowed"
                                                                                            : pomodoroActive
                                                                                              ? "bg-white/10 text-white hover:bg-white/20"
                                                                                              : "bg-neon-green text-black hover:scale-[1.02] shadow-[0_0_30px_rgba(56,242,127,0.3)]"
                                                                                        }`}
                              >
                                {pomodoroGroup.length === 0
                                  ? "Adicione um Objetivo"
                                  : pomodoroActive
                                    ? "Pausar"
                                    : "Iniciar Foco"}
                              </button>
                              <button
                                onClick={() => {
                                  setPomodoroActive(false);
                                  setPomodoroTime(25 * 60);
                                }}
                                className="w-full sm:w-auto px-8 py-4 sm:py-5 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white text-xs sm:text-sm transition-all font-black uppercase"
                              >
                                Reiniciar
                              </button>
                            </div>
                          </div>

                          {/* Group Tasks Section */}
                          <div className="lg:col-span-2 p-6 bg-[#0a0a0a] border border-white/10 rounded-[2rem] flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-black uppercase italic text-white/60">
                                Objetivo
                              </h3>
                              <button
                                onClick={() =>
                                  setIsAddingPomodoroTask(!isAddingPomodoroTask)
                                }
                                className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center hover:bg-neon-green/20 transition-all text-neon-green"
                              >
                                <Plus
                                  className={`w-4 h-4 transition-transform duration-300 ${isAddingPomodoroTask ? "rotate-45 text-red-500" : ""}`}
                                />
                              </button>
                            </div>

                            <AnimatePresence>
                              {isAddingPomodoroTask && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden mb-6"
                                >
                                  <div className="p-4 bg-white/3 border border-white/10 rounded-2xl space-y-4">
                                    <div>
                                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">
                                        Tarefa Principal
                                      </p>
                                      <input
                                        type="text"
                                        value={newPomodoroTaskInput}
                                        onChange={(e) =>
                                          setNewPomodoroTaskInput(
                                            e.target.value,
                                          )
                                        }
                                        placeholder="O que vamos focar?"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/10 focus:border-neon-green/50 outline-none transition-all"
                                      />
                                    </div>
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">
                                          Prioridade
                                        </p>
                                        <div className="flex gap-2">
                                          {[
                                            "Normal",
                                            "Atení§í£o",
                                            "Urgente",
                                          ].map((p) => (
                                            <button
                                              key={p}
                                              onClick={() =>
                                                setNewPomodoroTaskPriority(
                                                  p as any,
                                                )
                                              }
                                              className={`flex-1 py-2 rounded-lg text-[8px] font-black uppercase border transition-all ${
                                                newPomodoroTaskPriority === p
                                                  ? p === "Normal"
                                                    ? "bg-neon-green/20 border-neon-green/40 text-neon-green"
                                                    : p === "Atení§í£o"
                                                      ? "bg-yellow-400/20 border-yellow-400/40 text-yellow-400"
                                                      : "bg-red-500/20 border-red-500/40 text-red-500"
                                                  : "bg-white/5 border-white/5 text-white/20 hover:bg-white/10"
                                              }`}
                                            >
                                              {p}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="space-y-4">
                                        <div>
                                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">
                                            Meta (Sessíµes)
                                          </p>
                                          <input
                                            type="number"
                                            min="1"
                                            value={newPomodoroTaskSessions}
                                            onChange={(e) =>
                                              setNewPomodoroTaskSessions(
                                                parseInt(e.target.value) || 1,
                                              )
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-neon-green/50 transition-all font-black"
                                          />
                                        </div>
                                        <div>
                                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">
                                            Prazo (Dias)
                                          </p>
                                          <input
                                            type="number"
                                            min="1"
                                            value={newPomodoroTaskDays}
                                            onChange={(e) =>
                                              setNewPomodoroTaskDays(
                                                parseInt(e.target.value) || 1,
                                              )
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-neon-green/50 transition-all font-black"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => {
                                        if (!newPomodoroTaskInput.trim())
                                          return;
                                        setPomodoroGroup((prev) => [
                                          ...prev,
                                          {
                                            id: Date.now(),
                                            title: newPomodoroTaskInput,
                                            done: false,
                                            priority: newPomodoroTaskPriority,
                                            targetSessions:
                                              newPomodoroTaskSessions,
                                            completedSessions: 0,
                                            targetDays: newPomodoroTaskDays,
                                          },
                                        ]);
                                        setNewPomodoroTaskInput("");
                                        setNewPomodoroTaskSessions(1);
                                        setNewPomodoroTaskDays(30);
                                        setIsAddingPomodoroTask(false);
                                      }}
                                      className="w-full mt-2 py-3 bg-neon-green text-black rounded-xl font-black uppercase text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                      Salvar Objetivo
                                    </button>
                                  </div>
                                </motion.div>
                              )}

                              {pomodoroActive && pomodoroGroup.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
                                >
                                  <div className="max-w-md w-full text-center space-y-12">
                                    <div>
                                      <p className="text-[10px] font-black text-neon-green uppercase tracking-[0.4em] mb-4">
                                        Em Foco Agora
                                      </p>
                                      <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter">
                                        {
                                          pomodoroGroup[currentPomodoroIdx]
                                            ?.title
                                        }
                                      </h2>
                                    </div>

                                    <div className="relative inline-flex items-center justify-center">
                                      <svg className="w-64 h-64 sm:w-80 sm:h-80 -rotate-90">
                                        <circle
                                          cx="50%"
                                          cy="50%"
                                          r="48%"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                          className="text-white/5"
                                        />
                                        <motion.circle
                                          cx="50%"
                                          cy="50%"
                                          r="48%"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                          strokeDasharray="100"
                                          strokeDashoffset={
                                            100 -
                                            (pomodoroTime / (25 * 60)) * 100
                                          }
                                          pathLength="100"
                                          transition={{
                                            duration: 1,
                                            ease: "linear",
                                          }}
                                          className="text-neon-green drop-shadow-[0_0_15px_rgba(56,242,127,0.5)]"
                                        />
                                      </svg>
                                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="text-5xl sm:text-7xl font-bold text-white tracking-tight tabular-nums flex items-center justify-center gap-1 sm:gap-2">
                                          <span>
                                            {Math.floor(pomodoroTime / 60)
                                              .toString()
                                              .padStart(2, "0")}
                                          </span>
                                          <span className="animate-pulse opacity-50">
                                            :
                                          </span>
                                          <span>
                                            {(pomodoroTime % 60)
                                              .toString()
                                              .padStart(2, "0")}
                                          </span>
                                        </div>
                                        <div className="mt-4 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                                          <span className="text-xs font-black text-white/40 uppercase tracking-widest">
                                            Sessí£o{" "}
                                            {pomodoroGroup[currentPomodoroIdx]
                                              ?.completedSessions + 1}{" "}
                                            /{" "}
                                            {
                                              pomodoroGroup[currentPomodoroIdx]
                                                ?.targetSessions
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                      <button
                                        onClick={() => setPomodoroActive(false)}
                                        className="w-full py-5 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                                      >
                                        Pausar Sessí£o
                                      </button>
                                      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                                        Pressione para sair do mergulho
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="space-y-3 flex-1 overflow-y-auto max-h-[400px] pr-1 scrollbar-thin mt-6">
                              {pomodoroGroup.length === 0 && (
                                <p className="text-center py-10 text-white/5 font-black uppercase italic text-[10px]">
                                  Adicione objetivos para comeí§ar
                                </p>
                              )}
                              {pomodoroGroup.map((task, idx) => {
                                const progressPercent = Math.min(
                                  100,
                                  (task.completedSessions /
                                    task.targetSessions) *
                                    100,
                                );
                                const isActiveIdx = idx === currentPomodoroIdx;

                                return (
                                  <div
                                    key={task.id}
                                    className={`p-4 rounded-2xl border transition-all relative overflow-hidden group ${isActiveIdx ? "bg-neon-green/5 border-neon-green/20" : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"}`}
                                  >
                                    <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center gap-4">
                                        <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
                                          <svg className="w-full h-full -rotate-90">
                                            <circle
                                              cx="20"
                                              cy="20"
                                              r="18"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="3"
                                              className="text-white/5"
                                            />
                                            <motion.circle
                                              cx="20"
                                              cy="20"
                                              r="18"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="3"
                                              strokeDasharray="113.1"
                                              initial={{
                                                strokeDashoffset: 113.1,
                                              }}
                                              animate={{
                                                strokeDashoffset:
                                                  113.1 -
                                                  (113.1 * progressPercent) /
                                                    100,
                                              }}
                                              className="text-neon-green"
                                            />
                                          </svg>
                                          <span className="absolute text-[8px] font-black text-white">
                                            {Math.round(progressPercent)}%
                                          </span>
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="text-xs font-black uppercase text-white/80 tracking-wide mb-1.5">
                                            {task.title}
                                          </h4>
                                          <div className="flex flex-col gap-1.5">
                                            <span
                                              className={`w-fit px-1.5 py-0.5 rounded text-[7px] font-black uppercase ${
                                                task.priority === "Normal"
                                                  ? "bg-neon-green/10 text-neon-green"
                                                  : task.priority ===
                                                      "Atení§í£o"
                                                    ? "bg-yellow-400/10 text-yellow-400"
                                                    : "bg-red-500/10 text-red-500"
                                              }`}
                                            >
                                              {task.priority}
                                            </span>
                                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">
                                              {task.targetDays} Dias
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-[9px] font-black text-white">
                                                {task.completedSessions}/
                                                {task.targetSessions}
                                              </span>
                                              <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">
                                                Sessíµes
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() =>
                                          setPomodoroGroup((prev) =>
                                            prev.filter(
                                              (t) => t.id !== task.id,
                                            ),
                                          )
                                        }
                                        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-red-500/10 hover:border-red-500/20 transition-all group/del absolute top-4 right-4"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-white/20 group-hover/del:text-red-500" />
                                      </button>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${progressPercent}%`,
                                        }}
                                        className="h-full bg-neon-green"
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FullViewWrapper>
            )}

            {currentView === "kronos" && (
              <KronosDashboard
                habits={kronosHabits}
                onToggle={toggleKronosHabit}
                onClose={() => setCurrentView("dashboard")}
                onAdd={addKronosHabit}
                onUpdate={updateKronosHabit}
                onDelete={deleteKronosHabit}
              />
            )}

            {currentView === "friends" && (
              <FriendsView
                friends={friendsData}
                onClose={() => setCurrentView("dashboard")}
                searchInput={friendSearchInput}
                setSearchInput={setFriendSearchInput}
                isSearching={isSearchingFriends}
                setIsSearching={setIsSearchingFriends}
                rankingData={rankingData}
                onAddFriend={addFriend}
                currentUser={currentUser}
              />
            )}

            {currentView === "news" && (
              <NewsView
                articles={newsArticles}
                onClose={() => setCurrentView("dashboard")}
              />
            )}

            {currentView === "ai" && (
              <AIChatView
                onExit={() => setCurrentView("dashboard")}
                transactions={transactions}
                projects={projects}
                quests={quests}
                habits={habits}
                budget={budget}
                playerStats={playerStats}
                setTransactions={setTransactions}
                setProjects={setProjects}
                setQuests={setQuests}
              />
            )}

            {currentView === "finance" && (
              <FinancialDashboard
                onExit={() => setCurrentView("dashboard")}
                playerStats={playerStats}
                setPlayerStats={setPlayerStats}
                transactions={transactions}
                setTransactions={setTransactions}
                budget={budget}
                setBudget={setBudget}
                creditCards={creditCards}
                setCreditCards={setCreditCards}
                financialGoals={financialGoals}
                setFinancialGoals={setFinancialGoals}
              />
            )}

            {currentView === "projects" && (
              <ProjectsDashboard
                onExit={() => setCurrentView("dashboard")}
                playerStats={playerStats}
                setPlayerStats={setPlayerStats}
                projects={projects}
                setProjects={setProjects}
              />
            )}

            {/* â•â•â•â• MOBILE LAYOUT â•â•â•â• */}
            <div
              className="lg:hidden flex-1 flex flex-col relative"
              style={{ height: "calc(100dvh - 84px)" }}
            >
              {/* MOBILE HEADER */}
              <ClashHeader
                className="bg-linear-to-b from-black/80 to-transparent md:hidden"
                playerStats={playerStats}
                userMenuOpen={userMenuOpen}
                setUserMenuOpen={setUserMenuOpen}
                UserMenu={UserMenu}
                onCrownClick={() => setIsProgressReportOpen(true)}
              />
              {/* TOP: Character zone â€” fills most of the space */}
              <div className="flex-1 flex flex-col items-center justify-center relative px-4 overflow-hidden">
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,3px_100%]" />

                <div className="absolute inset-0 bg-gradient-radial from-neon-green/5 via-transparent to-transparent opacity-30 pointer-events-none" />
                {/* Ground glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-neon-green/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-12 bg-neon-green/30 rounded-full blur-2xl pointer-events-none" />
                {/* Name plate */}
                <AnimatePresence>
                  {showNamePlate && (
                    <motion.div
                      initial={{ y: 10, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                      className="absolute top-12 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-neon-yellow/30 backdrop-blur-xl rounded-full z-50 whitespace-nowrap"
                    >
                      <Crown className="w-3 h-3 text-neon-yellow" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-neon-yellow">
                        {playerStats.class} â€¢ Ní­vel {playerStats.level}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* XP Damage float */}
                <CharacterStage
                  selectedCharImg={currentColChar}
                  selectedPetImg={currentColPet}
                  isMobile
                  isTouch={isTouchDevice}
                  charAnim={charAnim}
                  setCurrentView={setCurrentView}
                  setActiveShopTab={setActiveShopTab}
                  setShowNamePlate={setShowNamePlate}
                  showNamePlate={showNamePlate}
                  Friends={Friends}
                  Newspaper={Newspaper}
                  onCrownClick={() => setIsProgressReportOpen(true)}
                  onFinanceClick={() => setCurrentView("finance")}
                  onAiChatClick={() => setCurrentView("ai")}
                  onProjectsClick={() => setCurrentView("projects")}
                  Bot={Bot}
                  Briefcase={Briefcase}
                  CircleDollarSign={CircleDollarSign}
                />
              </div>

              {/* BOTTOM: Stats + Buttons â€” anchored just above the nav */}
              <div className="flex flex-col items-center gap-3 px-6 pb-2 shrink-0">
                <div className="w-full max-w-xs space-y-2">
                  {/* XP bar wrapper */}
                  <div className="p-2 bg-white/3 border border-white/5 rounded-2xl backdrop-blur-sm shadow-xl mt-2 space-y-2">
                    <XPBar
                      current={playerStats.xp}
                      max={playerStats.xpMax}
                      label="Progresso de Experiíªncia"
                    />
                    <XPBar
                      current={playerStats.hp}
                      max={playerStats.hpMax}
                      label="Vida"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-4 w-full max-w-xs mt-2">
                  <button
                    onClick={() => setShowModeSelection(true)}
                    className="flex-1 py-4 bg-neon-green text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(56,242,127,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all border-b-4 border-black/20"
                  >
                    <Sword className="w-4 h-4" /> Iniciar Rotina
                  </button>
                  <button
                    onClick={() => setCurrentView("kronos")}
                    className="flex-1 py-4 bg-linear-to-br from-[#FFD700] via-[#FDB931] to-[#9E7E38] border-b-4 border-black/20 text-black font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_10px_30px_rgba(253,185,49,0.4)]"
                  >
                    <Star className="w-4 h-4" /> Kronos
                  </button>
                </div>
              </div>

              {/* Spacer for fixed nav bar */}
              <div className="h-21" />

              {/* BOTTOM NAVIGATION */}
              <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#06140c]/90 backdrop-blur-3xl border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
                {/* Top edge refinement - Gradient glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-green-500/40 to-transparent" />
                <div className="absolute top-px left-0 right-0 h-8 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

                <div className="flex items-center pb-safe">
                  {(
                    [
                      {
                        id: "quests",
                        label: "Rotina",
                        icon: Target,
                        hex: "#FF004C",
                        glow: "rgba(255,0,76,0.5)",
                      },
                      {
                        id: "habits",
                        label: "Hí¡bitos",
                        icon: Flame,
                        hex: "#FF9100",
                        glow: "rgba(255,145,0,0.5)",
                      },
                      {
                        id: "training",
                        label: "Treinos",
                        icon: Swords,
                        hex: "#00F2FF",
                        glow: "rgba(0,242,255,0.5)",
                      },
                      {
                        id: "ranking",
                        label: "Rank",
                        icon: Trophy,
                        hex: "#FFEA00",
                        glow: "rgba(255,234,0,0.5)",
                      },
                      {
                        id: "arsenal",
                        label: "Arsenal",
                        icon: Shield,
                        hex: "#AF47FF",
                        glow: "rgba(175,71,255,0.5)",
                      },
                    ] as const
                  ).map(
                    ({ id, label, icon: Icon, hex, glow }, index, array) => (
                      <React.Fragment key={id}>
                        <button
                          onClick={() => togglePanel(id)}
                          className={`flex-1 flex flex-col items-center gap-1.5 py-4 transition-all active:scale-95 ${mobilePanel === id ? "opacity-100 scale-105" : "opacity-80 scale-100"}`}
                        >
                          <div
                            className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${mobilePanel === id ? "bg-linear-to-br from-white/15 to-white/5 border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.15)]" : "bg-transparent"}`}
                          >
                            <Icon
                              className="w-5.5 h-5.5"
                              style={{
                                color: hex,
                                filter:
                                  mobilePanel === id
                                    ? `drop-shadow(0 0 12px ${glow})`
                                    : "none",
                              }}
                            />
                            {mobilePanel === id && (
                              <motion.div
                                layoutId="tab-indicator"
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]"
                              />
                            )}
                            {mobilePanel === id && (
                              <motion.div
                                layoutId="tab-glow"
                                className="absolute inset-0 blur-2xl rounded-full"
                                style={{ backgroundColor: glow }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                              />
                            )}
                          </div>
                          <span
                            className={`text-[10px] font-black uppercase tracking-[0.18em] text-white ${mobilePanel === id ? "opacity-100 text-shadow-glow scale-110" : "opacity-60"}`}
                          >
                            {label}
                          </span>
                        </button>
                        {index < array.length - 1 && (
                          <div className="h-6 w-px bg-white/10 self-center rounded-full" />
                        )}
                      </React.Fragment>
                    ),
                  )}
                </div>
              </div>

              {/* MOBILE BOTTOM SHEETS */}
              <BottomSheet
                open={mobilePanel === "quests"}
                onClose={() => setMobilePanel(null)}
                title="Painel Rotina"
              >
                <QuestsPanel
                  quests={quests}
                  setQuests={setQuests}
                  setCurrentView={setCurrentView}
                  setIsCreateQuestModalOpen={setIsCreateQuestModalOpen}
                  onToggleQuest={onToggleQuest}
                />
              </BottomSheet>
              <BottomSheet
                open={mobilePanel === "habits"}
                onClose={() => setMobilePanel(null)}
                title="Streaks & Hí¡bitos"
              >
                <HabitsPanel
                  habits={habits}
                  setHabits={setHabits}
                  setCurrentView={setCurrentView}
                  setIsCreateHabitModalOpen={setIsCreateHabitModalOpen}
                  setIsReadyHabitsModalOpen={setIsReadyHabitsModalOpen}
                  setSelectedHabitForTasks={setSelectedHabitForTasks}
                  setIsHabitTasksModalOpen={setIsHabitTasksModalOpen}
                />
              </BottomSheet>
              <BottomSheet
                open={mobilePanel === "training"}
                onClose={() => setMobilePanel(null)}
                title="Treinos da Semana"
              >
                <TrainingPanel
                  weeklyTrainings={weeklyTrainings}
                  setCurrentView={setCurrentView}
                  handleEditTraining={handleEditTraining}
                  handleDeleteTraining={handleDeleteTraining}
                />
              </BottomSheet>
              <BottomSheet
                open={mobilePanel === "ranking"}
                onClose={() => setMobilePanel(null)}
                title="Ranking Global"
              >
                <RankingPanel
                  setCurrentView={setCurrentView}
                  rankingData={rankingData}
                  playerStats={playerStats}
                />
              </BottomSheet>
              <BottomSheet
                open={mobilePanel === "arsenal"}
                onClose={() => setMobilePanel(null)}
                title="Arsenal de Poder"
              >
                <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-purple-400/20 pr-1 pb-4">
                  <ArsenalPanel
                    arsenalSkills={arsenalSkills}
                    toggleSkill={toggleSkill}
                    arsenalBuffs={arsenalBuffs}
                    toggleBuff={toggleBuff}
                    playerStats={playerStats}
                  />
                </div>
              </BottomSheet>
            </div>

            {/* â•â•â•â• DESKTOP LAYOUT (lg+) â•â•â•â• */}
            <div className="hidden lg:flex flex-1 items-stretch overflow-hidden">
              {/* LEFT PANEL */}
              <motion.aside
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="w-64 xl:w-80 2xl:w-96 flex-shrink-0 border-r border-white/5 backdrop-blur-xl bg-black/20 flex flex-col overflow-hidden"
              >
                <div className="flex border-b border-white/5 bg-black/20">
                  {(
                    [
                      { id: "quests", label: "Rotina", icon: Target },
                      { id: "habits", label: "Hí¡bitos", icon: Flame },
                      { id: "training", label: "Treinos", icon: Swords },
                      { id: "ranking", label: "Rank", icon: Trophy },
                    ] as const
                  ).map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveLeft(id)}
                      className={`flex-1 py-2 2xl:py-3 flex flex-col items-center gap-1 text-[8px] 2xl:text-[9px] font-black uppercase tracking-wider transition-all border-b-2 ${activeLeft === id ? "border-neon-green text-neon-green bg-neon-green/5" : "border-transparent text-white/30 hover:text-white/60"}`}
                    >
                      <Icon className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex-1 p-3 2xl:p-4 overflow-hidden flex flex-col min-h-0">
                  <AnimatePresence mode="wait">
                    {activeLeft === "quests" && (
                      <motion.div
                        key="q"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex-1 min-h-0 flex flex-col overflow-hidden space-y-2"
                      >
                        <QuestsPanel
                          quests={quests}
                          setQuests={setQuests}
                          setCurrentView={setCurrentView}
                          setIsCreateQuestModalOpen={setIsCreateQuestModalOpen}
                          onToggleQuest={onToggleQuest}
                        />
                      </motion.div>
                    )}
                    {activeLeft === "habits" && (
                      <motion.div
                        key="h"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex-1 min-h-0 flex flex-col overflow-hidden space-y-3"
                      >
                        <HabitsPanel
                          habits={habits}
                          setHabits={setHabits}
                          setCurrentView={setCurrentView}
                          setIsCreateHabitModalOpen={setIsCreateHabitModalOpen}
                          setIsReadyHabitsModalOpen={setIsReadyHabitsModalOpen}
                          setSelectedHabitForTasks={setSelectedHabitForTasks}
                          setIsHabitTasksModalOpen={setIsHabitTasksModalOpen}
                        />
                      </motion.div>
                    )}
                    {activeLeft === "training" && (
                      <motion.div
                        key="c"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex-1 min-h-0 flex flex-col overflow-hidden space-y-3"
                      >
                        <TrainingPanel
                          weeklyTrainings={weeklyTrainings}
                          setCurrentView={setCurrentView}
                          handleEditTraining={handleEditTraining}
                          handleDeleteTraining={handleDeleteTraining}
                        />
                      </motion.div>
                    )}
                    {activeLeft === "ranking" && (
                      <motion.div
                        key="r"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex-1 min-h-0 flex flex-col overflow-hidden space-y-3"
                      >
                        <RankingPanel
                          setCurrentView={setCurrentView}
                          rankingData={rankingData}
                          playerStats={playerStats}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="p-3 2xl:p-4 border-t border-white/5 bg-black/20 space-y-2 2xl:space-y-2.5 flex-shrink-0">
                  <XPBar
                    current={playerStats.xp}
                    max={playerStats.xpMax}
                    label="Experiíªncia"
                  />
                  <XPBar
                    current={playerStats.hp}
                    max={playerStats.hpMax}
                    label="Vida"
                  />
                </div>
              </motion.aside>

              {/* CENTER â€” Character Stage */}
              <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-neon-green/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-neon-green/20 rounded-full blur-xl pointer-events-none" />
                {/* Name plate */}
                <AnimatePresence>
                  {showNamePlate && (
                    <motion.div
                      initial={{ y: -20, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -20, opacity: 0, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                      className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-20"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/60 border border-neon-yellow/30 backdrop-blur-xl rounded-full">
                        <Crown className="w-3.5 h-3.5 text-neon-yellow" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-neon-yellow">
                          {playerStats.class}
                        </span>
                        <span className="text-[10px] font-black text-white/30">
                          â€¢
                        </span>
                        <span className="text-[10px] font-black text-white/60">
                          Ní­vel {playerStats.level}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* XP floating */}
                <CharacterStage
                  selectedCharImg={currentColChar}
                  selectedPetImg={currentColPet}
                  isTouch={isTouchDevice}
                  charAnim={charAnim}
                  setCurrentView={setCurrentView}
                  setActiveShopTab={setActiveShopTab}
                  setShowNamePlate={setShowNamePlate}
                  showNamePlate={showNamePlate}
                  Friends={Friends}
                  Newspaper={Newspaper}
                  onCrownClick={() => setIsProgressReportOpen(true)}
                  onFinanceClick={() => setCurrentView("finance")}
                  onAiChatClick={() => setCurrentView("ai")}
                  onProjectsClick={() => setCurrentView("projects")}
                  Bot={Bot}
                  Briefcase={Briefcase}
                  CircleDollarSign={CircleDollarSign}
                />
                {/* HP bar */}
                <div className="absolute bottom-[7.5rem] left-1/2 -translate-x-1/2 w-64 z-20">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center px-1">
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/20" />
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                          Vida
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-red-400">
                        {Math.floor(playerStats.hp)}/{playerStats.hpMax}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(playerStats.hp / playerStats.hpMax) * 100}%`,
                        }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="h-full bg-linear-to-r from-red-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 2xl:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
                >
                  <button
                    onClick={() => setShowModeSelection(true)}
                    className="px-6 py-4 xl:px-8 xl:py-4 2xl:px-10 2xl:py-5 bg-neon-green text-black font-black text-[12px] xl:text-[14px] 2xl:text-base uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(56,242,127,0.4)] hover:shadow-[0_0_30px_rgba(56,242,127,0.6)] hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Sword className="w-5 h-5 2xl:w-6 2xl:h-6" /> Iniciar Rotina
                  </button>
                  <button
                    onClick={() => setCurrentView("kronos")}
                    className="px-6 py-4 xl:px-8 xl:py-4 2xl:px-10 2xl:py-5 bg-linear-to-br from-[#FFD700] via-[#FDB931] to-[#9E7E38] border-b-4 border-black/20 text-black font-black text-[12px] xl:text-[14px] 2xl:text-base uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(253,185,49,0.4)] hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Star className="w-5 h-5 2xl:w-6 2xl:h-6" /> Kronos
                  </button>
                </motion.div>
              </div>

              {/* RIGHT PANEL */}
              <motion.aside
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="w-60 xl:w-72 2xl:w-80 flex-shrink-0 border-l border-white/5 backdrop-blur-xl bg-black/20 flex flex-col overflow-y-auto scrollbar-thin"
              >
                <div className="p-3 2xl:p-4 border-b border-white/5 bg-black/20">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 2xl:w-5 2xl:h-5 text-purple-400" />
                    <span className="text-[10px] 2xl:text-xs font-black uppercase tracking-widest text-white">
                      Arsenal de Poder
                    </span>
                  </div>
                </div>
                <div className="p-3 2xl:p-4 space-y-4">
                  <ArsenalPanel
                    arsenalSkills={arsenalSkills}
                    toggleSkill={toggleSkill}
                    arsenalBuffs={arsenalBuffs}
                    toggleBuff={toggleBuff}
                    playerStats={playerStats}
                  />
                </div>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {settingsOpen && (
          <SettingsModal
            onClose={() => setSettingsOpen(false)}
            volume={volume}
            setVolume={setVolume}
          />
        )}
      </AnimatePresence>

      <ProgressReportModal
        isOpen={isProgressReportOpen}
        onClose={() => setIsProgressReportOpen(false)}
        stats={playerStats}
      />
      <AnimatePresence>
        {activeShopTab && (
          <UnifiedShopModal
            activeTab={activeShopTab as "characters" | "pets"}
            onClose={() => setActiveShopTab(null)}
            playerGold={playerStats.gold}
            ownedChars={ownedCharacters}
            ownedPets={ownedPets}
            selectedCharId={selectedCharId}
            selectedPetId={selectedPetId}
            onBuy={(type, id, price) => {
              if (playerStats.gold >= price) {
                setPlayerStats((prev) => ({
                  ...prev,
                  gold: prev.gold - price,
                }));
                if (type === "characters")
                  setOwnedCharacters((prev) => [...prev, id]);
                else setOwnedPets((prev) => [...prev, id]);
              } else {
                setValidationError("CASH insuficiente para esta aquisií§í£o!");
              }
            }}
            onSelect={(type, id) => {
              if (type === "characters") {
                setSelectedCharId(id);
                const char = SHOP_CHARACTERS.find((c) => c.id === id);
                if (char)
                  setPlayerStats((prev) => ({ ...prev, class: char.name }));
              } else {
                setSelectedPetId(id);
              }
            }}
          />
        )}
      </AnimatePresence>
      <ValidationModal
        isOpen={!!validationError}
        onClose={() => setValidationError(null)}
        message={validationError || ""}
      />
      <CreateQuestModal
        isOpen={isCreateQuestModalOpen}
        onClose={() => setIsCreateQuestModalOpen(false)}
        onSave={(newQuest) => {
          setQuests((prev) => [
            { ...newQuest, done: false, streak: 0 },
            ...prev,
          ]);
          setIsCreateQuestModalOpen(false);
        }}
      />

      <CreateHabitModal
        isOpen={isCreateHabitModalOpen}
        onClose={() => setIsCreateHabitModalOpen(false)}
        onSave={(newHabit) => {
          setHabits((prev) => [
            {
              ...newHabit,
              id: Date.now(),
              name: newHabit.title,
              streak: 0,
              completed: [],
            },
            ...prev,
          ]);
          setIsCreateHabitModalOpen(false);
        }}
      />

      <ReadyHabitsModal
        isOpen={isReadyHabitsModalOpen}
        onClose={() => setIsReadyHabitsModalOpen(false)}
        onAdd={(newHabit) => {
          setHabits((prev) => [
            {
              ...newHabit,
              id: Date.now(),
              name: newHabit.title,
              streak: 0,
              completed: [],
            },
            ...prev,
          ]);
          setIsReadyHabitsModalOpen(false);
        }}
        canAdd={habits.length === 0}
      />

      <HabitTasksModal
        habit={selectedHabitForTasks}
        isOpen={isHabitTasksModalOpen}
        onClose={() => {
          setIsHabitTasksModalOpen(false);
          setSelectedHabitForTasks(null);
        }}
      />

      <CreateTrainingModal
        isOpen={isCreateTrainingModalOpen}
        onClose={() => setIsCreateTrainingModalOpen(false)}
        onCreate={(training) => {
          setWeeklyTrainings((prev) => {
            const existingIdx = prev.findIndex((t) => t.day === training.day);
            if (existingIdx !== -1) {
              // Mesclar com treino existente
              return prev.map((t, i) => {
                if (i === existingIdx) {
                  return {
                    ...t,
                    exercises: [...t.exercises, ...training.exercises],
                    // Tenta somar duraí§íµes se forem níºmeros simples
                    duration:
                      parseInt(t.duration) +
                      parseInt(training.duration) +
                      " min",
                    done: false,
                  };
                }
                return t;
              });
            }
            // Novo treino para este dia
            return [...prev, { ...training, done: false }];
          });
          setIsCreateTrainingModalOpen(false);
        }}
      />

      <EditTrainingModal
        isOpen={isEditTrainingModalOpen}
        training={
          editingTrainingIndex !== null
            ? weeklyTrainings[editingTrainingIndex]
            : null
        }
        onClose={() => {
          setIsEditTrainingModalOpen(false);
          setEditingTrainingIndex(null);
        }}
        onSave={handleSaveTraining}
      />

      <ModeSelectionModal
        isOpen={showModeSelection}
        onClose={() => setShowModeSelection(false)}
        onStart={startBattle}
      />

      {currentView === "battle" && battleTasks.length > 0 && (
        <BattleView
          tasks={battleTasks}
          totalTime={battleTotalTime}
          battleIndex={battleCount}
          onExit={() => {
            setCurrentView("dashboard");
          }}
          onVictory={() => {
            setBattleCount((prev) => prev + 1);
            setPlayerStats((prev: any) => ({
              ...prev,
              victories: (prev.victories || 0) + 1,
              questsCompleted:
                currentBattleMode === "rotina"
                  ? (prev.questsCompleted || 0) + battleTasks.length
                  : prev.questsCompleted || 0,
              habitsCompleted:
                currentBattleMode === "habitos"
                  ? (prev.habitsCompleted || 0) + battleTasks.length
                  : prev.habitsCompleted || 0,
              trainingsCompleted:
                currentBattleMode === "treinos"
                  ? (prev.trainingsCompleted || 0) + battleTasks.length
                  : prev.trainingsCompleted || 0,
            }));
            if (currentBattleMode === "rotina") {
              setQuests([]);
            } else if (currentBattleMode === "habitos") {
              setHabits([]);
            } else if (currentBattleMode === "treinos") {
              setWeeklyTrainings([]);
            }
          }}
          onAbort={() => {
            setPlayerStats((prev: any) => ({
              ...prev,
              hp: Math.max(0, prev.hp - 50),
              gold: Math.max(0, prev.gold - 150),
              defeats: (prev.defeats || 0) + 1,
            }));
            setCurrentView("dashboard");
          }}
          onTaskComplete={gainReward}
          onFullReset={handleFullReset}
        />
      )}

      <AnimatePresence>
        {Math.floor(playerStats.hp) <= 0 && currentView !== "battle" && (
          <GameOverOverlay onReset={handleFullReset} />
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ Global Game Over Overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function GameOverOverlay({ onReset }: { onReset: () => void }) {
  const MOTIVATIONAL_PHRASES = [
    "A derrota ní£o í© o fim. í‰ o comeí§o de uma nova batalha.",
    "Os guerreiros mais fortes foram construí­dos pelas suas piores derrotas.",
    "Cada queda í© uma lií§í£o. Levante-se mais forte do que antes.",
    "O caminho para a vití³ria passa pelo fracasso. Continue.",
    "Recomeí§ar do zero í© o privilí©gio dos corajosos. Você í© um.",
    "Ní£o existe guerreiro invencí­vel â€” existe quem nunca desistiu.",
  ];
  const phrase =
    MOTIVATIONAL_PHRASES[
      Math.floor(Date.now() / 1000) % MOTIVATIONAL_PHRASES.length
    ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(180,0,0,0.4) 0%, #000000 80%)",
      }}
    >
      {/* Falling red particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-20 bg-linear-to-b from-red-600 to-transparent rounded-full"
            style={{ left: `${(i * 7) % 100}%`, top: "-10%" }}
            animate={{ y: ["0%", "110vh"], opacity: [0, 1, 0] }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: i * 0.1,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="mb-8 w-28 h-28 rounded-full border-4 border-red-600 bg-red-950/40 flex items-center justify-center shadow-[0_0_100px_rgba(220,38,38,0.7)]"
      >
        <span className="text-6xl select-none">ðŸ’€</span>
      </motion.div>

      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl sm:text-8xl font-black uppercase italic text-red-600 mb-4 text-center tracking-tighter"
        style={{ textShadow: "0 0 40px rgba(220,38,38,0.8)" }}
      >
        GAME OVER
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-md text-center mb-10 px-8 py-5 bg-white/3 border border-white/10 rounded-[2rem] backdrop-blur-md"
      >
        <p className="text-white/80 text-lg font-medium italic leading-relaxed">
          "{phrase}"
        </p>
      </motion.div>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onReset}
        className="px-12 py-6 bg-linear-to-r from-red-700 to-red-600 text-white font-black text-sm uppercase tracking-[0.3em] rounded-3xl shadow-[0_20px_50px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95 transition-all border border-red-500/50"
      >
        REVANCHE (RECOMEí‡AR DO ZERO)
      </motion.button>
    </motion.div>
  );
}

// â”€â”€â”€ Edit Training Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function EditTrainingModal({
  isOpen,
  training,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  training: Training | null;
  onClose: () => void;
  onSave: (updated: Training) => void;
}) {
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (training) {
      setDay(training.day);
      setName(training.name);
      setDuration(training.duration);
      setExercises([...training.exercises]);
    }
  }, [training]);

  const addExercise = () =>
    setExercises((prev) => [
      ...prev,
      { name: "", series: 0, kg: 0, reps: 0, done: false },
    ]);
  const removeExercise = (idx: number) =>
    setExercises((prev) => prev.filter((_, i) => i !== idx));
  const updateExercise = (
    idx: number,
    field: keyof Exercise,
    val: string | number,
  ) =>
    setExercises((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [field]: val } : e)),
    );

  return (
    <AnimatePresence>
      {isOpen && training && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-5000"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl z-5001 overflow-hidden max-h-[85vh] flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-neon-yellow to-neon-green" />
            <div className="p-6 overflow-y-auto scrollbar-thin flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase italic">
                  Editar Treino
                </h3>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Day */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    Dia da Semana
                  </label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors text-white appearance-none"
                  >
                    {["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"].map(
                      (d) => (
                        <option
                          key={d}
                          value={d}
                          className="bg-black text-white"
                        >
                          {d}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    Nome do Treino
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Peito & Trí­ceps"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    Duraí§í£o
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Ex: 60 min"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                  />
                </div>

                {/* Exercises */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      Exercí­cios
                    </label>
                    <button
                      onClick={addExercise}
                      className="flex items-center gap-1 text-[9px] font-black text-neon-green uppercase tracking-widest hover:text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Adicionar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {exercises.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={ex.name}
                            onChange={(e) =>
                              updateExercise(idx, "name", e.target.value)
                            }
                            placeholder={`Nome do Exercí­cio ${idx + 1}`}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-neon-green transition-colors"
                          />
                          <button
                            onClick={() => removeExercise(idx)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-white/30 hover:text-red-500" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[8px] font-black uppercase text-white/30 mb-1">
                              Sí©rie
                            </label>
                            <input
                              type="number"
                              value={ex.series}
                              onChange={(e) =>
                                updateExercise(
                                  idx,
                                  "series",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none focus:border-neon-green"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-black uppercase text-white/30 mb-1">
                              KG
                            </label>
                            <input
                              type="number"
                              value={ex.kg}
                              onChange={(e) =>
                                updateExercise(
                                  idx,
                                  "kg",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none focus:border-neon-green"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-black uppercase text-white/30 mb-1">
                              Reps
                            </label>
                            <input
                              type="number"
                              value={ex.reps}
                              onChange={(e) =>
                                updateExercise(
                                  idx,
                                  "reps",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none focus:border-neon-green"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    onSave({
                      day,
                      name,
                      exercises: exercises.filter((e) => e.name.trim() !== ""),
                      duration,
                      done: training.done,
                    })
                  }
                  className="w-full mt-4 bg-linear-to-r from-neon-yellow to-neon-green text-black font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_10px_30px_rgba(253,224,71,0.2)] hover:shadow-[0_10px_40px_rgba(56,242,127,0.4)] transition-all flex justify-center items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Salvar Alteraí§íµes no Protocolo
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SettingsModal({
  onClose,
  volume,
  setVolume,
}: {
  onClose: () => void;
  volume: number;
  setVolume: (v: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-2000 flex items-center justify-center bg-black/95 backdrop-blur-3xl px-4 cursor-pointer"
      onClick={onClose}
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%]" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible bg-[#0a0a0a] border-2 sm:border-4 border-white/10 rounded-3xl sm:rounded-[2rem] shadow-[20px_20px_60px_rgba(0,0,0,0.8)] relative z-20 cursor-default scrollbar-none"
      >
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-neon-yellow rounded-tl-[2rem] -translate-x-1 -translate-y-1 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-neon-green rounded-tr-[2rem] translate-x-1 -translate-y-1 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-neon-green rounded-bl-[2rem] -translate-x-1 translate-y-1 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-neon-yellow rounded-br-[2rem] translate-x-1 translate-y-1 pointer-events-none" />

        <div className="p-5 sm:p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-neon-yellow/10 rounded-xl flex items-center justify-center border border-neon-yellow shadow-[0_0_20px_rgba(255,242,0,0.2)]">
              <Settings className="w-5 h-5 sm:w-7 sm:h-7 text-neon-yellow" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-black uppercase tracking-[0.2em] text-white">
                Configurações
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                <p className="text-[7px] sm:text-[9px] font-black text-neon-green/60 uppercase tracking-widest leading-none">
                  SISTEMA KRONOS v.1.0_
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 border border-white/10 transition-all active:scale-95 group relative z-[50]"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 group-hover:text-white" />
          </button>
        </div>

        <div className="p-5 sm:p-8 space-y-5 sm:space-y-8 bg-linear-to-b from-transparent to-white/[0.01]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-6 bg-neon-yellow/50" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neon-yellow/60">
                CONTROLE DE SINTONIA
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-neon-yellow" />{" "}
                    VOLUME_MESTRE
                  </p>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-neon-yellow leading-none">
                      {volume}
                    </span>
                    <span className="text-[8px] font-bold text-white/20 uppercase">
                      PERCENTUAL
                    </span>
                  </div>
                </div>
                <div className="relative h-4 bg-white/5 border border-white/10 rounded-full cursor-pointer flex items-center overflow-hidden">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                  />
                  <motion.div
                    animate={{ width: `${volume}%` }}
                    className="h-full bg-linear-to-r from-neon-yellow to-yellow-500 shadow-[0_0_20px_rgba(255,242,0,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-6 bg-neon-green/50" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neon-green/60">
                PERFORMANCE VISUAL
              </p>
            </div>
            <div className="flex items-center justify-between p-6 bg-neon-green/5 border-2 border-neon-green/40 rounded-3xl relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-sm font-black uppercase text-white tracking-widest">
                  Pí³s-Processamento
                </p>
                <p className="text-[9px] text-neon-green/60 uppercase mt-1 tracking-[0.2em] font-bold">
                  Resoluí§í£o Nativa Ativada
                </p>
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <span className="text-[10px] font-black text-neon-green">
                  ULTRA
                </span>
                <div className="w-14 h-7 bg-black rounded-full p-1 border border-neon-green/30">
                  <div className="w-5 h-5 bg-neon-green rounded-full shadow-[0_0_15px_rgba(56,242,127,1)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8 bg-black/40 border-t border-white/5">
          <button
            onClick={onClose}
            className="w-full py-4 bg-neon-green text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-xl shadow-[0_5px_20px_rgba(56,242,127,0.2)] hover:shadow-[0_8px_30px_rgba(56,242,127,0.4)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Shield className="w-4 h-4" /> SALVAR ALTERAí‡í•ES
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// â”€â”€â”€ News View Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NewsView({
  articles,
  onClose,
}: {
  articles: NewsArticle[];
  onClose: () => void;
}) {
  return (
    <FullViewWrapper
      title="Crí´nicas de Kronos"
      icon={Newspaper}
      color="border-neon-yellow"
      onClose={onClose}
    >
      <div className="max-w-5xl mx-auto w-full pb-24 px-4 sm:px-0">
        {/* Featured News Header */}
        <div className="mb-12 text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl font-black uppercase italic text-white mb-4 tracking-tighter">
            íšltimas do Reino
          </h2>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
            Fique por dentro das atualizaí§íµes e lendas
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-neon-yellow/30 transition-all duration-500 shadow-2xl relative"
            >
              {/* Article Image Container */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-black/60 border border-white/10 backdrop-blur-md 
                                        ${
                                          article.category === "LORE"
                                            ? "text-neon-green border-neon-green/30"
                                            : article.category === "EVENTO"
                                              ? "text-neon-yellow border-neon-yellow/30"
                                              : "text-purple-400 border-purple-400/30"
                                        }`}
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3 h-3 text-white/20" />
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                    {article.date}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <Timer className="w-3 h-3 text-white/20" />
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                    {article.readTime} leitura
                  </span>
                </div>

                <h3 className="text-xl font-black text-white italic mb-3 group-hover:text-neon-yellow transition-colors leading-tight">
                  {article.title}
                </h3>

                <p className="text-xs text-white/40 leading-relaxed font-bold mb-6 line-clamp-3">
                  {article.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <button className="text-[10px] font-black text-neon-yellow uppercase tracking-widest flex items-center gap-2 group/btn">
                    Ler Crônica
                    <TrendingUp className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                    <Star className="w-3.5 h-3.5 text-white/20" />
                  </button>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-neon-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 py-12 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
            Fim das Crônicas Atuais
          </p>
        </div>
      </div>
    </FullViewWrapper>
  );
}

// â”€â”€â”€ Friends View Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FriendsView({
  friends,
  onClose,
  searchInput,
  setSearchInput,
  isSearching,
  setIsSearching,
  rankingData,
  onAddFriend,
  currentUser,
}: {
  friends: RankingUser[];
  onClose: () => void;
  searchInput: string;
  setSearchInput: (v: string) => void;
  isSearching: boolean;
  setIsSearching: (v: boolean) => void;
  rankingData: RankingUser[];
  onAddFriend: (id: string) => void;
  currentUser: any;
}) {
  // Search in rankingData for users not already friends
  const searchResults = searchInput.trim()
    ? rankingData.filter(
        (u) =>
          u.name.toLowerCase().includes(searchInput.toLowerCase()) &&
          u.uid !== currentUser?.uid &&
          !friends.some((f) => f.uid === u.uid),
      )
    : [];

  return (
    <FullViewWrapper
      title="Central de Alianças"
      icon={Friends}
      color="border-neon-green"
      onClose={onClose}
    >
      <div className="max-w-4xl mx-auto w-full pb-24 px-4 sm:px-0">
        {/* Search Bar */}
        <div className="mb-10 relative group">
          <div className="absolute inset-0 bg-neon-green/5 blur-xl group-focus-within:bg-neon-green/10 transition-all opacity-0 group-focus-within:opacity-100" />
          <div className="relative flex items-center bg-black/40 border border-white/10 rounded-2xl p-1 focus-within:border-neon-green/40 transition-all">
            <div className="pl-4">
              <Plus
                className={`w-5 h-5 transition-all ${searchInput ? "text-neon-green rotate-45" : "text-white/20"}`}
              />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setIsSearching(true)}
              placeholder="Buscar guerreiros pelo nome..."
              className="w-full bg-transparent px-4 py-4 text-sm font-bold text-white outline-none placeholder:text-white/10"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="pr-4 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {searchInput ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-neon-green/30" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-green">
                  Resultados da Busca
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchResults.map((hero) => (
                  <div
                    key={hero.id}
                    className="p-5 bg-white/3 border border-white/10 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-black p-1">
                        <img
                          src={hero.photoURL}
                          alt={hero.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white italic">
                          {hero.name}
                        </h4>
                        <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mt-1">
                          Nível {hero.level} • {(hero.xp / 1000).toFixed(1)}k XP
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddFriend(hero.uid || hero.id)}
                      className="px-4 py-2 bg-neon-green text-black text-[9px] font-black uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(56,242,127,0.3)]"
                    >
                      Adicionar
                    </button>
                  </div>
                ))}
                {searchResults.length === 0 && (
                  <p className="col-span-full py-10 text-center text-white/10 font-black uppercase italic text-xs">
                    Nenhum guerreiro encontrado
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-10"
            >
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Total Amigos",
                    value: friends.length,
                    color: "text-white",
                  },
                  {
                    label: "Sincronizados",
                    value: "98%",
                    color: "text-neon-yellow",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white/[0.02] border border-white/5 rounded-3xl text-center"
                  >
                    <p className="text-[7px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">
                      {stat.label}
                    </p>
                    <p className={`text-xl font-bold italic ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Friends List */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-white/10" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                    Seus Aliados
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {friends.map((friend) => (
                    <motion.div
                      key={friend.id}
                      whileHover={{ y: -5 }}
                      className="p-5 bg-black/40 border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-white/20 transition-all relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_rgba(56,242,127,1)]" />
                      </div>

                      <div className="flex items-center gap-5 relative z-10">
                        <div className="w-14 h-14 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-neon-green/20 to-transparent rounded-2xl blur-md scale-75" />
                          <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black p-1.5 relative z-10">
                            <img
                              src={friend.photoURL}
                              alt={friend.name}
                              className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base font-black text-white italic group-hover:text-neon-green transition-colors">
                            {friend.name}
                          </h4>
                          <div className="flex items-center gap-3 mt-1.5">
                            <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">
                              Nível {friend.level}
                            </p>
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">
                              Aliado Sincronizado
                            </p>
                          </div>
                        </div>
                      </div>

                      <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95">
                        <TrendingUp className="w-4 h-4 text-white/40 group-hover:text-white" />
                      </button>
                    </motion.div>
                  ))}
                  {friends.length === 0 && (
                    <p className="col-span-full py-10 text-center text-white/10 font-black uppercase italic text-xs">
                      Sem aliados no momento
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FullViewWrapper>
  );
}

// â”€â”€â”€ UNIFIED CHARACTER & PET SHOP MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function UnifiedShopModal({
  activeTab,
  onClose,
  playerGold,
  ownedChars,
  ownedPets,
  selectedCharId,
  selectedPetId,
  onBuy,
  onSelect,
}: {
  activeTab: "characters" | "pets";
  onClose: () => void;
  playerGold: number;
  ownedChars: number[];
  ownedPets: number[];
  selectedCharId: number;
  selectedPetId: number;
  onBuy: (type: "characters" | "pets", id: number, price: number) => void;
  onSelect: (type: "characters" | "pets", id: number) => void;
}) {
  const [tab, setTab] = useState<"characters" | "pets">(activeTab);
  const items = tab === "characters" ? SHOP_CHARACTERS : SHOP_PETS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative w-full max-w-4xl bg-black/60 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-10 border-b border-white/5 bg-white/[0.02] gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-yellow/50 to-transparent" />

          <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
            <h2 className="text-2xl sm:text-4xl font-black italic tracking-tighter text-white uppercase leading-none text-center sm:text-left">
              CENTRAL DE <span className="text-neon-yellow">Poder</span>
            </h2>
            <div className="flex items-center gap-2 mt-6 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
              {[
                { id: "characters", label: "Guerreiros" },
                { id: "pets", label: "Companheiros" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${tab === t.id ? "text-black" : "text-white/40 hover:text-white"}`}
                >
                  {tab === t.id && (
                    <motion.div
                      layoutId="activeShopTab"
                      className="absolute inset-0 bg-neon-yellow rounded-xl z-0 shadow-[0_0_20px_rgba(255,242,0,0.4)]"
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 self-center">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
                Seu Saldo
              </span>
              <div className="flex items-center gap-2 text-neon-yellow">
                <span className="text-2xl font-black italic tracking-tighter">
                  {playerGold.toLocaleString()}
                </span>
                <span className="text-xs font-black uppercase">CASH</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white active:scale-90 bg-black/40 backdrop-blur-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="p-6 sm:p-10 max-h-[65vh] overflow-y-auto scrollbar-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

          {items.map((item) => {
            const isOwned = (
              tab === "characters" ? ownedChars : ownedPets
            ).includes(item.id);
            const isSelected =
              (tab === "characters" ? selectedCharId : selectedPetId) ===
              item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className={`bg-black/40 border ${isSelected ? "border-neon-yellow shadow-[0_0_30px_rgba(255,242,0,0.2)]" : "border-white/10"} rounded-[2.5rem] p-6 flex flex-col items-center gap-6 group transition-all hover:bg-white/[0.04] hover:border-white/20 relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-1 transition-opacity pointer-events-none`}
                />

                <div
                  className={`absolute top-4 left-6 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-black tracking-widest uppercase`}
                >
                  <span
                    className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                  >
                    {item.rarity}
                  </span>
                </div>

                <div className="w-full aspect-square relative flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.1, 0.3, 0.1],
                      rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`absolute inset-0 rounded-full border border-dashed border-white/10 scale-95`}
                  />

                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} blur-[40px] scale-50 opacity-10 group-hover:opacity-40 transition-opacity`}
                  />

                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center relative z-10 w-full">
                  <h3
                    className={`text-sm sm:text-base font-black uppercase tracking-tight italic text-white group-hover:scale-105 transition-transform`}
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-1 opacity-40">
                    <div className="h-px w-4 bg-white/20" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">
                      {item.class}
                    </p>
                    <div className="h-px w-4 bg-white/20" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (isSelected) return;
                    if (isOwned) onSelect(tab, item.id);
                    else onBuy(tab, item.id, item.price as number);
                  }}
                  className={`w-full py-4 rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden ${isSelected ? "bg-neon-yellow text-black cursor-default" : isOwned ? "bg-white/10 text-white hover:bg-white/20" : "bg-neon-yellow text-black hover:scale-105 active:scale-95 shadow-[0_5px_20px_rgba(255,242,0,0.3)]"}`}
                >
                  {!isOwned && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  )}
                  {isSelected
                    ? "Selecionado"
                    : isOwned
                      ? "Selecionar"
                      : `${item.price.toLocaleString()} CASH`}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="p-6 border-t border-white/5 bg-white/1 flex justify-center items-center gap-8">
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-yellow" />
            <span className="text-[8px] font-black tracking-widest text-white uppercase">
              Sincronização de Compras
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
