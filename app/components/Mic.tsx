import Image from "next/image";
import SocialLinks from "./SocialLinks";

export default function Mic() {
  return (
    <section className="bg-[#e8f4f0] px-4 py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-32 md:flex-row">
          {/* Microfone */}
          <div className="relative h-[325px] w-[200px] flex-shrink-0 md:h-[488px] md:w-[300px]">
            <Image
              src="/images/mic.png"
              alt="Microfone PrintCast"
              fill
              className="object-contain drop-shadow-xl"
            />
          </div>

          {/* Conteúdo */}
          <div className="flex max-w-xl flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Confira um novo episódio toda quinta-feira às 19h
            </h2>

            <p className="text-xl font-semibold text-gray-700 md:text-2xl">
              O podcast queridinho da indústria gráfica
            </p>

            <SocialLinks variant="default" />

            {/* Newsletter */}
            <div className="w-full rounded-2xl bg-white p-4 shadow-xl md:p-8">
              <h3 className="mb-6 text-center text-base leading-relaxed font-semibold text-gray-800 md:text-xl">
                Cadastre-se em nossa newsletter para ser avisado sobre os novos
                episódios do PrintCast em primeira mão e receber notícias e
                informações importantes sobre a indústria gráfica
              </h3>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all duration-300 hover:from-red-600 hover:to-pink-600"
                >
                  Quero ser avisado
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
