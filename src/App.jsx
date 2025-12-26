import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { SecurityProvider } from "./context/SecurityContext";
import { playlist } from "./data/playlist";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import SectionWrapper from "./components/SectionWrapper";

// Importando TUDO de um único lugar (limpo!)
import {
  Hero,
  PotionShop,
  TypewriterLetter,
  Gatekeeper,
  BackgroundAudio,
  Footer, // Eager
  MemoryWall,
  HeartClicker,
  Familiar,
  MessageInABottle,
  StatsGrimoire,
  AttributeRadar,
  SkillTree,
  QuestLog,
  LunarAlignment,
  InterstellarVoyage,
  DestinyDice,
  Covenant,
  SpotifyPlayer,
} from "./components";

// Loader unificado
const FullLoader = () => (
  <div className="w-full h-40 flex items-center justify-center text-[var(--gold)]">
    <Loader2 className="animate-spin w-10 h-10 opacity-60" />
  </div>
);

function App() {
  const { audioRef, currentSong, playMusic, playRandomNext, togglePlay } =
    useAudioPlayer(playlist);

  return (
    <SecurityProvider>
      <Gatekeeper onUnlock={playMusic}>
        <div className="min-h-screen pb-10 relative overflow-x-hidden bg-[var(--bg-dark)]">
          {/* Elementos Fixos/Overlays */}
          <PotionShop />
          <Suspense fallback={null}>
            <Familiar />
          </Suspense>

          {/* --- BLOCO 1: ABERTURA & EMOÇÃO --- */}
          <Hero />

          <SectionWrapper>
            <TypewriterLetter />
          </SectionWrapper>

          {/* Suspense envolve o restante do conteúdo pesado */}
          <Suspense fallback={<FullLoader />}>
            {/* --- BLOCO 2: MEMÓRIAS & FUNDAMENTO --- */}
            <SectionWrapper>
              <MemoryWall />
            </SectionWrapper>

            <SectionWrapper>
              <Covenant />{" "}
              {/* O fundamento espiritual vem cedo para firmar a relação */}
            </SectionWrapper>

            {/* --- BLOCO 3: CÓSMICO --- */}
            <SectionWrapper className="space-y-20">
              <LunarAlignment dateString="2025-09-03" />
              <InterstellarVoyage startDate="2025-09-03T00:00:00" />
            </SectionWrapper>

            {/* --- BLOCO 4: GAMIFICAÇÃO & RPG (O "Meaty Part") --- */}
            <div className="py-12 rounded-3xl my-12 border-y border-[var(--gold)]/10">
              <h2 className="flex justify-center text-3xl md:text-5xl font-serif text-[var(--gold)] mb-12 text-center drop-shadow-lg py-12">
                📊 Status do Casal 🤓
              </h2>

              <SectionWrapper className="!py-8">
                <StatsGrimoire startDate="2025-09-03T00:00:00" />
                <AttributeRadar />
              </SectionWrapper>

              <SectionWrapper className="!py-8">
                <SkillTree />
              </SectionWrapper>

              <SectionWrapper className="!py-8">
                <QuestLog />
              </SectionWrapper>

              <SectionWrapper className="!py-8">
                <DestinyDice />
              </SectionWrapper>
            </div>

            {/* --- BLOCO 5: INTERATIVIDADE & VIBE --- */}
            <SectionWrapper>
              <HeartClicker />
            </SectionWrapper>

            <SectionWrapper>
              <SpotifyPlayer />
            </SectionWrapper>

            {/* --- BLOCO 6: DESPEDIDA --- */}
            <SectionWrapper className="mb-20">
              <MessageInABottle />
            </SectionWrapper>

            <Footer />
          </Suspense>

          {/* Controlador de Áudio (Invisível/Discreto) */}
          <BackgroundAudio
            audioRef={audioRef}
            currentSong={currentSong}
            onNext={playRandomNext}
            onTogglePlay={togglePlay}
          />
        </div>
      </Gatekeeper>
    </SecurityProvider>
  );
}

export default App;
