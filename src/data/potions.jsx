export const potions = [
  {
    id: "love",
    name: "Elixir da Paixão",
    color: "#ec4899", // Pink-500
    // Filtro: Tom rosado, mais saturação e leve desfoque de sonho
    filter: "sepia(0.3) hue-rotate(310deg) saturate(1.6) contrast(1.1)",
    desc: "O mundo fica cor-de-rosa.",
  },
  {
    id: "midas",
    name: "Toque de Midas",
    color: "#facc15", // Yellow-400
    // Filtro: Sépia total (dourado) com alto brilho
    filter: "sepia(1) saturate(2) brightness(1.1) contrast(1.1)",
    desc: "Tudo o que você vê vira ouro.",
  },
  {
    id: "ocean",
    name: "Respiro do Mar",
    color: "#3b82f6", // Blue-500
    // Filtro: Tom azulado calmo
    filter: "sepia(0.5) hue-rotate(180deg) saturate(1.5)",
    desc: "Uma brisa fria e azulada.",
  },
    {
    id: "contrast",
    name: "Visão Noturna",
    color: "#4c1d95", // Purple-900
    // Filtro: Alto contraste, escala de cinza azulada (dark mode forçado)
    filter: "invert(0.9) hue-rotate(180deg)",
    desc: "Isso soa como um mundo invertido...",
  },
  {
    id: "gloom",
    name: "Visão Espectral",
    color: "#000", // Purple-900
    // Filtro: Alto contraste, escala de cinza azulada (dark mode forçado)
    filter: "grayscale(1) contrast(1.5) brightness(0.8) hue-rotate(240deg)",
    desc: "Revela sombras e mistérios.",
  },
  {
    id: "clean",
    name: "Água Purificada",
    color: "#bae6fd", // Sky-200
    // Filtro: Reseta tudo
    filter: "none",
    desc: "Remove todos os efeitos mágicos.",
  },
];
