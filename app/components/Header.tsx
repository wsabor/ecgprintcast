import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-9xl container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <div className="relative h-[60px] w-[200px]">
            <Image
              src="/images/logo.png"
              alt="ECG PrintCast"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <nav className="hidden gap-6 md:flex">
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
