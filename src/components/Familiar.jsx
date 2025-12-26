import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { phrases } from "../data/phares";

const Familiar = () => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);
  const historyRef = useRef([]);

  const poke = () => {
    // 1. Limpa timer anterior
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 2. LÓGICA DE NÃO-REPETIÇÃO (BUFFER DE 5)
    // Filtra as frases disponíveis removendo as que estão no histórico recente
    const availablePhrases = phrases.filter(
      (p) => !historyRef.current.includes(p)
    );

    // Seleciona uma frase aleatória das disponíveis
    const pool = availablePhrases.length > 0 ? availablePhrases : phrases;
    const nextPhrase = pool[Math.floor(Math.random() * pool.length)];

    // 3. Atualiza o histórico
    const newHistory = [...historyRef.current, nextPhrase];
    const limit = Math.max(1, phrases.length - 5);
    if (newHistory.length > limit) {
      newHistory.shift();
    }
    historyRef.current = newHistory;

    // 4. Define a mensagem e mostra
    setMessage(nextPhrase);
    setIsVisible(true);

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      timerRef.current = null;
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white text-[var(--bg-dark)] p-3 rounded-lg rounded-br-none shadow-xl mb-2 mr-2 max-w-[150px] text-xs font-bold text-center border-2 border-[var(--gold)] flex items-center justify-center min-h-[40px]"
          >
            <motion.span
              key={message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {message}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={poke}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.8 }}
        className="text-6xl filter drop-shadow-lg cursor-pointer bg-transparent border-none focus:outline-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        🐶
      </motion.button>
    </div>
  );
};

export default Familiar;
