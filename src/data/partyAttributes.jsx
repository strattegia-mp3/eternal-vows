import {
  Brain,
  Shield,
  Heart,
  Sparkles,
  BookHeart,
  Feather,
} from "lucide-react";

export const partyAttributes = [
  {
    label: "INT (Sinergia)",
    value: 94,
    fullLabel: "Intelecto & Sinergia",
    icon: <Brain size={20} />,
    desc: "Nossas mentes dançam juntas. Meu código lógico encontra as histórias dela, criando conversas infinitas.",
  },
  {
    label: "STR (Guardião)",
    value: 85,
    fullLabel: "Força & Proteção",
    icon: <Shield size={20} />,
    desc: "Minha força física é dedicada a proteger o coração e integridade física dela. Somos o escudo um do outro.",
  },
  {
    label: "CHA (Romance)",
    value: 100,
    fullLabel: "Carisma & Amor",
    icon: <Heart size={20} />,
    desc: "O atributo máximo. O 'conto de fadas' que ela sonhou se tornando realidade a cada dia (assim eu espero e me esforço).",
  },
  {
    label: "LUCK (Destino)",
    value: 97,
    fullLabel: "Sorte & Destino",
    icon: <Sparkles size={20} />,
    desc: "Contra todas as probabilidades estatísticas, nossos caminhos se cruzaram definitivamente em Julho.",
  },
  {
    label: "WIS (Empatia)",
    value: 92,
    fullLabel: "Sabedoria & Bondade",
    icon: <BookHeart size={20} />,
    desc: "A bondade dela ensina meu lado racional a sentir mais. O equilíbrio entre razão e emoção.",
  },
  {
    label: "DEX (Leveza)",
    value: 85,
    fullLabel: "Destreza & Otimismo",
    icon: <Feather size={20} />,
    desc: "A visão otimista dela nos ajuda a 'desviar' dos problemas da vida com leveza e risos.",
  },
];
