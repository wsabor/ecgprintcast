import Image from "next/image";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-[#e5e5e5] pt-12 pb-8 md:pt-24">
      <div className="max-w-9xl container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-[160px] w-[300px] md:h-[200px] md:w-[360px]">
            <Image
              src="/images/logo_TVA-PC.webp"
              alt="ECG PrintCast"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>

          <SocialLinks variant="large" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-400/30 pt-8 text-center md:flex-row">
          <div className="text-center text-lg text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} ECG PrintCast. Todos os direitos
              reservados.
            </p>
          </div>
          <div className="">
            <a
              href="https://wsabor.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 transition-colors hover:text-gray-900 md:flex-row"
            >
              <span className="text-base font-medium md:text-xl">
                Desenvolvido por wsabor.dev
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
