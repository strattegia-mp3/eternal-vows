import { useMemo } from "react"; // Importando useMemo para performance
import { motion } from "framer-motion";
import {
  CheckSquare,
  Square,
  BookOpen,
  Utensils,
  Gamepad2,
  Trees,
  Heart,
  Briefcase,
  GraduationCap,
  Map,
  Scroll,
  Music,
} from "lucide-react";
import { quests } from "../data/quests";

const QuestLog = () => {
  // --- CÁLCULOS DE XP ---
  const { currentXP, totalXP, progress } = useMemo(() => {
    const total = quests.reduce((acc, quest) => acc + quest.xp, 0);
    const current = quests.reduce(
      (acc, quest) => (quest.completed ? acc + quest.xp : acc),
      0
    );
    const prog = Math.round((current / total) * 100);
    return { currentXP: current, totalXP: total, progress: prog };
  }, []); // Array de dependências vazio pois 'quests' é estático

  const getIcon = (type) => {
    switch (type) {
      case "intellect":
        return <BookOpen size={18} />;
      case "cooking":
        return <Utensils size={18} />;
      case "game":
        return <Gamepad2 size={18} />;
      case "nature":
        return <Trees size={18} />;
      case "romance":
        return <Heart size={18} />;
      case "career":
        return <Briefcase size={18} />;
      case "travel":
        return <Map size={18} />;
      case "art":
        return <Music size={18} />;
      case "life":
        return <Scroll size={18} />;
      default:
        return <GraduationCap size={18} />;
    }
  };

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto relative z-10">
      {/* O Quadro de Missões (Background Geral) */}
      <div className="bg-[#f0e6d2] text-[#3e2723] p-6 md:p-10 rounded-sm shadow-2xl border-[6px] border-[#5d4037] relative">
        {/* Pregos Decorativos */}
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#3e2723] shadow-sm"></div>
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#3e2723] shadow-sm"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#3e2723] shadow-sm"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#3e2723] shadow-sm"></div>

        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-[#3e2723] drop-shadow-sm">
            <span>📜</span> Mural de Missões
          </h2>
          <p className="font-mono text-xs md:text-sm mt-2 opacity-70 uppercase tracking-widest">
            Campanha: "A Vida Adulta & O Amor"
          </p>
        </div>

        {/* GRID DE MISSÕES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
          {quests.map((quest) => (
            <motion.div
              key={quest.id}
              whileHover={{ scale: 1.02, rotate: -1 }}
              className={`
                relative p-4 rounded border-2 transition-all duration-300 group
                ${
                  quest.completed
                    ? "bg-[#d7ccc8]/50 border-[#8d6e63] opacity-70"
                    : "bg-[#fffbf0] border-[#d7ccc8] shadow-md hover:shadow-lg hover:border-[#b8860b]"
                }
                ${quest.legendary ? "border-[#b8860b] bg-yellow-50/80" : ""}
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 ${
                    quest.completed ? "text-green-700" : "text-[#b8860b]"
                  }`}
                >
                  {quest.completed ? (
                    <CheckSquare size={20} />
                  ) : (
                    <Square size={20} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`font-serif font-bold text-base md:text-lg leading-tight mb-1
                      ${
                        quest.completed
                          ? "line-through decoration-2 decoration-[#8d6e63]"
                          : "text-[#3e2723]"
                      }
                      ${quest.legendary ? "text-[#b8860b]" : ""}
                    `}
                    >
                      {quest.text}
                    </h3>
                    <div className="text-[#8d6e63] opacity-60 ml-2">
                      {getIcon(quest.type)}
                    </div>
                  </div>

                  <p className="font-serif italic text-xs md:text-sm text-gray-600 mb-3">
                    {quest.desc}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#3e2723]/10 pt-2">
                    <span className="font-mono text-[10px] font-bold text-[#5d4037] bg-[#3e2723]/5 px-2 py-0.5 rounded">
                      XP: {quest.xp.toLocaleString("pt-BR")}
                    </span>
                    {quest.legendary && (
                      <span className="text-[10px] font-bold text-[#b8860b] animate-pulse flex items-center gap-1">
                        ✨ LEGENDARY
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- ÁREA DE STATUS (XP TOTAL) --- */}
        <div className="border-t-2 border-[#5d4037]/20 pt-6 mt-6">
          {/* Infos do XP */}
          <div className="flex justify-between items-end mb-2 font-mono text-xs md:text-base">
            <span className="font-bold text-[#3e2723] uppercase tracking-wider">
              Progresso do Nível
            </span>
            <span className="font-bold text-[#b8860b]">
              {currentXP.toLocaleString("pt-BR")}{" "}
              <span className="text-[#5d4037] mx-1">/</span>{" "}
              {totalXP.toLocaleString("pt-BR")} XP
            </span>
          </div>

          {/* Barra de Progresso */}
          <div className="w-full h-5 bg-[#3e2723]/10 rounded-full overflow-hidden border border-[#3e2723]/20 relative">
            {/* Fundo da barra */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#8d6e63] to-[#b8860b] relative"
            >
              {/* Brilho da barra */}
              <div className="absolute top-0 right-0 h-full w-2 bg-white/30 blur-[2px]"></div>
            </motion.div>

            {/* Texto de porcentagem dentro da barra (opcional, para ficar chique) */}
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#3e2723] z-10">
              {progress}% COMPLETADO
            </div>
          </div>
        </div>

        {/* Rodapé do Papel (Mensagem) - Margem ajustada */}
        <div className="mt-8 text-center opacity-60 font-serif italic text-sm md:text-base">
          "Mais importante que completar missões é aproveitar a jornada juntos!"
        </div>
      </div>
    </div>
  );
};

export default QuestLog;
