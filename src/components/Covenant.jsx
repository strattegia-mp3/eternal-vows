import { motion } from "framer-motion";

const Covenant = () => {
  return (
    <div className="py-20 px-4 w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        // Container principal com formato de "Arco Gótico" suavizado
        className="relative bg-[#fdfbf7] text-[#1a0b2e] w-full max-w-xl pt-16 pb-10 px-6 md:px-12 rounded-t-[3rem] md:rounded-t-[10rem] rounded-b-lg shadow-2xl border-b-8 border-[var(--primary)] flex flex-col items-center overflow-visible"
      >
        {/*ÍCONE SUPERIOR */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-[var(--gold)] p-4 rounded-full border-4 border-[#1a0b2e] shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#1a0b2e]"
            >
              <path d="M11 2h2v7h7v2h-7v11h-2v-11h-7v-2h7z" />
            </svg>
          </div>
        </div>

        {/* TÍTULO */}
        <h3 className="font-serif text-sm md:text-base font-bold uppercase tracking-[0.3em] text-[var(--primary)] mb-8 mt-4 text-center">
          O Fundamento Divino
        </h3>

        {/* O VERSÍCULO */}
        <div className="relative z-10 max-w-md text-center">
          <span className="absolute -top-6 left-0 text-6xl text-[var(--gold)] opacity-50 font-serif leading-none select-none">
            “
          </span>

          <p className="font-serif text-lg md:text-2xl leading-relaxed text-[#3e2723] italic">
            E, se alguém prevalecer contra um, os dois lhe resistirão; e o
            cordão de três dobras não se quebra tão depressa.
          </p>

          <span className="absolute -bottom-8 right-0 text-6xl text-[var(--gold)] opacity-50 font-serif leading-none select-none">
            ”
          </span>
        </div>

        <p className="mt-10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 border-t border-gray-300 pt-2 px-4">
          Eclesiastes 4:12
        </p>

        {/* VISUAL DAS 3 DOBRAS */}
        <div className="mt-12 w-full flex flex-col items-center">
          {/* As Barras Animadas */}
          <div className="flex items-end justify-center gap-4 md:gap-8 h-32 relative z-10">
            {/* 1. O Cavalheiro (Esquerda) */}
            <div className="flex flex-col items-center gap-2 group">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "4rem" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-3 md:w-4 bg-gradient-to-t from-[#1a0b2e] to-blue-900 rounded-t-full shadow-md"
              />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                Ele
              </span>
            </div>

            {/* 2. Deus (Centro - Mais alto e brilhante) */}
            <div className="flex flex-col items-center gap-2 -mt-2 relative z-20">
              {/* Brilho atrás de Deus */}
              <div className="absolute bottom-8 w-1 h-20 bg-[var(--gold)] blur-lg opacity-40"></div>

              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "6rem" }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="w-4 md:w-5 bg-gradient-to-t from-[var(--gold)] via-yellow-200 to-white rounded-t-full shadow-[0_0_15px_rgba(212,175,55,0.6)] border border-white/50"
              />
              <span className="text-[10px] md:text-xs font-bold text-[var(--gold)] uppercase tracking-widest drop-shadow-sm">
                Deus
              </span>
            </div>

            {/* 3. A Dama (Direita) */}
            <div className="flex flex-col items-center gap-2 group">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "4rem" }}
                transition={{ duration: 1, delay: 0.6 }}
                className="w-3 md:w-4 bg-gradient-to-t from-[#5d4037] to-pink-700 rounded-t-full shadow-md"
              />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                Ela
              </span>
            </div>
          </div>

          {/* A Base (O Alicerce) */}
          <div className="w-48 h-1 bg-gray-300 rounded-full mt-1"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Covenant;
