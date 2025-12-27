export default function Contact() {
  return (
    <section id="contato" className="bg-[#bde4db] px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-800 md:text-5xl">
          Contato
        </h2>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Coluna da esquerda - Texto */}
          <div className="space-y-6">
            <p className="text-base leading-relaxed font-semibold text-gray-800 md:text-2xl">
              Queridinho, estamos aqui para ouvir você!
            </p>

            <p className="text-xl leading-relaxed font-medium text-gray-700">
              Se você tem alguma dúvida, sugestão ou deseja compartilhar suas
              ideias conosco, preencha o formulário. Teremos o prazer em
              responder o mais rápido possível. Sua opinião é valiosa e queremos
              garantir que sua experiência conosco seja a melhor possível.
              Aguardamos seu contato e a oportunidade de atendê-lo da melhor
              maneira possível.
            </p>

            <p className="text-xl font-medium text-gray-700">
              Obrigado por entrar em contato!
            </p>

            <p className="text-2xl font-semibold text-gray-800">
              Equipe do PrintCast
            </p>
          </div>

          {/* Coluna da direita - Formulário */}
          <div className="rounded-xl bg-white p-6 shadow-xl md:p-8">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  placeholder="Mensagem"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all duration-300 hover:from-red-600 hover:to-pink-600"
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
