import { useState, useRef, useCallback, useEffect } from "react";

export const useAudioPlayer = (playlist) => {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * playlist.length)
  );

  const audioRef = useRef(new Audio(playlist[currentIndex].url));

  const playMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.log("Autoplay bloqueado:", error));
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        playMusic();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playMusic]);

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
  }, [currentIndex, playlist, playMusic]);

  // Listener de fim de música
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => playRandomNext();
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playRandomNext]);

  return {
    currentIndex,
    audioRef,
    playMusic,
    togglePlay,
    playRandomNext,
    currentSong: playlist[currentIndex],
  };
};
