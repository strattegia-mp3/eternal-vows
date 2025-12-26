import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dices, Sparkles } from "lucide-react";
import { diceOutcomes } from "../data/diceOutcomes";

const DestinyDice = () => {
  const [result, setResult] = useState(20);
  const [isRolling, setIsRolling] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [diceColor, setDiceColor] = useState("var(--primary)"); // Cor padrão (Roxo)

  // Função para definir a cor baseada no tipo de resultado
  const getOutcomeStyle = (type) => {
    switch (type) {
      case "critical_fail":
        return { color: "#ef4444", shadow: "rgba(239, 68, 68, 0.6)" }; // Vermelho
      case "critical_success":
        return { color: "#FFD700", shadow: "rgba(255, 215, 0, 0.8)" }; // Dourado
      case "bad":
        return { color: "#f97316", shadow: "rgba(249, 115, 22, 0.5)" }; // Laranja
      case "great":
        return { color: "#a855f7", shadow: "rgba(168, 85, 247, 0.5)" }; // Roxo Claro
      default:
        return { color: "var(--primary)", shadow: "rgba(67, 44, 122, 0.5)" }; // Roxo Padrão
    }
  };

  const roll = () => {
    if (isRolling) return;
    setIsRolling(true);
    setOutcome(null);
    setDiceColor("var(--primary)"); // Reseta cor enquanto rola

    // Efeito sonoro (opcional, mental) de dados rolando...

    // 1. Animação de números aleatórios ("Shuffle")
    const shuffleInterval = setInterval(() => {
      setResult(Math.ceil(Math.random() * 20));
    }, 100);

    // 2. Parar o dado após 1.5s
    setTimeout(() => {
      clearInterval(shuffleInterval);

      const finalRoll = Math.ceil(Math.random() * 20); // Número real final
      const finalOutcome = diceOutcomes[finalRoll];

      setResult(finalRoll);
      setOutcome(finalOutcome);

      // Atualiza a cor do dado baseado no resultado final
      const style = getOutcomeStyle(finalOutcome.type);
      setDiceColor(style.color);

      setIsRolling(false);
    }, 1500);
  };

  // Variantes de animação do Dado
  const diceVariants = {
    idle: { rotate: 0, scale: 1 },
    rolling: {
      rotate: 1080,
      scale: [1, 0.8, 1.1, 1],
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    criticalSuccess: {
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.5 },
    },
    criticalFail: {
      x: [-5, 5, -5, 5, 0], // Tremedeira
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="py-16 px-4 flex flex-col items-center max-w-2xl mx-auto w-full">
      {/* Cabeçalho */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl text-[var(--gold)] font-serif italic mb-2 flex items-center justify-center gap-2 drop-shadow-md">
          <Dices className="animate-bounce" /> Oráculo do Destino
        </h2>
        <div className="h-[2px] w-24 bg-[var(--gold)] mx-auto opacity-50"></div>
        <p className="text-xs mt-3 opacity-70 font-mono tracking-widest uppercase">
          Role o D20 para decidir nossa próxima aventura
        </p>
      </div>

      {/* Área do Dado */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        {/* Glow de Fundo (Muda de cor) */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl opacity-40 transition-colors duration-500"
          style={{ backgroundColor: diceColor }}
        />

        <motion.div
          onClick={roll}
          variants={diceVariants}
          animate={
            isRolling
              ? "rolling"
              : outcome?.type === "critical_success"
              ? "criticalSuccess"
              : outcome?.type === "critical_fail"
              ? "criticalFail"
              : "idle"
          }
          className="cursor-pointer relative w-40 h-40 flex items-center justify-center z-10 hover:scale-105 transition-transform"
          whileTap={{ scale: 0.95 }}
        >
          {/* SVG D20 Customizável */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transition-colors duration-500"
            style={{
              fill: diceColor,
              stroke: "var(--gold)",
              strokeWidth: "2px",
              filter: `drop-shadow(0 0 10px ${
                getOutcomeStyle(outcome?.type || "neutral").shadow
              })`,
            }}
          >
            <polygon points="50 5, 95 27, 95 73, 50 95, 5 73, 5 27" />
            <line
              x1="50"
              y1="5"
              x2="50"
              y2="50"
              className="stroke-[var(--gold)] opacity-50"
            />
            <line
              x1="50"
              y1="50"
              x2="5"
              y2="73"
              className="stroke-[var(--gold)] opacity-50"
            />
            <line
              x1="50"
              y1="50"
              x2="95"
              y2="73"
              className="stroke-[var(--gold)] opacity-50"
            />
          </svg>

          {/* O Número */}
          <span
            className={`absolute text-5xl font-bold text-white font-mono select-none ${
              isRolling ? "blur-[2px]" : ""
            }`}
            style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}
          >
            {result}
          </span>
        </motion.div>
      </div>

      {/* Caixa de Texto do Resultado */}
      <div className="min-h-[120px] w-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {!isRolling && outcome ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center bg-[#1a0b2e]/80 border border-[var(--gold)]/30 p-6 rounded-lg shadow-xl backdrop-blur-sm max-w-sm relative overflow-hidden"
            >
              {/* Faixa decorativa para críticos */}
              {outcome.type === "critical_success" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent animate-pulse"></div>
              )}
              {outcome.type === "critical_fail" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              )}

              <h3
                className={`text-xl font-bold mb-2 font-serif ${
                  outcome.type === "critical_fail"
                    ? "text-red-400"
                    : outcome.type === "critical_success"
                    ? "text-[var(--gold)]"
                    : "text-white"
                }`}
              >
                {outcome.type === "critical_success" && (
                  <Sparkles className="inline w-5 h-5 mr-1" />
                )}
                {result === 1
                  ? "FALHA CRÍTICA"
                  : result === 20
                  ? "SUCESSO CRÍTICO"
                  : `Resultado: ${result}`}
                {outcome.type === "critical_success" && (
                  <Sparkles className="inline w-5 h-5 ml-1" />
                )}
              </h3>

              <p className="text-sm md:text-base text-gray-300 font-serif leading-relaxed">
                "{outcome.text}"
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="text-sm text-[var(--gold)] font-mono text-center animate-pulse"
            >
              {isRolling ? "Invocando a sorte..." : "Toque no D20 para rolar"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DestinyDice;
