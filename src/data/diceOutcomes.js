export const diceOutcomes = {
  // --- A ZONA DE PERIGO (1-5) ---
  1: {
    text: "💀 FALHA CRÍTICA! O destino foi cruel. Você lava a louça (ou paga o sorvete) hoje!",
    type: "critical_fail",
  },
  2: {
    text: "Massagem nos pés do outro por 5 minutos. Sem reclamar!",
    type: "bad",
  },
  3: {
    text: "O outro escolhe a playlist da próxima viagem de ônibus/carro inteira.",
    type: "bad",
  },
  4: {
    text: "Você deve fazer um elogio muito específico e poético agora.",
    type: "neutral",
  },
  5: {
    text: "Sessão de fotos! O outro é o modelo, você é o fotógrafo (mínimo 10 fotos).",
    type: "neutral",
  },

  // --- A ZONA DE IMPASSE (6-15) ---
  6: {
    text: "Duelo de Olhares: Quem piscar primeiro paga um chocolate.",
    type: "neutral",
  },
  7: {
    text: "Hora da Leitura: O outro escolhe um trecho de um livro para você interpretar em voz alta.",
    type: "neutral",
  },
  8: {
    text: "Decisão do Filme: Quem tirou esse número escolhe o gênero, o outro o título.",
    type: "neutral",
  },
  9: {
    text: "Pausa para hidratação! Busque água para o seu amor agora.",
    type: "neutral",
  },
  10: {
    text: "⚖️ EQUILÍBRIO: Façam uma lista de 3 coisas para fazerem e decidam no Jokenpô.",
    type: "neutral",
  },
  11: {
    text: "Verdade ou Desafio? O outro escolhe a pergunta.",
    type: "neutral",
  },
  12: {
    text: "Sessão Nostalgia: Mostrem a foto mais engraçada/antiga da galeria.",
    type: "neutral",
  },
  13: {
    text: "Momento MasterChef: Vocês devem cozinhar algo juntos na próxima vez que se verem.",
    type: "good",
  },
  14: {
    text: "Direito a um pedido de 'cafuné ilimitado' por 10 minutos.",
    type: "good",
  },
  15: {
    text: "Noite de Jogos! O vencedor escolhe qual jogo (Coop ou Vs).",
    type: "good",
  },

  // --- A ZONA DA VITÓRIA (16-19) ---
  16: {
    text: "Vale um beijo de cinema (daqueles de tirar o fôlego).",
    type: "great",
  },
  17: {
    text: "O outro deve te contar 3 coisas que mais admira em você.",
    type: "great",
  },
  18: {
    text: "Passeio garantido! Você escolhe o local do próximo date.",
    type: "great",
  },
  19: {
    text: "Dia de Rei/Rainha: O outro deve te servir um lanche no sofá.",
    type: "great",
  },

  // --- O SONHO (20) ---
  20: {
    text: "🌟 SUCESSO CRÍTICO! Você ganhou um 'Vale-Tudo': Escolha o filme, o rango, passeio ou qualquer coisa!",
    type: "critical_success",
  },
};
