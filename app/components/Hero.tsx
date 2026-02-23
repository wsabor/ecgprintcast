import Image from "next/image";
import SocialLinks from "./SocialLinks";

export default function Hero() {
  return (
    <>
      {/* Seção 1: Logo e Social Links com background de imagem */}
      <section
        className="relative flex w-full flex-col items-center justify-center px-4 py-12 md:px-6"
        style={{
          minHeight: "calc(100vh - 80px)",
          backgroundImage: "url(/images/banner_bw.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gray-200/50"></div>

        <div className="max-w-9xl container mx-auto">
          <div className="relative z-10 flex flex-col items-center justify-center gap-8 md:items-start">
            <div className="relative h-[200px] w-full max-w-[320px]">
              <Image
                src="/images/logo_TVA-PC.webp"
                alt="ECG PrintCast - O podcast queridinho da indústria gráfica"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <SocialLinks variant="default" />
          </div>
        </div>
      </section>
    </>
  );
}
