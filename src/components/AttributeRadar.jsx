import { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { partyAttributes } from "../data/partyAttributes"; // Importando do novo arquivo

const AttributeRadar = () => {
  const [selectedAttr, setSelectedAttr] = useState(null);

  // Configurações do Gráfico
  const size = 320;
  const center = size / 2;
  const radius = 95;

  // Função matemática para calcular os pontos do hexágono
  const getPoint = (value, index, total, offset = 0) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const distance = (value / 100) * radius + offset;
    const x = center + Math.cos(angle) * distance;
    const y = center + Math.sin(angle) * distance;
    return `${x},${y}`;
  };

  // Calcula os pontos do polígono preenchido
  const polygonPoints = useMemo(() => {
    return partyAttributes
      .map((attr, i) => getPoint(attr.value, i, partyAttributes.length))
      .join(" ");
  }, []);

  return (
    <div className="py-12 flex flex-col items-center relative z-10 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl text-[var(--gold)] font-serif mb-2 drop-shadow-md text-center">
        Atributos do Casal
      </h2>
      <p className="text-sm font-serif italic mb-8 opacity-80 text-center px-4">
        Toque nos atributos abaixo para entender nossos poderes.
      </p>

      {/* O GRÁFICO RADAR */}
      <div className="relative w-[340px] h-[340px] flex items-center justify-center mb-8">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          {/* Grade de Fundo (As linhas do hexágono) */}
          {[20, 40, 60, 80, 100].map((level) => (
            <polygon
              key={level}
              points={partyAttributes
                .map((_, i) => getPoint(level, i, partyAttributes.length))
                .join(" ")}
              fill="none"
              stroke="var(--gold)"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          ))}

          {/* Eixos (Linhas do centro para fora) */}
          {partyAttributes.map((_, i) => {
            const p = getPoint(100, i, partyAttributes.length);
            const [x, y] = p.split(",");
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="var(--gold)"
                strokeOpacity="0.15"
              />
            );
          })}

          <motion.polygon
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
            points={polygonPoints}
            fill="var(--primary)"
            stroke="var(--gold)"
            strokeWidth="2"
            fillOpacity="0.4"
            className="origin-center"
            style={{ filter: "drop-shadow(0px 0px 8px var(--primary))" }}
          />

          {/* Labels no Gráfico */}
          {partyAttributes.map((attr, i) => {
            const p = getPoint(100, i, partyAttributes.length, 45);
            const [x, y] = p.split(",").map(Number);

            let textAnchor = "middle";
            if (x < center - 20) textAnchor = "end";
            if (x > center + 20) textAnchor = "start";

            const labelParts = attr.label.split("(");

            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <text
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  className="fill-[var(--gold)] text-[10px] font-bold tracking-widest uppercase cursor-pointer select-none"
                  style={{ fontFamily: '"Press Start 2P", cursive' }}
                  onClick={() => setSelectedAttr(i)}
                >
                  <tspan x="0" dy="-0.6em">
                    {labelParts[0].trim()}
                  </tspan>
                  <tspan
                    x="0"
                    dy="1.6em"
                    className="fill-white opacity-80 text-[9px] font-sans font-normal"
                  >
                    ({labelParts[1]}
                  </tspan>
                  <tspan
                    x="0"
                    dy="1.4em"
                    className="fill-[var(--accent)] font-bold text-[10px]"
                  >
                    {attr.value}/100
                  </tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* GRIMÓRIO */}
      <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {partyAttributes.map((attr, index) => {
          const isMaxed = attr.value === 100;
          return (
            <motion.div
              key={index}
              layout
              onClick={() =>
                setSelectedAttr(selectedAttr === index ? null : index)
              }
              className={`
                relative overflow-hidden rounded-sm border p-4 cursor-pointer transition-all duration-300
                ${
                  selectedAttr === index
                    ? "bg-[var(--primary)]/10 border-[var(--gold)] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    : "bg-white/5 border-white/10 hover:border-[var(--gold)]/50"
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      isMaxed
                        ? "bg-[var(--gold)] text-black"
                        : "bg-white/10 text-[var(--gold)]"
                    }`}
                  >
                    {attr.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[var(--gold)] text-sm md:text-base">
                      {attr.fullLabel}
                    </h4>
                    <span className="text-xs text-gray-400 font-mono">
                      Level {attr.value}
                    </span>
                  </div>
                </div>
                {isMaxed && (
                  <span className="text-xs font-bold text-[var(--gold)] animate-pulse">
                    MAXED
                  </span>
                )}
              </div>

              <div className="w-full h-1 bg-gray-700 rounded-full mb-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${attr.value}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full ${
                    isMaxed ? "bg-[var(--gold)]" : "bg-[var(--primary)]"
                  }`}
                />
              </div>

              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-serif italic opacity-90">
                "{attr.desc}"
              </p>
            </motion.div>
          );
        })}
      </div>
      <div className="text-center mt-6 px-6">
        <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto italic font-serif leading-relaxed">
          "A união perfeita entre a força e determinação de um singelo cavaleiro
          e a alma de uma bela donzela sonhadora. Prontos para qualquer capítulo
          da história."
        </p>
      </div>
    </div>
  );
};

export default AttributeRadar;
