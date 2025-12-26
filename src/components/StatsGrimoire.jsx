import { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStatsData } from "../data/stats";
import { HelpCircle } from "lucide-react";

// --- VARIANTES DE ANIMAÇÃO ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 },
  },
};

// --- CARD COM TOOLTIP (OTIMIZADO PARA MOBILE) ---
const StatCard = memo(({ icon, label, value, suffix, desc, basis }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      // O Card em si
      className="bg-[#1a0b2e]/60 border border-[var(--gold)]/20 p-4 md:p-5 rounded-lg hover:bg-[#1a0b2e]/90 transition-colors group relative overflow-visible flex flex-col"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg" />

      {/* --- BOTÃO DE AJUDA (ABSOLUTO) --- 
          No mobile ele fica fixo no canto, não atrapalhando a centralização do resto.
      */}
      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(!showTooltip);
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="text-[var(--gold)] opacity-40 hover:opacity-100 transition p-1"
        >
          <HelpCircle size={14} />
        </button>

        {/* TOOLTIP */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-6 right-0 w-40 md:w-48 bg-black/95 border border-[var(--gold)] p-3 rounded shadow-2xl text-left pointer-events-none z-50"
            >
              <p className="text-sm text-gray-300 font-serif leading-relaxed">
                <span className="text-[var(--gold)] font-bold block mb-1">
                  Cálculo:
                </span>
                {basis}
              </p>
              {/* Seta do tooltip */}
              <div className="absolute -top-1 right-2 w-2 h-2 bg-black border-t border-l border-[var(--gold)] transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- 
          Mobile: items-center (centralizado), text-center
          Desktop: items-start (esquerda), text-left
      */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
        {/* HEADER: Ícone + Label */}
        <div className="flex flex-col md:flex-row items-center gap-2 mb-2 md:mb-1 text-[var(--gold)] opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="shrink-0 p-1 md:p-0">{icon}</div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider leading-tight">
            {label}
          </span>
        </div>

        {/* VALORES */}
        <div className="text-xl md:text-3xl text-white font-bold mb-1 tracking-tight tabular-nums break-all">
          {value}
        </div>

        <div className="text-xs text-[var(--gold)] opacity-60 mb-3 lowercase">
          {suffix}
        </div>

        {/* DESCRIÇÃO */}
        <p className="text-xs md:text-sm text-gray-400 font-serif italic border-t border-[var(--gold)]/10 pt-2 leading-tight w-full">
          "{desc}"
        </p>
      </div>
    </motion.div>
  );
});

const StatsGrimoire = ({ startDate }) => {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const calc = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      setDiff(now - start);
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, [startDate]);

  const stats = useMemo(() => getStatsData(diff), [diff]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl text-[var(--gold)] font-serif italic mb-2">
          Grimório de Estatísticas
        </h2>
        <div className="h-px w-24 bg-[var(--gold)] mx-auto opacity-50"></div>
        <p className="text-xs mt-4 opacity-70 pixel-font">
          DATA LOG: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "50px" }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" // Gap ajustado levemente para mobile
      >
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </motion.div>
    </div>
  );
};

export default StatsGrimoire;
