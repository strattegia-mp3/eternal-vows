import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { skills } from "../data/skills";

const SkillTree = () => {
  return (
    <div className="py-12 px-2 md:px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Cabeçalho */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-4xl text-[var(--gold)] font-serif italic mb-2 drop-shadow-md">
          Árvore de Talentos
        </h2>
        <div className="h-px w-24 bg-[var(--gold)] mx-auto opacity-50"></div>
        <p className="text-xs mt-3 opacity-70 font-mono tracking-[0.2em] uppercase">
          Questline Principal: "A Vida Juntos"
        </p>
      </div>

      <div className="relative">
        {/* TRONCO DA ÁRVORE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-[var(--gold)] via-purple-500 to-transparent opacity-30 rounded-full"></div>

        <div className="space-y-8 md:space-y-12 pb-20">
          {skills.map((skill, index) => {
            const isLeft = index % 2 === 0;

            // --- LÓGICA DE ESTILOS POR STATUS ---
            let statusColors = {};
            switch (skill.status) {
              case "current":
                statusColors = {
                  cardBg:
                    "bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
                  title: "text-purple-300",
                  badge: "text-purple-400 border-purple-500/50 animate-pulse",
                  desc: "text-purple-200/80",
                  line: "bg-purple-500",
                  node: "border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]",
                  scale: "scale-110",
                  isLocked: false,
                };
                break;
              case "locked":
                statusColors = {
                  cardBg: "bg-black/20 border-white/5 opacity-60 grayscale",
                  title: "text-gray-500",
                  badge: "text-gray-600 border-gray-700",
                  desc: "text-gray-600",
                  line: "bg-gray-800",
                  node: "border-gray-800 text-gray-700 shadow-none",
                  scale: "scale-100",
                  isLocked: true,
                };
                break;
              default: // unlocked
                statusColors = {
                  cardBg:
                    "bg-[var(--gold)]/5 border-[var(--gold)]/40 hover:bg-[var(--gold)]/10 shadow-[0_0_15px_rgba(0,0,0,0.2)]",
                  title: "text-white",
                  badge: "text-[var(--gold)] border-[var(--gold)]/30",
                  desc: "text-gray-300",
                  line: "bg-[var(--gold)]",
                  node: "border-[var(--gold)] text-[var(--gold)] shadow-[0_0_20px_var(--gold)]",
                  scale: "scale-110",
                  isLocked: false,
                };
                break;
            }

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                className={`relative flex items-center w-full ${
                  isLeft
                    ? "justify-start flex-row"
                    : "justify-end flex-row-reverse"
                }`}
              >
                {/* 1. O CARD DE CONTEÚDO */}
                {/* AJUSTE MOBILE:
                   - w-[44%]: Quase metade da tela para aproveitar espaço.
                   - text-center: No mobile, tudo centralizado.
                   - md:text-right/left: No PC, volta ao alinhamento original.
                */}
                <div
                  className={`w-[44%] md:w-[42%] flex flex-col ${
                    isLeft
                      ? "items-center md:items-end"
                      : "items-center md:items-start"
                  }`}
                >
                  <div
                    className={`p-3 md:p-5 rounded-lg border backdrop-blur-md transition-all duration-500 relative w-full flex flex-col 
                    ${statusColors.cardBg}
                    text-center ${isLeft ? "md:text-right" : "md:text-left"} 
                    `}
                  >
                    {/* Título */}
                    <h3
                      className={`font-serif font-bold text-sm md:text-lg leading-tight mb-2 ${statusColors.title}`}
                    >
                      {skill.title}
                    </h3>

                    {/* Data (Badge) - Centralizada no mobile, alinhada no PC */}
                    <div
                      className={`flex ${
                        isLeft
                          ? "justify-center md:justify-end"
                          : "justify-center md:justify-start"
                      } mb-2`}
                    >
                      <span
                        className={`inline-block text-[8px] md:text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5 rounded-full ${statusColors.badge}`}
                      >
                        {skill.date}
                      </span>
                    </div>

                    {/* Descrição */}
                    <p
                      className={`text-xs md:text-sm font-serif italic leading-relaxed ${statusColors.desc}`}
                    >
                      {skill.desc}
                    </p>
                  </div>
                </div>

                {/* 2. O CONECTOR (Galho) - Ajustado para ser menor no mobile */}
                <div
                  className={`w-[6%] md:w-[8%] h-[2px] ${statusColors.line} opacity-50 relative top-0 flex items-center`}
                >
                  {/* Bolinha na ponta (Só aparece no PC para não poluir o mobile) */}
                  <div
                    className={`hidden md:block absolute ${
                      isLeft ? "right-0" : "left-0"
                    } -top-[3px] w-2 h-2 rounded-full ${statusColors.line}`}
                  ></div>
                </div>

                {/* 3. O NÓ CENTRAL (Ícone) */}
                <div className="relative z-10 flex-shrink-0 mx-[-1px]">
                  <div
                    className={`w-9 h-9 md:w-14 md:h-14 rounded-full border-2 md:border-4 flex items-center justify-center transition-all duration-500 bg-[#1a0b2e] ${statusColors.node} ${statusColors.scale}`}
                  >
                    {statusColors.isLocked ? (
                      <Lock size={14} className="md:w-5 md:h-5" />
                    ) : skill.status === "current" ? (
                      <div className="relative flex items-center justify-center">
                        {/* Ping menor no mobile */}
                        <div className="absolute inset-0 animate-ping opacity-20 rounded-full bg-purple-500"></div>
                        {/* Clone do ícone com tamanho ajustado */}
                        <div className="scale-75 md:scale-100">
                          {skill.icon}
                        </div>
                      </div>
                    ) : (
                      <div className="scale-75 md:scale-100">{skill.icon}</div>
                    )}
                  </div>
                </div>

                {/* Espaçador Fantasma (Mantém o equilíbrio) */}
                <div className="w-[44%] md:w-[42%]"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center pb-12 relative z-10">
          <div className="inline-block px-4 py-2 bg-black/40 backdrop-blur-md border border-[var(--gold)]/30 rounded-full text-[9px] md:text-[10px] text-[var(--gold)] tracking-widest animate-pulse">
            LOADING NEXT LEVEL...
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;
