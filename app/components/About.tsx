export default function About() {
  return (
    <>
      {/* Seção Sobre - Background verde água claro */}
      <section
        id="sobre"
        className="relative bg-[#d5ebe5] px-6 py-12 md:px-4 md:py-24"
        style={{
          backgroundImage: "url(/images/icon-mic.png)",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "500px 500px",
        }}
      >
        {/* Overlay semi-transparente para efeito de marca d'água */}
        <div className="absolute inset-0 bg-[#d5ebe5]/85"></div>

        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="flex flex-col items-center">
            {/* Título principal */}
            <h2 className="mb-8 max-w-4xl text-center text-2xl font-bold text-gray-800 md:text-3xl md:text-4xl">
              PrintCast: conectando a indústria gráfica e fomentando um
              networking valioso!
            </h2>

            {/* Conteúdo sobre */}
            <div className="max-w-5xl space-y-6 text-gray-800">
              <p className="text-left text-xl leading-relaxed">
                Bem-vindos ao PrintCast, o{" "}
                <strong>podcast dedicado à indústria gráfica</strong> e àqueles
                que são conhecidos e respeitados nesse setor vibrante! Nossa
                missão é{" "}
                <strong>
                  compartilhar conteúdo de valor e estimular o networking entre
                  profissionais de todo país
                </strong>
                , criando uma plataforma para gráficos, especialistas e
                entusiastas trocarem ideias, experiências e insights.
              </p>

              <p className="text-left text-xl leading-relaxed">
                Ao longo de cada episódio do PrintCast, você terá a oportunidade
                de{" "}
                <strong>
                  aprender com alguns dos melhores players da indústria gráfica
                </strong>
                . Nossa equipe de anfitriões, especialistas em impressão,
                software e tecnologia,{" "}
                <strong>
                  conduzirá entrevistas envolventes e aprofundadas
                </strong>{" "}
                com personalidades renomadas na indústria gráfica,
                compartilhando{" "}
                <strong>
                  histórias inspiradoras e estratégias de negócios bem-sucedidas
                </strong>
                .
              </p>

              <p className="text-left text-xl leading-relaxed">
                Se você é um trabalhador da indústria gráfica e{" "}
                <strong>
                  apaixonado pela arte da impressão e acabamento gráfico
                </strong>
                , o PrintCast é o seu ponto de encontro para se{" "}
                <strong>
                  manter atualizado, expandir sua rede de contatos e descobrir
                  novas oportunidades
                </strong>{" "}
                no mundo da indústria gráfica.
              </p>

              <p className="text-left text-xl leading-relaxed">
                <strong>Junte-se a nós no PrintCast</strong> e embarque nessa
                jornada emocionante de conhecimento, conexões e inspiração.
                Estamos ansiosos para{" "}
                <strong>
                  compartilhar histórias fascinantes, dicas valiosas e insights
                  que impulsionarão o seu sucesso na indústria gráfica
                </strong>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
