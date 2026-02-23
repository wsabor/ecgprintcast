import TeamMember from "./TeamMember";

export default function Team() {
  const teamMembers = [
    {
      name: "Rober Almeida",
      photo: "/images/team/rober.webp",
      bio: "Diretor comercial da Topcoat Vernizes. Experiência de 26 anos na área gráfica e jurado de algumas das principais premiações do mercado gráfico.",
      instagram: "https://www.instagram.com/roberalmeida82/",
      linkedin: "https://www.linkedin.com/in/roberalmeida/",
    },
    {
      name: "Robson Xavier",
      photo: "/images/team/robson.webp",
      bio: "No mercado gráfico há 32 anos e há 10 criou a Cor e Processo. Tem passagem pelos mercados de softwares, máquinas impressoras offset e digitais, por insumos, produção gráfica na publicidade, venda de serviços de impressão, consultorias, palestras, treinamentos e aulas.",
      instagram: "https://www.instagram.com/palestragrafica/",
      linkedin: "https://www.linkedin.com/in/robsonxavierdecarvalho/",
    },
    {
      name: "Wagner Sabor",
      photo: "/images/team/wagner.webp",
      bio: "Desenvolvedor especialista em sistemas para internet e aplicativos mobile. Instrutor de Tecnologia no SENAI-SP e apaixonado por tecnologia e suas aplicações no cotidiano. Trabalhou por 17 anos na indústria gráfica e há 5 anos se dedica à área de Tecnologia da Informação e a docência.",
      instagram: "https://www.instagram.com/wsabor/",
      linkedin: "https://www.linkedin.com/in/wsabor/",
    },
  ];

  return (
    <section id="equipe" className="bg-[#bde4db] px-6 py-12 md:px-16">
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-4xl font-bold text-gray-800 md:mb-12">
          Equipe do PrintCast
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
