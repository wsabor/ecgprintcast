import Sponsor from './Sponsor';

export default function Sponsors() {
  const sponsors = [
    {
      name: 'CMYK Tintas',
      logo: '/images/sponsors/cmyk.webp',
      description: 'Empresa de tintas gráficas, convencionais e ultravioleta, para segmento de offset, metalgrafia e flexografia.',
      instagram: 'https://www.instagram.com/cmyktintas/',
      website: 'https://www.cmyktintas.com.br/',
    },
    {
      name: 'Cor e Processo',
      logo: '/images/sponsors/cor-e-processo.webp',
      description: 'Empresa de tecnologia gráfica dedicada à softwares e serviços que ajudem a reduzir custos, melhorar a qualidade e a produtividade gerando sustentabilidade financeira, operacional e ambiental do negócio de impressão.',
      instagram: 'https://www.instagram.com/cor_e_processo/',
      website: 'https://www.coreprocesso.com.br/',
    },
    {
      name: 'Croma',
      logo: '/images/sponsors/croma.webp',
      description: 'Empresa especialista em tintas e vernizes especiais como aromático, termocrômica, Glow in the dark, reagente a luz negra e outras. Também faz aplicações dessas especialidades para empresas que não tem equipamento de aplicação.',
      instagram: 'https://www.instagram.com/croma_microencapsulados/',
      website: 'http://www.croma.com.br/',
    },
    {
      name: 'Duplicopy/Eurostar',
      logo: '/images/sponsors/duplicopy.webp',
      description: 'Com mais de 45 anos de história, a Eurostar mantém o desafio contínuo de fabricar, importar, desenvolver novos mercados, atender com produtos de qualidade, assim como permanecer em constante busca de inovações, objetivando atender a área gráfica de forma eficaz.',
      instagram: 'https://www.instagram.com/duplicopyeurostar/',
      website: 'http://eurostargraficos.com.br/',
    },
    {
      name: 'Papirus',
      logo: '/images/sponsors/papirus.webp',
      description: 'Fabricante de papel cartão para embalagens e aplicações gráficas, com fibras recicladas (pós-industrial e pós-consumo) e fibras virgens certificadas e controladas. Nossa linha de produtos tem vida. Empresa B certificada.',
      instagram: 'https://www.instagram.com/papirus_oficial/',
      website: 'https://www.papirus.com/',
    },
    {
      name: 'Topcoat',
      logo: '/images/sponsors/topcoat.webp',
      description: 'Fabricante de Soluções em Vernizes, com portfólio completo em vernizes base água, ultravioleta e sobre impressão.',
      instagram: 'https://www.instagram.com/topcoat.vernizes/',
      website: 'https://topcoat.com.br/',
    },
  ];

  return (
    <section id="patrocinadores" className="py-24 px-4 bg-[#e5e5e5]">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
          Patrocinadores
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {sponsors.map((sponsor) => (
            <Sponsor key={sponsor.name} {...sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
}
