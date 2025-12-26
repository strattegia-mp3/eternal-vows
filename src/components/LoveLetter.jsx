import Typewriter from "typewriter-effect";
import { Quote } from "lucide-react";
import { memo } from "react";

const LoveLetter = memo(() => {
  const fullTextHTML = `
    <span style="font-size: 1.4em; font-weight: 700; color: #592c2c; font-family: Cormorant Garamond, serif;">Minha Soberana e Doce Dama,</span><br><br>
    Desde que os fios de nossos destinos se entrelaçaram nas quentes e aconchegantes brisas de setembro, meu modesto reino ganhou matizes e luzes que eu julgava perdidas no tempo.<br><br>
    Minha gratidão é imensurável por cada passo que trilhamos e por cada ventura singular que partilhamos.<br><br>
    Foi tu quem, com gentileza, resgatou-me dos abismos mais profundos para alçar-me aos cumes mais vertiginosos que já ousei tocar; <strong>sou, em verdade, um homem abençoado por tê-la como minha donzela.</strong><br><br>
    E algo ouso profetizar com inabalável certeza: <em>nossas almas caminharão entrelaçadas através das eras.</em>
    Que este tempo seja eterno e que possamos, em nossa união, alcançar a plenitude e a glória que o destino, e Deus, possa nos reservar.<br><br>
    Rendo graças à vossa confiança, à vossa cumplicidade e a essa maneira suave e encantadora de ser.
    És a companheira mais perfeita — na vossa sublime humanidade — que eu poderia sonhar e que meu coração sempre almejou conquistar.<br><br>
    Elevo minhas preces ao Criador para que derrame sobre nós Sua graça, concedendo-nos direção e sabedoria para governar nossos anseios, sonhos e conquistas, tanto as minhas quanto as vossas, que agora são um só propósito.<br><br>
    <span style="color: #6a0dad; font-weight: bold;">Tu és a mais preciosa dádiva com a qual pude ser agraciado.</span><br><br>
    Lado a lado, haveremos de subjugar qualquer sombra ou infortúnio que ouse se opor ao nosso triunfo.<br><br>
    <div style="width: 100%; text-align: right; margin-top: 20px;"><span style="font-size: 1.2em; font-style: italic; color: #D4AF37;">— Com amor eterno e devoção,<br>Victor.</span></div>
  `;

  return (
    <div className="relative my-16 mx-4 max-w-2xl md:mx-auto perspective-1000">
      {/* Camada de Fundo */}
      <div className="absolute inset-0 bg-[#dcd7c9] transform rotate-1 rounded-sm shadow-xl z-0 border border-[#b0a890]"></div>

      {/* CAMADA PRINCIPAL */}
      <div className="relative z-10 bg-[#fdfbf7] shadow-2xl rounded-sm border-double border-4 border-[#b8860b]/40">
        {/* SELO DE CERA */}
        <div
          className="absolute -top-6 -right-4 md:-top-8 md:-right-6 z-30 filter drop-shadow-xl opacity-90 pointer-events-none transform-gpu translate-z-0 backface-hidden"
          style={{ willChange: "transform" }}
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full text-red-900"
              style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))" }}
            >
              <defs>
                <radialGradient
                  id="waxGradient"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="30%"
                  fy="30%"
                >
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="40%" stopColor="#b91c1c" />
                  <stop offset="100%" stopColor="#450a0a" />
                </radialGradient>
              </defs>
              <path
                d="M50 5 C30 10 10 25 5 50 C0 75 20 95 50 95 C80 95 95 75 95 50 C95 25 75 0 50 5 Z M50 15 C70 15 80 30 80 50 C80 70 70 85 50 85 C30 85 20 70 20 50 C20 30 30 15 50 15 Z"
                fill="url(#waxGradient)"
                stroke="#7f1d1d"
                strokeWidth="1"
              />
              <path
                d="M52,2 Q68,6 78,18 Q92,32 94,52 Q92,75 80,88 Q62,98 48,96 Q28,92 16,80 Q4,62 8,42 Q18,22 35,10 Q45,4 52,2 Z"
                fill="url(#waxGradient)"
              />
            </svg>
            <div
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-red-900/50"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #991b1b, #450a0a)",
                boxShadow:
                  "inset 2px 4px 6px rgba(0,0,0,0.6), inset -2px -2px 4px rgba(255,255,255,0.1)",
              }}
            >
              <span className="font-serif text-[#eecbcb] text-2xl md:text-3xl font-bold italic opacity-90 drop-shadow-md select-none transform -rotate-6">
                V
              </span>
            </div>
          </div>
        </div>

        {/* Marca d'água */}
        <Quote className="absolute top-8 left-8 text-[#b8860b] w-10 h-10 opacity-30 rotate-180 pointer-events-none" />

        {/* Conteúdo */}
        <div className="relative">
          {/* 1. Ghost Element         */}
          <div
            className="opacity-0 pointer-events-none select-none p-8 md:p-16 font-serif text-lg md:text-xl leading-relaxed tracking-wide"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: fullTextHTML }}
          />

          {/* 2. TYPEWRITER */}
          <div className="absolute inset-0 p-8 md:p-16 font-serif text-lg md:text-xl leading-relaxed tracking-wide text-[#3e2723]">
            <Typewriter
              options={{
                delay: 35,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    '<span style="font-size: 1.4em; font-weight: 700; color: #592c2c; font-family: Cormorant Garamond, serif;">Minha Soberana e Doce Dama,</span><br><br>'
                  )
                  .pauseFor(1000)
                  .typeString(
                    "Desde que os fios de nossos destinos se entrelaçaram nas quentes e aconchegantes brisas de setembro, meu modesto reino ganhou matizes e luzes que eu julgava perdidas no tempo. "
                  )
                  .pauseFor(500)
                  .typeString(
                    "Minha gratidão é imensurável por cada passo que trilhamos e por cada ventura singular que partilhamos.<br><br>"
                  )
                  .pauseFor(500)
                  .typeString(
                    "Foi tu quem, com gentileza, resgatou-me dos abismos mais profundos para alçar-me aos cumes mais vertiginosos que já ousei tocar; <strong>sou, em verdade, um homem abençoado por tê-la como minha donzela.</strong>"
                  )
                  .pauseFor(800)
                  .typeString(
                    "<br><br>E algo ouso profetizar com inabalável certeza: <em>nossas almas caminharão entrelaçadas através das eras.</em> "
                  )
                  .typeString(
                    "Que este tempo seja eterno e que possamos, em nossa união, alcançar a plenitude e a glória que o destino, e Deus, possa nos reservar."
                  )
                  .pauseFor(800)
                  .typeString(
                    "<br><br>Rendo graças à vossa confiança, à vossa cumplicidade e a essa maneira suave e encantadora de ser. "
                  )
                  .typeString(
                    "És a companheira mais perfeita — na vossa sublime humanidade — que eu poderia sonhar e que meu coração sempre almejou conquistar."
                  )
                  .pauseFor(800)
                  .typeString(
                    "<br><br>Elevo minhas preces ao Criador para que derrame sobre nós Sua graça, concedendo-nos direção e sabedoria para governar nossos anseios, sonhos e conquistas, tanto as minhas quanto as vossas, que agora são um só propósito."
                  )
                  .typeString(
                    '<br><br><span style="color: #6a0dad; font-weight: bold;">Tu és a mais preciosa dádiva com a qual pude ser agraciado.</span>'
                  )
                  .pauseFor(1000)
                  .typeString(
                    "<br><br>Lado a lado, haveremos de subjugar qualquer sombra ou infortúnio que ouse se opor ao nosso triunfo."
                  )
                  .pauseFor(1500)
                  .typeString(
                    '<br><br><div style="width: 100%; text-align: right; margin-top: 20px;"><span style="font-size: 1.2em; font-style: italic; color: #D4AF37;">— Com amor eterno e devoção,<br>Victor.</span></div>'
                  )
                  .start();
              }}
            />
          </div>
        </div>

        {/* Detalhe rodapé */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-30">
          <div className="w-1/2 h-px bg-[#b8860b]"></div>
        </div>
      </div>
    </div>
  );
});

export default LoveLetter;
