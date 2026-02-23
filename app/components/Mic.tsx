import Image from "next/image";
import SocialLinks from "./SocialLinks";
import NewsletterForm from "./NewsletterForm";

export default function Mic() {
  return (
    <section className="bg-[#e8f4f0] px-4 py-12 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-32">
          {/* Microfone */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-[300px] w-[180px] flex-shrink-0">
              <Image
                src="/images/mic.png"
                alt="Microfone PrintCast"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
            <SocialLinks variant="default" />
          </div>

          {/* Conteúdo */}
          <div className="flex max-w-lg flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Confira um novo episódio toda quinta-feira às 19h
            </h2>

            <p className="text-xl font-semibold text-gray-700">
              O podcast queridinho da indústria gráfica
            </p>

            {/* Newsletter */}
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
