import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useSecurity } from "../context/SecurityContext";
import { Lock } from "lucide-react";
import confetti from "canvas-confetti"; // Importação do confete

const Gatekeeper = ({ children, onUnlock }) => {
  const [password, setPassword] = useState("");
  const { isUnlocked, attemptUnlock, error } = useSecurity();
  const [isOpening, setIsOpening] = useState(false);

  // Função para disparar a celebração real
  const triggerRoyalConfetti = () => {
    const duration = 1500;
    const end = Date.now() + duration;

    // Dispara fogos de artifício de ouro e vermelho nas laterais
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#FFD700", "#B8860B", "#DC143C"], // Ouro e Carmesim
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#FFD700", "#B8860B", "#DC143C"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleLogin = () => {
    const success = attemptUnlock(password);

    if (success) {
      triggerRoyalConfetti(); // Dispara a festa antes da porta abrir

      // Pequeno delay para garantir que o confete explodiu antes de mover pixels pesados
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setIsOpening(true);
        if (onUnlock) onUnlock();
      }, 200);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* OTIMIZAÇÃO: Use 'will-change-opacity' para evitar repaints.
          Adicionamos um delay na opacidade para o conteúdo só aparecer
          quando as portas já estiverem abrindo, economizando GPU.
      */}
      <div
        className={`transition-opacity duration-1000 delay-300 will-change-opacity ${
          isUnlocked ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>

      <AnimatePresence>
        {!isUnlocked && (
          <div className="fixed inset-0 z-[60] flex pointer-events-none">
            {/* --- PORTA ESQUERDA --- */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 2.5, // Mais lento para dar sensação de peso
                ease: [0.22, 1, 0.36, 1], // Custom Bezier (Heavy Door feel)
              }}
              // OTIMIZAÇÃO: 'will-change-transform' é crucial aqui para não travar
              className="w-1/2 h-full bg-[#1a0b2e] border-r-4 border-[var(--gold)] relative flex items-center justify-end pointer-events-auto shadow-2xl will-change-transform z-20"
            >
              {/* Textura Otimizada (CSS puro em vez de imagem externa pesada se possível, mas mantendo a sua) */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

              {/* Detalhes Decorativos */}
              <div className="w-full h-2 bg-[var(--gold)]/20 absolute top-1/4"></div>
              <div className="w-full h-2 bg-[var(--gold)]/20 absolute bottom-1/4"></div>

              {/* Brasão/Detalhe Extra (Opcional) */}
              <div className="absolute left-4 top-4 text-[var(--gold)]/10 text-9xl font-serif font-bold select-none pointer-events-none">
                V
              </div>

              {/* Maçaneta Esquerda */}
              <div className="mr-2 w-4 h-24 bg-gradient-to-b from-[#b8860b] to-[#805ad5] rounded-l-lg shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
            </motion.div>

            {/* --- PORTA DIREITA --- */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 2.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-1/2 h-full bg-[#1a0b2e] border-l-4 border-[var(--gold)] relative flex items-center justify-start pointer-events-auto shadow-2xl will-change-transform z-20"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
              <div className="w-full h-2 bg-[var(--gold)]/20 absolute top-1/4"></div>
              <div className="w-full h-2 bg-[var(--gold)]/20 absolute bottom-1/4"></div>

              {/* Brasão/Detalhe Extra (Opcional) */}
              <div className="absolute right-4 bottom-4 text-[var(--gold)]/10 text-9xl font-serif font-bold select-none pointer-events-none">
                H
              </div>

              {/* Maçaneta Direita */}
              <div className="ml-2 w-4 h-24 bg-gradient-to-b from-[#b8860b] to-[#805ad5] rounded-r-lg shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
            </motion.div>

            {/* --- ÁREA DE LOGIN --- */}
            <motion.div
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto z-50 p-4"
            >
              <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl border-2 border-[var(--gold)] text-center max-w-sm w-full shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex justify-center mb-6"
                >
                  <div className="bg-[var(--gold)] p-4 rounded-full text-[#1a0b2e] shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                    <Lock size={32} />
                  </div>
                </motion.div>

                <h1 className="font-serif text-4xl text-[var(--gold)] mb-2 drop-shadow-md">
                  Domínios Reais
                </h1>
                <p className="text-gray-300 text-base mb-6 font-serif italic leading-relaxed">
                  "O domínio real a seguir está restringido. Insira a chave de
                  nossa aliança para revelar a surpresa que a aguarda além deste
                  portal! ✨"
                </p>

                <div className="flex flex-col gap-4">
                  <motion.input
                    type="password"
                    inputMode="numeric"
                    placeholder="••••"
                    maxLength={4}
                    // Removemos estilos pesados de transição no input
                    className={`bg-white/5 border-2 rounded p-3 text-center text-2xl text-[var(--gold)] outline-none focus:bg-white/10 placeholder-white/10 tracking-[0.5em] font-serif ${
                      error
                        ? "border-red-500"
                        : "border-[var(--gold)]/50 focus:border-[var(--gold)]"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                  />

                  <button
                    onClick={handleLogin}
                    className="bg-[var(--gold)] text-[#1a0b2e] font-bold py-3 px-6 rounded hover:bg-[#ffe066] active:scale-95 transition-transform pixel-font text-xs uppercase tracking-widest shadow-lg"
                  >
                    Abrir Portões
                  </button>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-[10px] font-mono mt-2"
                    >
                      ⛔ Acesso negado pela guarda real.
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gatekeeper;
