import Image from 'next/image';
import SocialLinks from './SocialLinks';

export default function Hero() {
  return (
    <>
      {/* Seção 1: Logo e Social Links com background de imagem */}
      <section
        className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 px-4"
        style={{
          backgroundImage: 'url(/images/banner_bw.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto">
          <div className="relative w-full max-w-[500px] h-[150px] md:h-[200px]">
            <Image
              src="/images/slogan.webp"
              alt="ECG PrintCast - O podcast queridinho da indústria gráfica"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <SocialLinks variant="large" />
        </div>
      </section>

      {/* Seção 2: Microfone e texto com background verde claro */}
      <section className="relative w-full py-20 px-4 bg-[#e8f4f0]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="relative w-[200px] h-[325px] md:w-[250px] md:h-[406px] flex-shrink-0">
              <Image
                src="/images/mic.png"
                alt="Microfone PrintCast"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Confira um novo episódio toda quinta-feira às 19h
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 font-medium mb-8">
                O podcast queridinho da indústria gráfica
              </p>
            </div>
          </div>

          {/* Newsletter com formulário */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center leading-relaxed">
              Cadastre-se em nossa newsletter para ser avisado sobre os novos episódios do PrintCast em primeira mão e receber notícias e informações importantes sobre a indústria gráfica
            </h3>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
              >
                ENVIAR MENSAGEM
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
