import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { reasons } from "../data/reasons";

const MessageInABottle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const openBottle = () => {
    const random = reasons[Math.floor(Math.random() * reasons.length)];
    setCurrentMessage(random);
    setIsOpen(true);
  };

  return (
    <div className="relative w-full flex justify-center py-12 mt-10 overflow-hidden">
      {/* === Água Realista & Temática === */}
      <div
        className="absolute bottom-0 w-full h-24"
        style={{
          background:
            "linear-gradient(to top, var(--primary) 0%, transparent 100%)",
          opacity: 0.5,
          filter: "blur(8px)",
        }}
      ></div>

      <div
        className="absolute bottom-2 w-3/4 h-8 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--gold) 0%, transparent 70%)",
          opacity: 0.2,
          filter: "blur(15px)",
        }}
      ></div>

      <div className="relative z-10">
        {/* Bolhas Automáticas */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute -top-2 left-1/2 w-2 h-2 rounded-full bg-[var(--accent)]/40 backdrop-blur-sm border border-[var(--gold)]/30 pointer-events-none"
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: -80 - i * 10,
              x: Math.sin(i) * 20,
              scale: [0.5, 1.2],
            }}
            transition={{
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            style={{ marginLeft: `${(i - 3) * 6}px` }}
          />
        ))}

        {/* A Garrafa Flutuando */}
        <motion.button
          onClick={openBottle}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 0.95 }}
          className="text-5xl filter drop-shadow-lg relative z-20 transition-transform cursor-pointer select-none active:scale-90"
          title="Abrir garrafa"
        >
          🍾
        </motion.button>
      </div>

      {/* O Pergaminho da Mensagem (Modal) */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 10 }}
              // MUDANÇA 1: width fixo (w-80 md:w-96) em vez de max-w-xs para garantir largura constante
              className="bg-[#F5F5F0] text-[var(--bg-dark)] p-8 rounded-sm shadow-2xl w-80 md:w-96 relative border-4 border-[var(--primary)] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Selo Dourado */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[var(--gold)] text-5xl drop-shadow-md">
                💮
              </div>

              <h3 className="font-serif text-xl font-bold mb-4 text-center mt-4 text-[var(--primary)]">
                Mensagem do Mar
              </h3>

              {/* MUDANÇA 2: Altura fixa (h-48) e overflow-y-auto. 
                  flex + items-center garante que mensagens curtas fiquem no meio. 
              */}
              <div className="w-full h-48 flex items-center justify-center overflow-y-auto custom-scrollbar">
                <p className="font-serif italic text-lg text-center leading-relaxed px-2">
                  "{currentMessage}"
                </p>
              </div>

              <button
                onClick={openBottle}
                className="mt-6 w-full py-3 bg-[var(--primary)] text-[var(--gold)] text-xs font-bold uppercase tracking-widest hover:bg-[#352261] transition-colors rounded-sm shadow-md cursor-pointer"
              >
                Ler outra
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageInABottle;
