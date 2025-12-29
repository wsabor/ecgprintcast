import Image from "next/image";
import { getLatestYouTubeVideos } from "../services/youtube";
import { FaPlay } from "react-icons/fa";

export default async function LastEpisodes() {
  const videos = await getLatestYouTubeVideos(9);

  return (
    <>
      {/* Seção de últimos episódios - Background azul escuro */}
      <section className="bg-[#2c4f6f] px-4 py-24">
        <div className="max-w-9xl container mx-auto">
          <h2 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">
            Últimos episódios do PrintCast
          </h2>
          <p className="mb-12 text-center text-2xl text-white/90">
            Confira os últimos episódios do PrintCast
          </p>
          {/* Mobile - 6 vídeos */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {videos.length > 0
              ? videos.slice(0, 6).map((video) => (
                  <a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg bg-white pb-2 shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <div className="relative mb-3 aspect-video overflow-hidden rounded-md bg-gray-200">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Overlay com ícone de play */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                          <FaPlay className="ml-1 text-2xl text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-center text-lg font-semibold text-gray-600">
                      {video.title}
                    </p>
                  </a>
                ))
              : // Fallback: Placeholders caso a API falhe
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="rounded-lg bg-white p-4 shadow-lg">
                    <div className="mb-3 aspect-video rounded-md bg-gray-200"></div>
                    <p className="text-center text-sm text-gray-600">
                      Episódio #{i}
                    </p>
                  </div>
                ))}
          </div>

          {/* Desktop - 9 vídeos */}
          <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
            {videos.length > 0
              ? videos.slice(0, 9).map((video) => (
                  <a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl bg-white pb-2 shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <div className="relative mb-3 aspect-video overflow-hidden rounded-md bg-gray-200">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Overlay com ícone de play */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                          <FaPlay className="ml-1 text-2xl text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-center text-lg font-semibold text-gray-600">
                      {video.title}
                    </p>
                  </a>
                ))
              : // Fallback: Placeholders caso a API falhe
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
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
