import Image from "next/image";

export default function LastEpisodes() {
  return (
    <>
      {/* Seção de últimos episódios - Background azul escuro */}
      <section className="bg-[#2c4f6f] px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">
            Últimos episódios do PrintCast
          </h2>
          <p className="mb-12 text-center text-2xl text-white/90">
            Confira os últimos episódios do PrintCast
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Placeholders para vídeos */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded-lg bg-white p-4 shadow-lg">
                <div className="mb-3 aspect-video rounded-md bg-gray-200"></div>
                <p className="text-center text-sm text-gray-600">
                  Episódio #{i}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
