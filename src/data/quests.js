export const quests = [
  // --- RANK E (Cotidianas & Fofas) ---
  {
    id: 1,
    text: "O Clube do Livro a Dois",
    desc: "Lerem o mesmo livro e debaterem o final (Vale romance ou fantasia).",
    completed: false,
    xp: 800,
    type: "intellect",
  },
  {
    id: 2,
    text: "Sessão de Estudos na Biblioteca",
    desc: "Uma tarde inteira estudando juntos (BCE da UnB ou biblioteca pública).",
    completed: false,
    xp: 500,
    type: "intellect",
  },
  {
    id: 3,
    text: "A Playlist da Bardesa",
    desc: "Criar uma playlist colaborativa para as viagens de ônibus/metrô e momentos mais ociosos.",
    completed: true, // Já deve ter rolado
    xp: 300,
    type: "art",
  },

  // --- RANK C (Encontros & Esforço) ---
  {
    id: 4,
    text: "O Piquenique no Reino Verde",
    desc: "Tarde no Jardim Botânico ou Parque da Cidade com lanches feitos em casa.",
    completed: false,
    xp: 1500,
    type: "nature",
  },
  {
    id: 5,
    text: "MasterChef Universitário",
    desc: "Cozinhar um jantar complexo juntos (sem pedir iFood!).",
    completed: false,
    xp: 1200,
    type: "cooking",
  },
  {
    id: 6,
    text: "Player 2 Conectado",
    desc: "Zerar uma campanha Coop (It Takes Two, Overcooked ou Jogos Mais Românticos).",
    completed: false,
    xp: 1000,
    type: "game",
  },

  // --- RANK B (Romance Épico) ---
  {
    id: 7,
    text: "O Carteiro Real",
    desc: "Escrever e entregar cartas físicas escritas à mão um para o outro.",
    completed: false,
    xp: 2000,
    type: "romance",
  },
  {
    id: 8,
    text: "A Grande Expedição",
    desc: "Primeira viagem de fim de semana sozinhos para uma cidade vizinha.",
    completed: false,
    xp: 3500,
    type: "travel",
  },

  // --- RANK A (Objetivos de Vida) ---
  {
    id: 9,
    text: "Aprovação na Guilda (Concurso)",
    desc: "Um dos dois (ou ambos, de preferência) tomar posse no cargo público almejado.",
    completed: false,
    xp: 10000,
    legendary: true,
    type: "career",
  },
  {
    id: 10,
    text: "Pergaminho da Sabedoria (Diploma)",
    desc: "Concluir a graduação: receber o diploma e celebrar a conquista juntos.",
    completed: false,
    xp: 8000,
    legendary: true,
    type: "career",
  },

  // --- RANK S (O Futuro) ---
  {
    id: 11,
    text: "Base Principal (Castelo)",
    desc: "Alugar ou comprar o primeiro cantinho para morar juntos.",
    completed: false,
    xp: 20000,
    legendary: true,
    type: "life",
  },
  {
    id: 12,
    text: "O Juramento Eterno",
    desc: "O Casamento. O 'Felizes para Sempre' da vida real.",
    completed: false,
    xp: 50000,
    legendary: true,
    type: "life",
  },
];
