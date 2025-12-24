import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [showFireworks, setShowFireworks] = useState(false);

  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      // Posição final aleatória (X e Y)
      x: (Math.random() - 0.5) * window.innerWidth, // Espalha horizontalmente
      y: -(Math.random() * window.innerHeight * 0.8) - 100, // Sobe entre 100px e 80% da tela
      rotation: Math.random() * 520, // Rotação aleatória
      scale: Math.random() * 1.2 + 0.8, // Tamanho entre 0.8x e 2x
      duration: Math.random() * 1.5 + 1.5, // Duração variável
    }));
  }, []);

  const triggerEasterEgg = () => {
    if (showFireworks) return;
    setShowFireworks(true);
    setTimeout(() => {
      setShowFireworks(false);
    }, 3500);
  };

  return (
    <>
      <footer className="text-center text-xl opacity-70 mt-16 font-serif mb-8 relative z-30">
        Feito com{" "}
        <motion.span
          onClick={triggerEasterEgg}
          whileHover={{ scale: 1.2, color: "#ef4444" }}
          whileTap={{ scale: 0.9 }}
          className="text-red-500 inline-block cursor-pointer select-none relative p-1"
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="inline-block"
          >
            ❤
          </motion.span>
        </motion.span>{" "}
        pelo seu cavalheiro.
      </footer>

      <AnimatePresence>
        {showFireworks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Renderização das Partículas Otimizadas */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute text-red-500 drop-shadow-md will-change-transform"
                style={{ fontSize: "2.5rem" }}
                initial={{
                  opacity: 1,
                  x: 0,
                  y: window.innerHeight / 2 + 50,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 0,
                  x: p.x,
                  y: p.y,
                  rotate: p.rotation,
                  scale: p.scale,
                }}
                transition={{
                  duration: p.duration,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                ❤
              </motion.div>
            ))}

            {/* Modal Central */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="relative z-10 bg-[var(--bg-dark)] border-2 border-[var(--gold)] p-6 md:p-8 rounded-lg text-center shadow-2xl"
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[var(--gold)] mb-3 drop-shadow-lg">
                Todo o meu reino é seu.
              </h2>
              <p className="font-serif text-white/90 italic text-lg md:text-xl">
                Eu te amo, minha princesa!
              </p>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl filter drop-shadow-lg">
                👑
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
