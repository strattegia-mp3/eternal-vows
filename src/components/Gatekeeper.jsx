import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useSecurity } from "../context/SecurityContext";
import { Lock } from "lucide-react";

const Gatekeeper = ({ children, onUnlock }) => {
  const [password, setPassword] = useState("");
  const { isUnlocked, attemptUnlock, error } = useSecurity();
  const [isOpening, setIsOpening] = useState(false);

  const handleLogin = () => {
    const success = attemptUnlock(password);

    if (success) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setIsOpening(true);
      if (onUnlock) onUnlock();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className={`transition-opacity duration-1000 ${
          isUnlocked ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
      <AnimatePresence>
        {!isUnlocked && (
          <div className="fixed inset-0 z-[60] flex pointer-events-none">
            {" "}
            {/* PORTA ESQUERDA */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="w-1/2 h-full bg-[#1a0b2e] border-r-4 border-[var(--gold)] relative flex items-center justify-end pointer-events-auto shadow-2xl"
            >
              {/* Textura/Detalhes da porta */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
              <div className="w-full h-2 bg-[var(--gold)]/20 absolute top-1/4"></div>
              <div className="w-full h-2 bg-[var(--gold)]/20 absolute bottom-1/4"></div>
              {/* Maçaneta Esquerda */}
              <div className="mr-2 w-4 h-16 bg-[var(--gold)] rounded-l-lg shadow-lg"></div>
            </motion.div>
            {/* PORTA DIREITA */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="w-1/2 h-full bg-[#1a0b2e] border-l-4 border-[var(--gold)] relative flex items-center justify-start pointer-events-auto shadow-2xl"
            >
              {/* Textura */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
              <div className="w-full h-2 bg-[var(--gold)]/20 absolute top-1/4"></div>
              <div className="w-full h-2 bg-[var(--gold)]/20 absolute bottom-1/4"></div>
              {/* Maçaneta Direita */}
              <div className="ml-2 w-4 h-16 bg-[var(--gold)] rounded-r-lg shadow-lg"></div>
            </motion.div>
            {/* LOGIN */}
            <motion.div
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto z-50 p-4"
            >
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-[var(--gold)] text-center max-w-sm w-full shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex justify-center mb-6"
                >
                  <div className="bg-[var(--gold)] p-4 rounded-full text-[#1a0b2e]">
                    <Lock size={32} />
                  </div>
                </motion.div>

                <h1 className="font-serif text-4xl text-[var(--gold)] mb-2">
                  Domínios Reais
                </h1>
                <p className="text-gray-300 text-lg mb-6 font-serif italic">
                  O domínio real a seguir está restringido. Insira a chave de
                  nossa aliança para revelar a surpresa que a aguarda além deste
                  portal! ✨
                </p>

                <div className="flex flex-col gap-4">
                  <motion.input
                    type="password"
                    inputMode="numeric" 
                    placeholder="••••"
                    maxLength={4}
                    className={`bg-white/10 border-2 rounded p-3 text-center text-xl text-white outline-none focus:bg-white/20 transition placeholder-white/20 tracking-[0.5em] ${
                      error ? "border-red-500" : "border-[var(--gold)]"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                    keyboardType="numeric"
                  />

                  <button
                    onClick={handleLogin}
                    className="bg-[var(--gold)] text-[#1a0b2e] font-bold py-3 px-6 rounded hover:scale-105 active:scale-95 transition pixel-font text-xs uppercase tracking-widest shadow-lg"
                  >
                    Abrir Portões
                  </button>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-[10px]"
                    >
                      A chave está incorreta. O portão permanece fechado.
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
