import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, X } from "lucide-react";
import { potions } from "../data/potions";

const PotionShop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePotionId, setActivePotionId] = useState("clean");

  // OTIMIZAÇÃO 1: useCallback para evitar recriação da função
  const applyPotion = useCallback((potion) => {
    setActivePotionId(potion.id);

    // OTIMIZAÇÃO 2: Preparação da GPU
    // Adiciona 'will-change' antes de aplicar o filtro para avisar o navegador
    document.documentElement.style.willChange = "filter";

    // Pequeno delay para garantir que o will-change foi registrado
    requestAnimationFrame(() => {
      // OTIMIZAÇÃO 3: Tempo de transição reduzido (0.8s é mais leve que 1.5s)
      document.documentElement.style.transition = "filter 0.8s ease-in-out";
      document.documentElement.style.filter = potion.filter;
    });

    // Limpeza: Remove 'will-change' após a transição para economizar memória
    setTimeout(() => {
      document.documentElement.style.willChange = "auto";
    }, 1000); // Um pouco mais que a duração da transição
  }, []);

  // Efeito de limpeza ao desmontar
  useEffect(() => {
    return () => {
      document.documentElement.style.filter = "none";
      document.documentElement.style.willChange = "auto";
    };
  }, []);

  return (
    <>
      {/* --- BOTÃO FLUTUANTE --- */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        // Removido backdrop-blur daqui também se estiver lagando no scroll
        className="fixed top-4 right-4 z-40 bg-black/80 p-3 rounded-full border border-[var(--gold)] text-[var(--gold)] shadow-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-shadow cursor-pointer"
        title="Loja de Poções"
      >
        <FlaskConical size={24} />
        {activePotionId !== "clean" && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-[var(--accent)] rounded-full border border-black animate-pulse"></span>
        )}
      </motion.button>

      {/* --- MODAL DA LOJA --- */}
      <AnimatePresence>
        {isOpen && (
          <div
            // OTIMIZAÇÃO 4: REMOVIDO 'backdrop-blur-sm'
            // O blur sobreposto a filtros de página é o maior causador de lag.
            // Usamos apenas um bg-black com alta opacidade.
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }} // Animação do modal mais rápida
              className="bg-[#1a0b2e] border-2 border-[var(--gold)] p-6 rounded-xl max-w-sm w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Fechar */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition p-2 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <h3 className="font-serif text-3xl text-[var(--gold)] flex items-center justify-center gap-2">
                  <FlaskConical className="text-[var(--gold)]" /> O Alquimista
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Escolha como deseja ver o mundo!
                </p>
              </div>

              {/* LISTA DE POÇÕES */}
              <div className="flex flex-col gap-2">
                {potions.map((potion) => {
                  const isActive = activePotionId === potion.id;

                  return (
                    <button
                      key={potion.id}
                      onClick={() => applyPotion(potion)}
                      // Removemos animações pesadas (motion) de cada item da lista para focar performance
                      className={`
                        flex items-center gap-4 p-3 rounded-lg border transition-colors duration-200 group text-left w-full cursor-pointer
                        ${
                          isActive
                            ? "bg-[var(--gold)]/10 border-[var(--gold)]"
                            : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                        }
                      `}
                    >
                      {/* Ícone Estático (Mais leve que SVG animado) */}
                      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                        <div
                          className="absolute inset-0 rounded-full opacity-50 transition-opacity"
                          style={{ backgroundColor: potion.color }}
                        ></div>
                        <FlaskConical
                          size={20}
                          className="relative z-10 text-white"
                          style={{
                            fill: isActive ? potion.color : "transparent",
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-bold text-sm truncate ${
                            isActive ? "text-[var(--gold)]" : "text-gray-200"
                          }`}
                        >
                          {potion.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 italic truncate">
                          {potion.desc}
                        </p>
                      </div>

                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[var(--gold)] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 font-serif italic">
                  "Efeitos visuais podem variar dependendo da magia do
                  navegador."
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PotionShop;
