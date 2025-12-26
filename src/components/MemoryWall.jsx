import { useState, useMemo, memo, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { useSecurity } from "../context/SecurityContext";

const MemoryCard = memo(({ memory, onClick, index }) => {
  return (
    <motion.div
      layoutId={`card-container-${memory.id}`}
      onClick={() => onClick(memory.id)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      className="mb-4 bg-white p-2 pb-6 shadow-lg rounded-sm cursor-pointer hover:shadow-xl transition-shadow duration-300 w-full"
    >
      <motion.div
        layoutId={`image-container-${memory.id}`}
        className="w-full overflow-hidden bg-gray-100 rounded-sm relative"
      >
        <div className="absolute inset-0 bg-gray-200 animate-pulse -z-10" />
        <img
          src={memory.src}
          alt={memory.title}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 50vw, 33vw"
          className="w-full h-auto object-cover block will-change-transform"
        />
      </motion.div>

      <motion.h3
        layoutId={`title-${memory.id}`}
        className="text-[var(--bg-dark)] font-serif font-bold mt-3 text-center text-xs md:text-sm leading-tight px-1"
      >
        {memory.title}
      </motion.h3>
    </motion.div>
  );
});

const MemoryWall = () => {
  const { decryptedMemories } = useSecurity();
  const [selectedId, setSelectedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const checkSize = () => {
      setNumColumns(window.innerWidth >= 768 ? 3 : 2);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const visibleMemories = useMemo(() => {
    return decryptedMemories.slice(0, visibleCount);
  }, [decryptedMemories, visibleCount]);

  const distributedColumns = useMemo(() => {
    const cols = Array.from({ length: numColumns }, () => []);
    visibleMemories.forEach((memory, i) => {
      cols[i % numColumns].push(memory);
    });
    return cols;
  }, [visibleMemories, numColumns]);

  const handleLoadMore = () => {
    requestAnimationFrame(() => {
      setVisibleCount((prev) => prev + 12);
    });
  };

  return (
    <div className="px-4 py-12 max-w-4xl mx-auto z-20 relative">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl text-[var(--gold)] font-serif italic mb-2 drop-shadow-md">
          Crônicas do Nosso Reino
        </h2>
        <div className="h-px w-24 bg-[var(--gold)] mx-auto opacity-70"></div>
        <p className="text-sm mt-2 opacity-80 font-serif">
          Toque nas memórias para ler o pergaminho
        </p>
      </div>

      <div className="flex gap-4 items-start justify-center">
        {distributedColumns.map((colMemories, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {colMemories.map((memory, index) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                index={index}
                onClick={setSelectedId}
              />
            ))}
          </div>
        ))}
      </div>

      {visibleCount < decryptedMemories.length && (
        <div className="flex justify-center mt-12 pb-8">
          <button
            onClick={handleLoadMore}
            className="flex flex-col items-center gap-2 text-[var(--gold)] hover:text-white transition-colors group active:scale-95 transition-transform p-4"
          >
            <span className="font-serif text-lg tracking-widest uppercase border-b border-transparent group-hover:border-[var(--gold)]">
              Revelar Mais Memórias
            </span>
            <ChevronDown className="animate-bounce" />
          </button>
        </div>
      )}

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:py-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />

            {decryptedMemories.map(
              (memory) =>
                memory.id === selectedId && (
                  <motion.div
                    key={memory.id}
                    layoutId={`card-container-${memory.id}`}
                    className="bg-[#F5F5F0] w-full max-w-5xl h-[85vh] md:h-[75vh] rounded-lg shadow-2xl relative z-[101] flex flex-col md:flex-row overflow-hidden border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* BOTÃO FECHAR */}
                    <button
                      onClick={() => setSelectedId(null)}
                      className="absolute z-50 top-4 left-4 md:left-auto md:right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/80 transition shadow-lg border border-white/20 group"
                    >
                      <X
                        size={20}
                        className="group-hover:rotate-90 transition-transform duration-300"
                      />
                    </button>

                    <motion.div
                      layoutId={`image-container-${memory.id}`}
                      className="relative w-full md:w-[55%] h-[45vh] md:h-full bg-black flex items-center justify-center overflow-hidden flex-shrink-0"
                    >
                      {/* 1. Camada de Fundo (Blur) para preencher espaços vazios */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={memory.src}
                          alt="background"
                          className="w-full h-full object-cover blur-2xl opacity-50 scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>{" "}
                        {/* Máscara leve */}
                      </div>

                      {/* 2. Imagem Principal (Contain) - Garante que NADA é cortado */}
                      <img
                        src={memory.src}
                        alt={memory.title}
                        className="relative z-10 w-full h-full object-contain p-2 md:p-0 shadow-xl drop-shadow-2xl"
                      />
                    </motion.div>

                    {/* COLUNA DO TEXTO */}
                    <div className="w-full md:w-[45%] h-full overflow-y-auto p-6 md:p-10 text-[var(--bg-dark)] scrollbar-thin scrollbar-thumb-[var(--gold)] scrollbar-track-transparent bg-[#F5F5F0]">
                      <div className="mt-2 md:mt-12">
                        <motion.h3
                          layoutId={`title-${memory.id}`}
                          className="text-2xl md:text-3xl font-serif font-bold text-[var(--primary)] mb-2 leading-tight"
                        >
                          {memory.title}
                        </motion.h3>

                        <span className="text-xs font-bold text-[var(--gold)] uppercase tracking-widest mb-6 block opacity-80 border-b border-[var(--gold)]/30 pb-2 w-full">
                          {memory.date}
                        </span>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="font-serif text-base md:text-lg leading-relaxed text-gray-800"
                        >
                          <p className="whitespace-pre-line">
                            {memory.description}
                          </p>

                          <div className="mt-8 pt-6 border-t border-[var(--primary)]/10 text-right">
                            <span className="font-handwriting text-xl text-[var(--primary)] opacity-80 rotate-[-2deg] inline-block">
                              Com amor, Victor.
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryWall;
