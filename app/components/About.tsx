import Image from 'next/image';

export default function About() {
  return (
    <>
      {/* Seção de últimos episódios - Background azul escuro */}
      <section className="py-20 px-4 bg-[#2c4f6f]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Últimos episódios do PrintCast
          </h2>
          <p className="text-xl text-center text-white/90 mb-12">
            Confira os últimos episódios do PrintCast
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholders para vídeos */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-lg">
                <div className="aspect-video bg-gray-200 rounded-md mb-3"></div>
                <p className="text-sm text-gray-600 text-center">Episódio #{i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Sobre - Background verde água claro */}
      <section id="sobre" className="py-20 px-4 bg-[#d5ebe5]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center">
            {/* Ícone do microfone */}
            <div className="flex justify-center mb-12">
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <Image
                  src="/images/icon-mic.png"
                  alt="Ícone PrintCast"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Título principal */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 max-w-4xl">
              PrintCast: conectando a indústria gráfica e fomentando um networking valioso!
            </h2>

            {/* Conteúdo sobre */}
            <div className="max-w-4xl text-gray-800 space-y-6">
              <p className="text-base md:text-lg leading-relaxed text-justify">
                Bem-vindos ao PrintCast, o <strong>podcast dedicado à indústria gráfica</strong> e àqueles que são conhecidos e respeitados nesse setor vibrante! Nossa missão é <strong>compartilhar conteúdo de valor e estimular o networking entre profissionais de todo país</strong>, criando uma plataforma para gráficos, especialistas e entusiastas trocarem ideias, experiências e insights.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-justify">
                Ao longo de cada episódio do PrintCast, você terá a oportunidade de <strong>aprender com alguns dos melhores players da indústria gráfica</strong>. Nossa equipe de anfitriões, especialistas em impressão, software e tecnologia, <strong>conduzirá entrevistas envolventes e aprofundadas</strong> com personalidades renomadas na indústria gráfica, compartilhando <strong>histórias inspiradoras e estratégias de negócios bem-sucedidas</strong>.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-justify">
                Se você é um trabalhador da indústria gráfica e <strong>apaixonado pela arte da impressão e acabamento gráfico</strong>, o PrintCast é o seu ponto de encontro para se <strong>manter atualizado, expandir sua rede de contatos e descobrir novas oportunidades</strong> no mundo da indústria gráfica.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-justify">
                <strong>Junte-se a nós no PrintCast</strong> e embarque nessa jornada emocionante de conhecimento, conexões e inspiração. Estamos ansiosos para <strong>compartilhar histórias fascinantes, dicas valiosas e insights que impulsionarão o seu sucesso na indústria gráfica</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
