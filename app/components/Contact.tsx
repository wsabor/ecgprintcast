export default function Contact() {
  return (
    <section id="contato" className="py-24 px-4 bg-[#bde4db]">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Contato
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Coluna da esquerda - Texto */}
          <div className="space-y-6">
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              Queridinho, estamos aqui para ouvir você!
            </p>

            <p className="text-gray-700 text-base leading-relaxed">
              Se você tem alguma dúvida, sugestão ou deseja compartilhar suas ideias conosco,
              preencha o formulário. Teremos o prazer em responder o mais rápido possível.
              Sua opinião é valiosa e queremos garantir que sua experiência conosco seja a melhor possível.
              Aguardamos seu contato e a oportunidade de atendê-lo da melhor maneira possível.
            </p>

            <p className="text-gray-700">
              Obrigado por entrar em contato!
            </p>

            <p className="text-gray-800 font-semibold text-lg">
              Equipe do PrintCast
            </p>
          </div>

          {/* Coluna da direita - Formulário */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800"
                />
              </div>
              <div>
                <textarea
                  placeholder="Mensagem"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg uppercase"
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
