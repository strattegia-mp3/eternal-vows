import { useEffect, useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Timer from "./Timer";
import corgis from "../assets/cute_corgis.gif";

const Hero = () => {
  const START_DATE = "2025-09-03T00:00:00";
  const canvasRef = useRef(null);

  // Ref para controlar o timer de reset (não causa re-render)
  const resetTimerRef = useRef(null);

  // --- Lógica do Canvas (Mantida idêntica, apenas omitida para focar na correção) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: Math.random() > 0.5 ? "#ffd700" : "#ffffff",
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- Lógica do Easter Egg Corrigida ---
  const [tapCount, setTapCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleTitleTap = () => {
    // 1. Limpa o timer anterior imediatamente
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    // 2. Incrementa a contagem
    // Usamos uma variável local para checar a vitória imediatamente sem esperar o state atualizar
    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    // 3. Checa vitória (5 cliques)
    if (nextCount >= 5) {
      setShowSecret(true);
      setTapCount(0); // Reseta
      return;
    }

    // 4. Inicia novo timer: Se parar de clicar por 1s, reseta a contagem
    resetTimerRef.current = setTimeout(() => {
      setTapCount(0);
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Limpeza de segurança ao desmontar
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-40 z-0 pointer-events-none"
      />

      <div className="z-10 p-6 flex flex-col items-center max-w-3xl">
        {/* ÁREA DE TOQUE OTIMIZADA */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          // onTap é mais confiável que onClick para mobile no Framer Motion
          onTap={handleTitleTap}
          whileTap={{ scale: 0.9 }} // Feedback visual imediato ao tocar
          className="mb-6 cursor-pointer select-none touch-manipulation relative p-4 rounded-xl active:bg-white/5 transition-colors"
          style={{ WebkitTapHighlightColor: "transparent" }} // Remove retângulo azul no Android/iOS
        >
          <h2 className="text-[var(--gold)] tracking-[0.2em] text-xs md:text-sm uppercase font-bold mb-2">
            Desde o ano de 2025
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl text-white drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            Nossa Aliança
          </h1>

          {/* Debug visual opcional (remover depois): mostra quantos toques faltam */}
          {/* {tapCount > 0 && <span className="absolute -top-2 right-0 text-xs text-red-500 font-bold">{tapCount}</span>} */}
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-200 italic font-serif mb-8 max-w-md"
        >
          "Onde o Cavalheiro púrpura encontrou sua Dama dourada."
        </motion.p>

        <Timer startDate={START_DATE} />
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 opacity-50"
      >
        <span className="text-[var(--gold)] text-xs tracking-widest uppercase">
          Continuar Jornada
        </span>
      </motion.div>

      <AnimatePresence>
        {showSecret && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 10, scale: 0 }}
              className="bg-white p-6 rounded shadow-2xl transform rotate-2 max-w-xs text-center text-black border-4 border-[var(--gold)]"
              onClick={(e) => e.stopPropagation()} // Evita fechar se clicar dentro do card
            >
              <h2 className="text-lg font-bold mb-2 text-red-600">
                Achievement Unlocked! 🏆
              </h2>
              <p className="text-sm mb-4">Você descobriu a área secreta!</p>

              <img
                src={corgis}
                alt="GIF fofinho"
                className="w-full rounded mb-4 border border-gray-200"
              />

              <p className="font-serif text-xl text-[var(--bg-dark)]">
                "Eu te amo muito, minha querida donzela!"
              </p>

              <button
                onClick={() => setShowSecret(false)}
                className="text-xs text-gray-500 mt-4 px-4 py-2 rounded-xs outline-1 font-bold uppercase tracking-widest hover:bg-gray-200 transition cursor-pointer"
              >
                Fechar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
