import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="top-0 z-50 w-full bg-white shadow-md md:sticky">
      <div className="max-w-9xl container mx-auto flex items-center justify-center px-4 py-3 md:justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-[50px] w-[130px] md:h-[60px] md:w-[160px]">
            <Image
              src="/images/logo_TV-Abigraf.png"
              alt="TV Abigraf"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative h-[50px] w-[150px] md:h-[60px] md:w-[200px]">
            <Image
              src="/images/logo.png"
              alt="ECG PrintCast"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex md:gap-4">
          <a
            href="#top"
            className="text-xl font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Início
          </a>
          <a
            href="#sobre"
            className="text-xl font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Sobre
          </a>
          <a
            href="#equipe"
            className="text-xl font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Equipe
          </a>
          <a
            href="#patrocinadores"
            className="text-xl font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Patrocinadores
          </a>
          <a
            href="#contato"
            className="text-xl font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}
