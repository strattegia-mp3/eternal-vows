import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const InterstellarVoyage = ({ startDate }) => {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    // Velocidade da Terra: ~29.78 km/s
    const EARTH_SPEED_KM_S = 29.78;

    const calculateDistance = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const secondsPassed = (now - start) / 1000;
      setDistance(secondsPassed * EARTH_SPEED_KM_S);
    };

    calculateDistance();
    // Atualiza a cada 100ms para ver o número subindo rápido (efeito legal)
    const interval = setInterval(calculateDistance, 100);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="py-8 px-4 max-w-lg mx-auto text-center">
      <div className="bg-black/40 border border-[var(--gold)]/30 p-6 rounded-lg backdrop-blur-md relative overflow-hidden">
        {/* Fundo de estrelas animado (CSS simples) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-2 text-[var(--gold)]">
            <Rocket size={32} className="transform -rotate-45" />
          </div>

          <h3 className="text-xl text-gray-300 mb-1">
            Jornada Orbital Compartilhada
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Desde que estamos juntos, a Terra já viajou:
          </p>

          <div className="font-mono text-2xl md:text-4xl text-white font-bold tracking-widest tabular-nums">
            {Math.floor(distance).toLocaleString("pt-BR")}{" "}
            <span className="text-sm text-[var(--gold)]">km</span>
          </div>

          <p className="text-[10px] mt-4 text-gray-400 pixel-font">
            VELOCIDADE ATUAL: 107.200 KM/H
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterstellarVoyage;
