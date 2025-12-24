import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Timer = ({ startDate }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = now - new Date(startDate).getTime();
      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 font-serif text-[var(--gold)]">
      {[
        { label: "Dias", val: time.days },
        { label: "Horas", val: time.hours },
        { label: "Min", val: time.minutes },
        { label: "Seg", val: time.seconds },
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center min-w-[60px]"
        >
          {/* Fundo semitransparente para legibilidade */}
          <div className="bg-black/30 rounded-lg p-2 md:p-3 backdrop-blur-sm border border-[var(--gold)]/30 min-w-[70px] text-center shadow-lg">
            <span className="text-2xl md:text-3xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-mono">
              {String(item.val).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 mt-1">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default Timer;
