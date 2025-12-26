import { useMemo } from "react";
import { motion } from "framer-motion";
import { Moon, Star } from "lucide-react";

const LunarAlignment = ({ dateString }) => {
  // Correção de Data Segura:
  // Garante que a data seja interpretada como meio-dia (12:00) do dia especificado.
  // Isso evita que o fuso horário (UTC-3) jogue a data para o dia anterior.
  const safeDate = useMemo(() => {
    // Se a string for apenas "2025-09-03", adicionamos "T12:00:00"
    // Se já tiver horário, respeita o original.
    const safeString = dateString.includes("T")
      ? dateString
      : `${dateString}T12:00:00`;

    return new Date(safeString);
  }, [dateString]);

  // Algoritmo simples para calcular a fase da lua (0 a 29.5)
  const getMoonPhase = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 3) {
      year--;
      month += 12;
    }

    ++month;
    let c = 365.25 * year;
    let e = 30.6 * month;
    let jd = c + e + day - 694039.09; // Julian Date
    jd /= 29.5305882; // Ciclo lunar
    let b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);

    if (b >= 8) b = 0;

    // 0=New, 4=Full, etc.
    return {
      index: b,
      name: [
        "Lua Nova",
        "Lua Crescente",
        "Quarto Crescente",
        "Gibosa Crescente",
        "Lua Cheia",
        "Gibosa Minguante",
        "Quarto Minguante",
        "Lua Minguante",
      ][b],
    };
  };

  const phase = useMemo(() => {
    return getMoonPhase(safeDate);
  }, [safeDate]);

  // Renderiza a Lua Visualmente com CSS
  const MoonVisual = ({ phaseIndex }) => {
    // Definindo a máscara da sombra para cada fase
    // Isso cria um efeito visual mais próximo da realidade
    const getPhaseStyle = (idx) => {
      // Lua Nova
      if (idx === 0) return { opacity: 0.2 };
      // Lua Cheia
      if (idx === 4) return { opacity: 1 };
      // Crescente/Minguante... (Simplificado para brilho)
      return { opacity: 0.6 };
    };

    return (
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-gray-900 shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden border border-[var(--gold)]/30">
        {/* Simulação da Lua Cheia de fundo */}
        <div className="absolute inset-0 bg-[#ffd700] opacity-20 rounded-full"></div>

        {/* O Brilho real da lua */}
        <div
          className="flex items-center justify-center h-full text-[var(--gold)] transition-opacity duration-1000"
          style={getPhaseStyle(phaseIndex)}
        >
          <Moon
            size={48}
            fill="currentColor"
            className="drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
          />
        </div>

        {/* Estrelas de fundo */}
        <div className="absolute top-2 left-4 opacity-50 text-white">
          <Star size={8} />
        </div>
        <div className="absolute bottom-4 right-6 opacity-30 text-white">
          <Star size={6} />
        </div>
      </div>
    );
  };

  return (
    <div className="py-12 px-4 text-center">
      <h2 className="text-3xl md:text-4xl text-[var(--gold)] font-serif mb-8">
        Alinhamento Lunar
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="bg-[#1a0b2e]/60 border border-[var(--gold)]/30 p-10 rounded-md max-w-xs mx-auto backdrop-blur-md relative"
      >
        <MoonVisual phaseIndex={phase.index} />

        <h3 className="text-xl font-bold text-white">
          {phase.name}
        </h3>

        {/* Usamos safeDate aqui para garantir que mostre o dia certo */}
        <p className="text-xs text-[var(--gold)] uppercase tracking-widest mt-1">
          {safeDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="text-lg text-gray-300 italic mt-4 font-serif">
          "Sob esta lua, nossos destinos foram entrelaçados para sempre."
        </p>
      </motion.div>
    </div>
  );
};

export default LunarAlignment;
