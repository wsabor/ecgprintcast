import Image from "next/image";
import SocialLinks from "./SocialLinks";

import { Heart, Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#e5e5e5] pt-12 pb-8 md:pt-12">
      <div className="max-w-9xl container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-[160px] w-[300px]">
            <Image
              src="/images/logo_TVA-PC.webp"
              alt="ECG PrintCast"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>

          <SocialLinks variant="default" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-400/30 pt-8 text-center md:flex-row">
          <div className="text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} ECG PrintCast. Todos os direitos
              reservados.
            </p>
          </div>
          <div className="">
            <p className="flex items-center gap-1 text-sm text-zinc-500">
              Desenvolvido com <Heart className="h-4 w-4 text-red-500" />
              e <Coffee className="text-cp-cyan h-4 w-4" /> por{" "}
              <a
                href="https://wsabor.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cp-cyan transition-colors hover:text-white"
              >
                wsabor.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
