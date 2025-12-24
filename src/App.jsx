import { useCallback, useEffect, useRef, useState } from "react";
import Hero from "./components/Hero";
import TypewriterLetter from "./components/LoveLetter";
import HeartClicker from "./components/HeartClicker";
import MemoryWall from "./components/MemoryWall";
import Gatekeeper from "./components/Gatekeeper";
import Familiar from "./components/Familiar";
import MessageInABottle from "./components/MessageInABottle";
import PotionShop from "./components/PotionShop";
import { SecurityProvider } from "./context/SecurityContext";
import BackgroundAudio from "./components/BackgroundAudio";
import { playlist } from "./data/playlist";
import Footer from "./components/Footer";

function App() {
  // Inicializa com uma música aleatória
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * playlist.length)
  );

  // Criamos o audio já com a música sorteada
  const audioRef = useRef(new Audio(playlist[currentIndex].url));

  // Função para tocar
  const playMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) =>
          console.log("Aguardando interação...", error)
        );
      }
    }
  }, []);

  // Lógica de Tocar/Pausar manual
  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        playMusic();
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Lógica de "Próxima Música"
  const playRandomNext = useCallback(() => {
    let nextIndex;

    if (playlist.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = 0;
    }

    setCurrentIndex(nextIndex);

    if (audioRef.current) {
      audioRef.current.src = playlist[nextIndex].url;
      audioRef.current.load();
      playMusic();
    }
  }, [currentIndex, playMusic]);

  // Listener para quando a música acaba -> Toca a próxima
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playRandomNext();
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playRandomNext]);

  return (
    <SecurityProvider>
      <Gatekeeper onUnlock={playMusic}>
        <div className="min-h-screen pb-10 relative">
          <PotionShop />
          <Hero />

          <div className="relative z-20 flex flex-col gap-8 px-4">
            <TypewriterLetter />
            <MemoryWall />
            <HeartClicker />

            {/* Player do Spotify */}
            <div className="mx-auto w-full max-w-md my-8 shadow-2xl border border-[var(--gold)]/20 rounded-xl overflow-hidden">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/0XTTaP9EWyL68k7EiOJf3n?utm_source=generator"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>

            <MessageInABottle />
            <Footer />
          </div>

          <Familiar />
          <BackgroundAudio
            audioRef={audioRef}
            currentSong={playlist[currentIndex]}
            onNext={playRandomNext}
            onTogglePlay={togglePlay}
          />
        </div>
      </Gatekeeper>
    </SecurityProvider>
  );
}

export default App;
