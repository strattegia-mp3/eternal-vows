import { useEffect, useState } from "react";
import {
  Volume2,
  VolumeX,
  SkipForward,
  Play,
  Pause,
  Music,
  ChevronDown,
  Maximize2,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const FloatingNote = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, x: 0, scale: 0.5, rotate: 0 }}
    animate={{
      opacity: [0, 1, 0],
      y: -60,
      x: [0, 10, -10, 0], // Movimento de onda suave
      scale: 1,
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    className="absolute -top-2 left-1/2 text-[var(--gold)] pointer-events-none"
  >
    <Music size={12} />
  </motion.div>
);

const BackgroundAudio = ({ audioRef, currentSong, onNext, onTogglePlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateState = () => {
      setIsPlaying(!audio.paused);
      setIsMuted(audio.muted);
      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration));
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("play", updateState);
    audio.addEventListener("pause", updateState);
    audio.addEventListener("timeupdate", updateState);
    audio.addEventListener("loadedmetadata", updateState);

    return () => {
      audio.removeEventListener("play", updateState);
      audio.removeEventListener("pause", updateState);
      audio.removeEventListener("timeupdate", updateState);
      audio.removeEventListener("loadedmetadata", updateState);
    };
  }, [audioRef, currentSong]);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onNext();
  };

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    onTogglePlay();
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence mode="wait">
        {/* CASO 1: Botão de Resgate (Aparece se nada estiver tocando) */}
        {!isPlaying && !isExpanded && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              onTogglePlay();
              setIsExpanded(true); 
            }}
            className="flex items-center gap-2 bg-[var(--gold)] text-[#1a0b2e] px-4 py-3 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] font-bold"
          >
            <Play fill="currentColor" size={20} />
            <span className="text-xs font-serif tracking-widest hidden md:inline">
              PLAY
            </span>
          </motion.button>
        )}

        {/* CASO 2: Player MINIMIZADO (O Disco Giratório) */}
        {isPlaying && !isExpanded && (
          <motion.div
            key="mini-player"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsExpanded(true)}
            className="cursor-pointer relative group"
          >
            {/* Partículas Musicais */}
            <div className="absolute inset-0 flex justify-center items-center">
              <FloatingNote delay={0} />
              <FloatingNote delay={0.8} />
              <FloatingNote delay={1.5} />
            </div>

            {/* O Disco */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-14 h-14 rounded-full bg-[#111] border-2 border-[var(--gold)] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] relative overflow-hidden"
            >
              {/* Brilho do vinil (reflexo) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>

              {/* Miolo do disco (Capa do álbum ou cor sólida) */}
              <div className="w-6 h-6 rounded-full bg-[var(--primary)] border border-gray-700 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
              </div>
            </motion.div>

            {/* Badge de "Expandir" */}
            <div className="absolute -top-1 -right-1 bg-white text-black rounded-full p-1 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={10} />
            </div>
          </motion.div>
        )}

        {/* CASO 3: Player EXPANDIDO */}
        {isExpanded && (
          <motion.div
            key="full-player"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            className="bg-[#1a0b2e]/90 backdrop-blur-xl border border-[var(--gold)]/30 rounded-xl p-4 shadow-2xl flex flex-col gap-3 w-[85vw] max-w-sm md:w-80"
          >
            {/* Cabeçalho com Botão Minimizar */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-[var(--gold)]/20 p-2 rounded-lg text-[var(--gold)] shrink-0">
                  <Music size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[var(--gold)] font-bold text-sm truncate leading-tight">
                    {currentSong.title}
                  </h4>
                  <p className="text-gray-400 text-xs truncate">
                    {currentSong.artist}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white p-1 -mt-2 -mr-2"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Barra de Progresso e Tempo */}
            <div className="space-y-1">
              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[var(--gold)] h-full transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>{currentTime}</span>
                <span>{duration}</span>
              </div>
            </div>

            {/* Controles Principais */}
            <div className="flex items-center justify-between px-2">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white transition"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <div className="flex items-center gap-6">
                <button
                  onClick={handleTogglePlay}
                  className="bg-[var(--gold)] text-[#1a0b2e] rounded-full p-3 hover:scale-105 transition shadow-lg shadow-yellow-500/20"
                >
                  {isPlaying ? (
                    <Pause fill="currentColor" size={20} />
                  ) : (
                    <Play fill="currentColor" size={20} />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="text-white hover:text-[var(--gold)] transition"
                >
                  <SkipForward size={24} />
                </button>
              </div>

              {/* Spacer para centralizar os botões do meio */}
              <div className="w-5"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundAudio;
