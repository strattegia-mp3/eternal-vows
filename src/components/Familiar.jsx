import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { phrases } from "../data/phares";

const Familiar = () => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const poke = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setMessage(randomPhrase);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 5000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Balão de Fala */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="bg-white text-[var(--bg-dark)] p-3 rounded-lg rounded-br-none shadow-xl mb-2 mr-2 max-w-[150px] text-xs font-bold text-center border-2 border-[var(--gold)]"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* O Avatar */}
      <motion.button
        onClick={poke}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.8 }}
        className="text-6xl filter drop-shadow-lg cursor-pointer bg-transparent border-none focus:outline-none"
      >
        🐱
      </motion.button>
    </div>
  );
};

export default Familiar;
