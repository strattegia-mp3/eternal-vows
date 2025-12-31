import { lazy } from "react";

// COMPONENTES CRÍTICOS
export { default as SecretReveal } from "./SecretReveal";
export { default as Hero } from "./Hero";
export { default as PotionShop } from "./PotionShop";
export { default as TypewriterLetter } from "./LoveLetter";
export { default as Gatekeeper } from "./Gatekeeper";
export { default as BackgroundAudio } from "./BackgroundAudio";
export { default as Footer } from "./Footer";

// COMPONENTES LAZY
export const MemoryWall = lazy(() => import("./MemoryWall"));
export const HeartClicker = lazy(() => import("./HeartClicker"));
export const Familiar = lazy(() => import("./Familiar"));
export const MessageInABottle = lazy(() => import("./MessageInABottle"));
export const StatsGrimoire = lazy(() => import("./StatsGrimoire"));
export const AttributeRadar = lazy(() => import("./AttributeRadar"));
export const SkillTree = lazy(() => import("./SkillTree"));
export const QuestLog = lazy(() => import("./QuestLog"));
export const LunarAlignment = lazy(() => import("./LunarAlignment"));
export const InterstellarVoyage = lazy(() => import("./InterstellarVoyage"));
export const DestinyDice = lazy(() => import("./DestinyDice"));
export const Covenant = lazy(() => import("./Covenant"));
export const SpotifyPlayer = lazy(() => import("./SpotifyPlayer"));
