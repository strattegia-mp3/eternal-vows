import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical } from "lucide-react"; // Instale lucide-react se não tiver

const PotionShop = () => {
  const [isOpen, setIsOpen] = useState(false);

  const potions = [
    {
      name: "Poção do Amor",
      color: "bg-pink-500",
      filter: "hue-rotate(-50deg) contrast(1.2)",
      desc: "Deixa o mundo mais rosa",
    },
    {
      name: "Elixir de Midas",
      color: "bg-yellow-400",
      filter: "sepia(1) hue-rotate(5deg)",
      desc: "Tudo vira ouro",
    },
    {
      name: "Visão Noturna",
      color: "bg-purple-900",
      filter: "invert(0.9) hue-rotate(180deg)",
      desc: "Mundo invertido",
    },
    {
      name: "Água Pura",
      color: "bg-blue-400",
      filter: "none",
      desc: "Remove efeitos",
    },
  ];

  const applyPotion = (filter) => {
    // Aplicamos o filtro no body ou root
    document.documentElement.style.filter = filter;
    document.documentElement.style.transition = "filter 1s ease";
    setIsOpen(false);
  };

  return (
    <>
      {/* Botão do Inventário */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 bg-black/40 p-3 rounded-full border border-[var(--gold)] text-[var(--gold)] backdrop-blur-md shadow-lg"
      >
        <FlaskConical size={24} />
      </button>

      {/* Modal da Loja */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#1a0b2e] border-2 border-[var(--gold)] p-6 rounded-lg max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-center font-serif text-2xl text-[var(--gold)] mb-6">
                Inventário de Poções
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {potions.map((potion) => (
                  <motion.button
                    key={potion.name}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => applyPotion(potion.filter)}
                    className="flex flex-col items-center p-3 rounded bg-white/5 hover:bg-white/10 transition"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${potion.color} mb-2 shadow-[0_0_10px_currentColor] border border-white/50`}
                    ></div>
                    <span className="font-bold text-xs text-white">
                      {potion.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {potion.desc}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PotionShop;
