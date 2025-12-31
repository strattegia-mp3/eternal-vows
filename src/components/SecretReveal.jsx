import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brush, Sparkles } from "lucide-react"; // Ícone de Pincel para remeter à pintura

const SecretReveal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const origin = params.get("origem");

    if (origin === "pintura") {
      setShow(true);

      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const handleClose = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 text-center p-6"
          onClick={handleClose}
        >
          {/* Círculo Mágico de Fundo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] border border-[var(--gold)]/20 rounded-full border-dashed"
          />

          <motion.div
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative z-10"
          >
            <div className="w-20 h-20 bg-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.6)] text-[#1a0b2e]">
              <Brush size={40} />
            </div>

            <h1 className="font-serif text-3xl md:text-5xl text-[var(--gold)] mb-4 drop-shadow-lg">
              Segredo Revelado
            </h1>

            <p className="font-serif text-gray-300 text-lg md:text-xl max-w-md mx-auto italic">
              "Você olhou além da tela e encontrou o que estava escondido."
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-12"
            >
              <p className="text-xs text-[var(--gold)] uppercase tracking-[0.3em] animate-pulse">
                Toque para entrar
              </p>
            </motion.div>
          </motion.div>

          {/* Partículas caindo (simples) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: -100,
                  x: Math.random() * window.innerWidth,
                  opacity: 0,
                }}
                animate={{ y: window.innerHeight, opacity: [0, 1, 0] }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="absolute text-[var(--gold)]"
              >
                <Sparkles size={Math.random() * 10 + 5} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretReveal;
