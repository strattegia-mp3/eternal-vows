import { useState } from "react";
import confetti from "canvas-confetti";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const HeartClicker = () => {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState([]);

  const handleClick = (e) => {
    setCount((c) => c + 1);
    const rect = e.target.getBoundingClientRect();
    const xPos = e.clientX || rect.left + rect.width / 2;
    const yPos = e.clientY || rect.top + rect.height / 2;

    const newClick = { id: Date.now(), x: xPos, y: yPos, val: "+100 XP" };
    setClicks((prev) => [...prev, newClick]);

    setTimeout(() => {
      setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
    }, 1000);

    // Confete
    const xNorm = xPos / window.innerWidth;
    const yNorm = yPos / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 70,
      origin: { x: xNorm, y: yNorm },
      colors: ["#ffd700", "#6a0dad"],
      shapes: ["circle", "star"],
      scalar: 0.8,
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-20 p-4 select-none w-full">
      <h3 className="text-[var(--gold)] font-serif text-3xl md:text-4xl mb-2">
        Enviar Bençãos de Amor
      </h3>
      <p className="mb-6 text-sm opacity-70">
        Toque no coração para fortalecer nosso vínculo eterno!
      </p>

      <div className="relative inline-block mb-6">
        {" "}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleClick}
          className="text-7xl md:text-8xl filter drop-shadow-[0_0_15px_rgba(255,0,0,0.4)] cursor-pointer bg-transparent border-none outline-none focus:outline-none"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          ❤️
        </motion.button>
        {/* Texto Flutuante de RPG */}
        <AnimatePresence>
          {clicks.map((click) => (
            <motion.span
              key={click.id}
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -100, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-1/2 pixel-font text-[var(--gold)] font-bold text-lg pointer-events-none"
              style={{
                transform: "translateX(-50%)",
                textShadow: "2px 2px 0 #000",
              }}
            >
              {click.val}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="border border-[var(--gold)] px-6 py-2 rounded-full bg-black/30 backdrop-blur shadow-lg">
        <p className="pixel-font text-xs text-[var(--accent)] tracking-widest">
          XP TOTAL:{" "}
          <span className="text-white text-base ml-2">{count * 100}</span>
        </p>
      </div>
    </div>
  );
};

export default HeartClicker;
