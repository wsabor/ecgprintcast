import Image from "next/image";
import SocialLinks from "./SocialLinks";
import NewsletterForm from "./NewsletterForm";

export default function Mic() {
  return (
    <section className="bg-[#e8f4f0] px-6 py-12 md:px-4 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-32">
          {/* Microfone */}
          <div className="relative h-[300px] w-[180px] flex-shrink-0 md:h-[488px] md:w-[300px]">
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
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
