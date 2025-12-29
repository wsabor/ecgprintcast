"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Sponsor from "./Sponsor";

export default function Sponsors() {
  const sponsors = [
    {
      name: "CMYK Tintas",
      logo: "/images/sponsors/cmyk.webp",
      description:
        "Empresa de tintas gráficas, convencionais e ultravioleta, para segmento de offset, metalgrafia e flexografia.",
      instagram: "https://www.instagram.com/cmyktintas/",
      website: "https://www.cmyktintas.com.br/",
    },
    {
      name: "Cor e Processo",
      logo: "/images/sponsors/cor-e-processo.webp",
      description:
        "Empresa de tecnologia gráfica dedicada à softwares e serviços que ajudem a reduzir custos, melhorar a qualidade e a produtividade gerando sustentabilidade financeira, operacional e ambiental do negócio de impressão.",
      instagram: "https://www.instagram.com/cor_e_processo/",
      website: "https://www.coreprocesso.com.br/",
    },
    {
      name: "Croma",
      logo: "/images/sponsors/croma.webp",
      description:
        "Empresa especialista em tintas e vernizes especiais como aromático, termocrômica, Glow in the dark, reagente a luz negra e outras. Também faz aplicações dessas especialidades para empresas que não tem equipamento de aplicação.",
      instagram: "https://www.instagram.com/croma_microencapsulados/",
      website: "http://www.croma.com.br/",
    },
    {
      name: "Eurostar Gráficos",
      logo: "/images/sponsors/eurostar.webp",
      description:
        "Com mais de 50 anos de história, a Eurostar mantém o desafio contínuo de fabricar, importar, desenvolver novos mercados, atender com produtos de qualidade, assim como permanecer em constante busca de inovações, objetivando atender a área gráfica de forma eficaz.",
      instagram: "https://www.instagram.com/duplicopyeurostar/",
      website: "http://eurostargraficos.com.br/",
    },
    {
      name: "Opção Offset",
      logo: "/images/sponsors/OpcaoOffset.webp",
      description:
        "Fornecedora de produtos para a indústria gráfica, especializada em chapas offset, produtos químicos, peças e acessórios para máquinas offset.",
      instagram: "https://www.instagram.com/opcao_offset/",
      website: "https://www.opcaooffset.com/",
    },
    {
      name: "Topcoat",
      logo: "/images/sponsors/topcoat.webp",
      description:
        "Fabricante de Soluções em Vernizes, com portfólio completo em vernizes base água, ultravioleta e sobre impressão.",
      instagram: "https://www.instagram.com/topcoat.vernizes/",
      website: "https://topcoat.com.br/",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemsPerView = 3; // Mostra 3 cards por vez no desktop

  // Auto-rotate a cada 5 segundos (pausa quando isPaused = true)
  useEffect(() => {
    if (isPaused) return; // Não roda o intervalo se estiver pausado

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sponsors.length, isPaused]);

  // Função para pegar os 3 cards visíveis (com loop infinito)
  const getVisibleSponsors = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % sponsors.length;
      visible.push(sponsors[index]);
    }
    return visible;
  };

  // Funções de navegação
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sponsors.length) % sponsors.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sponsors.length);
  };

  return (
    <section
      id="patrocinadores"
      className="bg-[#e5e5e5] px-6 py-12 md:px-4 md:py-24"
    >
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-4xl font-bold text-gray-800 md:mb-12 md:text-5xl">
          Patrocinadores
        </h2>

        {/* Carrossel Desktop - mostra 3 cards */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Botão Anterior */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 z-10 flex h-12 w-12 -translate-x-16 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white shadow-lg transition-all hover:scale-110 hover:bg-gray-500"
              aria-label="Patrocinador anterior"
            >
              <FaChevronLeft className="text-xl" />
            </button>

            <div
              className="grid grid-cols-3 gap-12"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {getVisibleSponsors().map((sponsor, idx) => (
                <div
                  key={`${sponsor.name}-${currentIndex}-${idx}`}
                  className="transition-opacity duration-500"
                >
                  <Sponsor {...sponsor} />
                </div>
              ))}
            </div>

            {/* Botão Próximo */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 z-10 flex h-12 w-12 translate-x-16 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white shadow-lg transition-all hover:scale-110 hover:bg-gray-500"
              aria-label="Próximo patrocinador"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>

          {/* Indicadores */}
          <div className="mt-8 flex justify-center gap-2">
            {sponsors.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-gray-800"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Ir para patrocinador ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet - mostra 1 card por vez */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Botão Anterior Mobile */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white shadow-lg transition-all hover:bg-gray-500"
              aria-label="Patrocinador anterior"
            >
              <FaChevronLeft className="text-lg" />
            </button>

            <div
              className="flex justify-center px-12"
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="w-full max-w-md transition-opacity duration-500">
                <Sponsor {...sponsors[currentIndex]} />
              </div>
            </div>

            {/* Botão Próximo Mobile */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white shadow-lg transition-all hover:bg-gray-500"
              aria-label="Próximo patrocinador"
            >
              <FaChevronRight className="text-lg" />
            </button>
          </div>

          {/* Indicadores Mobile */}
          <div className="mt-8 flex justify-center gap-2">
            {sponsors.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-gray-800"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Ir para patrocinador ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
